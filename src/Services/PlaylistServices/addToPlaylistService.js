import axios from "axios";

export function addToPlaylistService({ video, token, playlist }) {
    return axios.post(
        `/api/user/playlists/${playlist._id}`,
        {
            video,
        },
        {
            headers: { authorization: token },
        }
    );
}
