import { useRef, useState } from "react"
import { navigate } from "astro:transitions/client"

import useScreenRecording from "./hooks/useScreenRecording"

const ICONS = {
    close: "",
    record: "",
    upload: "",
}

export default function RecordScreen() {
    const [isOpen, setIsOpen] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)
    const screenRecording = useScreenRecording()

    console.log(screenRecording.recordedVideoUrl)

    return (
        <div>
            <div>
            </div>
        {
            !isOpen
            ? null
            : (
                <section>
                    <div>
                        <h3>Screen Recording</h3>
                        {/* <img src="/assets/icons/close.svg" alt="close" /> */}
                    </div>
                {
                    screenRecording.isRecording
                    ? <span>recording</span>
                    : screenRecording.recordedVideoUrl && (<video ref={videoRef} src={screenRecording.recordedVideoUrl} controls />)
                }
                {
                    !screenRecording.isRecording && !screenRecording.recordedVideoUrl && (
                        <button className="flex gap-2 p-2 border cursor-pointer" onClick={async () => await screenRecording.startRecording()}>
                            <img src="/assets/icons/video.svg" alt="record" width={16} height={16} />
                            Record
                        </button>
                    )
                }
                {
                    !!screenRecording.isRecording && (
                        <button onClick={async () => await screenRecording.stopRecording()}>
                            stop recording
                        </button>
                    )
                }
                {
                    !!screenRecording.recordedVideoUrl && (
                        <>
                            <button onClick={async () => {
                                if (screenRecording.recordedVideoUrl && videoRef.current) videoRef.current.src = screenRecording.recordedVideoUrl
                                screenRecording.resetRecording()
                                await screenRecording.startRecording()
                            }}>
                                record again
                            </button>
                            <button onClick={() => {
                                if (!screenRecording.recordedBlob) return
                                // const url = URL.createObjectURL(screenRecording.recordedBlob)
                                navigate("/upload")
                            }}>
                                <img src="/assets/icons/upload.svg" alt="upload" />
                                continue upload
                            </button>
                        </>
                    )
                }
                </section>
            ) 
        }
        </div>
    )
}
