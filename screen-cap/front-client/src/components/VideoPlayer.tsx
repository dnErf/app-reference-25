import { DIRECTUS_URL } from "astro:env/client"

export const VideoPlayer = ({ id }: { id: string | undefined; }) => {
    const videoUrl = id !== undefined
        ? `${DIRECTUS_URL}/assets/${id}`
        : ""

    return (
        <div>
            <video width="250" controls>
                <source type="video/mp4" src={videoUrl}></source>
            </video>
        </div>
    )
}
