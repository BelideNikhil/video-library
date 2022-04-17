import axios from "axios";

export function createPlaylistService({ newPlaylist, token }) {
    return axios.post(
        "/api/user/playlists",
        {
            playlist: { title: newPlaylist },
        },
        {
            headers: { authorization: token },
        }
    );
}
