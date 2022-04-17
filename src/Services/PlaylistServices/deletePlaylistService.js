import axios from "axios";

export function deletePlaylistService({ playlistId, token }) {
    return axios.delete(`/api/user/playlists/${playlistId}`, {
        headers: { authorization: token },
    });
}
