import axios from "axios";

export function addToWatchLaterService({ token, video }) {
    return axios.post(
        "/api/user/watchlater",
        { video },
        {
            headers: { authorization: token },
        }
    );
}
