import { useContext } from "react";
import { VideoContext } from "../Context";

export function useVideo() {
    const { videoState, videoDispatchFunction } = useContext(VideoContext);
    return { videoState, videoDispatchFunction };
}
