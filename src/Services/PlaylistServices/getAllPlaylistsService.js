import axios from "axios";

export function getAllPlaylistsService({ token }) {
    return axios.get("/api/user/playlists", {
        headers: { authorization: token },
    });
}
