import axios from "axios";

export function removeFromPlaylistService({ video, token, playlist }) {
    return axios.delete(`/api/user/playlists/${playlist._id}/${video._id}`, {
        headers: { authorization: token },
    });
}
