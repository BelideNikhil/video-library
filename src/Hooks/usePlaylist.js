import { useContext } from "react";
import { PlaylistContext } from "../Context";
import { playlistsActionTypes } from "../Reducers/ActionTypes";
import toast from "react-hot-toast";
import {
    addToPlaylistService,
    createPlaylistService,
    removeFromPlaylistService,
    deletePlaylistService,
} from "../Services";

const { SET_PLAYLISTS, UPDATE_PLAYLIST, SET_LOADING, SET_ERROR } = playlistsActionTypes;

export function usePlaylist() {
    const { playlistState, playlistDispatch } = useContext(PlaylistContext);

    async function createPlaylistHandler({ newPlaylist, token, video }) {
        const toastId = toast.loading("Creating...");

        try {
            playlistDispatch({ type: SET_LOADING });

            const { status, data } = await createPlaylistService({ newPlaylist, token });

            if (status === 201) {
                playlistDispatch({ type: SET_PLAYLISTS, payload: { playlists: data.playlists } });
                toast.success("New playlist created.", { id: toastId });
                video &&
                    (await addToPlaylistHandler({ video, token, playlist: data.playlists[data.playlists.length - 1] }));
            }
        } catch (err) {
            toast.error("Error Occured, Try Again.", { id: toastId });
            playlistDispatch({ type: SET_ERROR, payload: { error: err.response.data.errors[0] } });
        }
    }

    async function addToPlaylistHandler({ video, token, playlist }) {
        const toastId = toast.loading("Adding...");

        try {
            playlistDispatch({ type: SET_LOADING });

            const { status, data } = await addToPlaylistService({ video, token, playlist });

            if (status === 201) {
                playlistDispatch({ type: UPDATE_PLAYLIST, payload: { playlist: data.playlist } });
                toast.success("Video added to playlist.", { id: toastId });
            }
        } catch (err) {
            toast.error("Error Occured, Try Again.", { id: toastId });
            playlistDispatch({ type: SET_ERROR, payload: { error: err.response.data.errors[0] } });
        }
    }

    async function removeFromPlaylistHandler({ video, token, playlist }) {
        const toastId = toast.loading("Removing...");

        try {
            playlistDispatch({ type: SET_LOADING });

            const { status, data } = await removeFromPlaylistService({ video, token, playlist });

            if (status === 200) {
                toast.success("Video removed from playlist.", { id: toastId });
                playlistDispatch({ type: UPDATE_PLAYLIST, payload: { playlist: data.playlist } });
            }
        } catch (err) {
            toast.error("Error Occured, Try Again.", { id: toastId });
            playlistDispatch({ type: SET_ERROR, payload: { error: err.response.data.errors[0] } });
        }
    }

    async function deletePlaylistHandler({ playlistId, token }) {
        const toastId = toast.loading("Deleting...");

        try {
            const { status, data } = await deletePlaylistService({ token, playlistId });

            if (status === 200) {
                toast.success("Playlist deleted.", { id: toastId });
                playlistDispatch({ type: SET_PLAYLISTS, payload: { playlists: data.playlists } });
            }
        } catch (err) {
            toast.error("Error Occured, Try Again.", { id: toastId });
            playlistDispatch({ type: SET_ERROR, payload: { error: err.response.data.errors[0] } });
        }
    }

    return {
        playlistState,
        playlistDispatch,
        createPlaylistHandler,
        addToPlaylistHandler,
        removeFromPlaylistHandler,
        deletePlaylistHandler,
    };
}
