import { useCallback, useEffect, useRef, useState } from "react"

declare interface ExtendedMediaStream extends MediaStream {
    _originalStreams?: MediaStream[]
}

interface MediaStreams {
    displayStream: MediaStream
    micStream: MediaStream | null
    hasDisplayAudio: boolean
}

const DEFAULT_VIDEO_CONFIG = {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    frameRate: { ideal: 30 }
}

async function getMediaStreams(withMic: boolean): Promise<MediaStreams> {
    let displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: DEFAULT_VIDEO_CONFIG,
        audio: true
    })
    
    let hasDisplayAudio = displayStream.getAudioTracks().length > 0
    let micStream = null

    if (withMic) {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true })
        micStream
            .getAudioTracks()
            .forEach((track: MediaStreamTrack) => (track.enabled = true))
    }

    return { displayStream, micStream, hasDisplayAudio }
}

interface CreateAudioMixerOption {
    ctx: AudioContext
    hasDisplayAudio: boolean
    displayStream: MediaStream
    micStream: MediaStream | null
}

function createAudioMixer(option: CreateAudioMixerOption) {
    if (!option.hasDisplayAudio && !option.micStream) return null

    const destination = option.ctx.createMediaStreamDestination()
    const mix = (stream: MediaStream, gainValue: number) => {
        let source = option.ctx.createMediaStreamSource(stream)
        let gain = option.ctx.createGain()
        gain.gain.value = gainValue
        source.connect(gain).connect(destination)
    }

    if (option.hasDisplayAudio) mix(option.displayStream, 0.7)
    if (option.micStream) mix(option.micStream, 1.5)
        
    return destination
}

interface RecordingHandler {
    onDataAvailable: (e: BlobEvent) => void
    onStop: () => void
}

const DEFAULT_RECORDING_CONFIG = {
    mimeType: "video/webm;codecs=vp9,opus",
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
}

function setupRecording(stream: MediaStream, handlers: RecordingHandler) {
    const recorder = new MediaRecorder(stream, DEFAULT_RECORDING_CONFIG)
    recorder.ondataavailable = handlers.onDataAvailable
    recorder.onstop = handlers.onStop
    return recorder
}

function cleanupRecording(recorder: MediaRecorder | null, stream: MediaStream | null, originalStreams: MediaStream[] = []) {
    if (recorder?.state !== "inactive") recorder?.stop()
    
    stream?.getTracks()
        .forEach((t: MediaStreamTrack) => t.stop())
    originalStreams
        .forEach((s) => s.getTracks().forEach((t: MediaStreamTrack) => t.stop()))
}

interface BunnyRecordingState {
    isRecording: boolean
    recordedBlob: Blob | null
    recordedVideoUrl: string
    recordingDuration: number
}

export default function useScreenRecording() {
    const [state, setState] = useState<BunnyRecordingState>({
        isRecording: false,
        recordedBlob: null,
        recordedVideoUrl: "",
        recordingDuration: 0
    })

    const chunksRef = useRef<Blob[]>([])
    , startTimeRef = useRef<number | null>(null)
    , streamRef = useRef<ExtendedMediaStream | null>(null)
    , mediaRecorderRef = useRef<MediaRecorder | null>(null)
    , audioContextRef = useRef<AudioContext | null>(null);

    const stopRecording = useCallback(() => {
        cleanupRecording(mediaRecorderRef.current, streamRef.current, streamRef.current?._originalStreams)
        setState((prev) => ({ ...prev, isRecording: false }))
        streamRef.current = null
    }, [mediaRecorderRef, streamRef])

    const resetRecording = useCallback(() => {
        if (state.recordedVideoUrl) URL.revokeObjectURL(state.recordedVideoUrl)
        stopRecording()
        setState({
            isRecording: false,
            recordedBlob: null,
            recordedVideoUrl: "",
            recordingDuration: 0,
        })
        startTimeRef.current = null
    }, [state.recordedVideoUrl, startTimeRef])

    useEffect(() => () => {
        if (state.recordedVideoUrl) URL.revokeObjectURL(state.recordedVideoUrl)
        audioContextRef.current?.close().catch(console.error)
        stopRecording()
    }, [state.recordedVideoUrl])

    // function calculateRecordingDuration(startTime: number | null): number {
    //     return startTime ? Math.round((Date.now() - startTime) / 1000) : 0
    // }

    // function createRecordingBlob(chunks: Blob[]): { blob: Blob; url: string } {
    //     const blob = new Blob(chunks, { type: "video/webm" })
    //     const url = URL.createObjectURL(blob)
    //     return { blob, url }
    // }

    const calculateRecordingDuration = useCallback((startTime: number | null): number => {
        return startTime ? Math.round((Date.now() - startTime) / 1000) : 0
    }, [])

    const createRecordingBlob = useCallback((chunks: Blob[]) => {
        const blob = new Blob(chunks, { type: "video/webm" })
        const url = URL.createObjectURL(blob)
        return { blob, url }
    }, [])

    const handleRecordingStop = () => {
        const { blob, url } = createRecordingBlob(chunksRef.current)
        const duration = calculateRecordingDuration(startTimeRef.current)

        setState((prev) => ({
            ...prev,
            recordedBlob: blob,
            recordedVideoUrl: url,
            recordingDuration: duration,
            isRecording: false
        }))
    }

    const startRecording = async (withMic = true) => {
        stopRecording()

        try {
            const { displayStream, micStream, hasDisplayAudio } = await getMediaStreams(withMic)
            const combinedStream = new MediaStream() as ExtendedMediaStream

            displayStream
                .getVideoTracks()
                .forEach((t: MediaStreamTrack) => combinedStream.addTrack(t))

            audioContextRef.current = new AudioContext()

            const audioMixerOption = {
                ctx: audioContextRef.current, 
                hasDisplayAudio,
                displayStream, 
                micStream, 
            }
            const audioDestination = createAudioMixer(audioMixerOption)

            audioDestination?.stream
                .getAudioTracks()
                .forEach((t: MediaStreamTrack) => combinedStream.addTrack(t))

            combinedStream._originalStreams = [
                displayStream,
                ...(micStream ? [micStream] : [])
            ]

            streamRef.current = combinedStream
            mediaRecorderRef.current = setupRecording(combinedStream, {
                onDataAvailable: (e) => e.data.size && chunksRef.current.push(e.data),
                onStop: handleRecordingStop,
            })
            chunksRef.current = []
            startTimeRef.current = Date.now()
            mediaRecorderRef.current.start(1000)

            setState((prev) => ({ ...prev, isRecording: true }))

            return true
        }
        catch (err) {
            console.error("=== recording error", err)
            return false
        }
    }

    return {
        ...state,
        stopRecording,
        resetRecording,
        startRecording,
    }
}
