import axios from "axios";

export function deleteVideoInPlaylistService({ token, playlistId, videoId }) {
    return axios.delete(`/api/user/playlists/${playlistId}/${videoId}`, {
        headers: { authorization: token },
    });
}
