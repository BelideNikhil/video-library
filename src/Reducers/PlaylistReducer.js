import { playlistsActionTypes } from "./ActionTypes";

const { SET_LOADING, SET_ERROR, SET_PLAYLISTS, UPDATE_PLAYLIST } = playlistsActionTypes;

export function playlistReducer(playlistState, { type, payload }) {
    switch (type) {
        case SET_PLAYLISTS:
            return { ...playlistState, playlists: payload.playlists, isLoading: false, error: "" };
        case SET_ERROR:
            return { ...playlistState, isLoading: false, error: payload.error };
        case SET_LOADING:
            return { ...playlistState, isLoading: true };
        case UPDATE_PLAYLIST:
            return {
                ...playlistState,
                playlists: playlistState.playlists.map((eachPlaylist) =>
                    eachPlaylist._id === payload.playlist._id ? payload.playlist : eachPlaylist
                ),
                isLoading: false,
            };
        default:
            return playlistState;
    }
}
