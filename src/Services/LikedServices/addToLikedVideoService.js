import axios from "axios";

export function addToLikedVideoService({ token, video }) {
    return axios.post(
        "/api/user/likes",
        { video },
        {
            headers: { authorization: token },
        }
    );
}
