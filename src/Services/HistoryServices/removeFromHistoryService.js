import axios from "axios";

export function removeFromHistoryService({ token, videoId }) {
    return axios.delete(`/api/user/history/${videoId}`, {
        headers: { authorization: token },
    });
}
