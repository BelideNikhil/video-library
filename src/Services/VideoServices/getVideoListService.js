import axios from "axios";

export function getVideoList() {
    return axios.get("/api/videos");
}
