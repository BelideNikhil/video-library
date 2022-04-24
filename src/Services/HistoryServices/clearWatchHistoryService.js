import axios from "axios";

export function clearWatchHistoryService({ token }) {
    return axios.delete("/api/user/history/all", {
        headers: { authorization: token },
    });
}
