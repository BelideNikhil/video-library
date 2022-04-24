import axios from "axios";

export function getWatchLaterService({ token }) {
    return axios.get(`/api/user/watchlater`, {
        headers: { authorization: token },
    });
}
