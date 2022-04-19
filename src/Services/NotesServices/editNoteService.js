import axios from "axios";

export function editNoteService({ token, note }) {
    return axios.post(
        `/api/user/notes/${note._id}`,
        { note },
        {
            headers: { authorization: token },
        }
    );
}
