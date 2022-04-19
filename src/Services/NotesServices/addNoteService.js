import axios from "axios";

export function addNoteService({ token, note }) {
    return axios.post(
        "/api/user/notes",
        { note },
        {
            headers: { authorization: token },
        }
    );
}
