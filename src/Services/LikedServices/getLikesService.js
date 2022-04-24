import axios from "axios";

export function getLikesService({ token }) {
    return axios.get(`/api/user/likes`, {
        headers: { authorization: token },
    });
}
