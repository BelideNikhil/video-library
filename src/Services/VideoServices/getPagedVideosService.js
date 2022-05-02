import axios from "axios";

export function getPagedVideosService(pageNum) {
    return axios.get(`/api/videos/page/${pageNum}`);
}
