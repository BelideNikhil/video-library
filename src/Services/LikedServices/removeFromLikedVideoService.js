import axios from "axios";

export function removeFromLikedService({ token, videoId }) {
    return axios.delete(`/api/user/likes/${videoId}`, {
        headers: { authorization: token },
    });
}
