import axios from "axios";

export function getNotesService(token) {
    return axios.get(`/api/user/notes`, {
        headers: { authorization: token },
    });
}
