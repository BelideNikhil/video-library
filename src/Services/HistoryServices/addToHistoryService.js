import axios from "axios";

export function addToHistoryService({ token, video }) {
    return axios.post(
        "/api/user/history",
        { video },
        {
            headers: { authorization: token },
        }
    );
}
