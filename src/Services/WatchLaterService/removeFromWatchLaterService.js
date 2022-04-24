import axios from "axios";

export function removeFromWatchLaterService({ token, videoId }) {
    return axios.delete(`/api/user/watchlater/${videoId}`, {
        headers: { authorization: token },
    });
}
