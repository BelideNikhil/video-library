import axios from "axios";

export function deleteNoteService({ token, noteId }) {
    return axios.delete(`/api/user/notes/${noteId}`, {
        headers: { authorization: token },
    });
}
