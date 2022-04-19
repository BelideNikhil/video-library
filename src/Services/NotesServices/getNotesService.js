import axios from "axios";

export function getNotesService({ token, videoId }) {
    return axios.get(`/api/user/notes/${videoId}`, {
        headers: { authorization: token },
    });
}
