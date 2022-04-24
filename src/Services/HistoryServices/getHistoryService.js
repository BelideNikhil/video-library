import axios from "axios";

export function getHistoryService({ token }) {
    return axios.get(`/api/user/history`, {
        headers: { authorization: token },
    });
}
