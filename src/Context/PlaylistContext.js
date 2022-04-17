import { createContext, useReducer, useEffect } from "react";
import { useAuth } from "../Hooks";
import { playlistReducer } from "../Reducers";
import { playlistsActionTypes } from "../Reducers/ActionTypes";
import { getAllPlaylistsService } from "../Services";

const initialState = { playlists: [], isLoading: false, error: "" };

const { SET_LOADING, SET_ERROR, SET_PLAYLISTS } = playlistsActionTypes;

export const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
    const [playlistState, playlistDispatch] = useReducer(playlistReducer, initialState);
    const {
        authState: { token },
    } = useAuth();

    useEffect(() => {
        if (token) {
            (async function () {
                playlistDispatch({ type: SET_LOADING });
                try {
                    const { status, data } = await getAllPlaylistsService({ token });
                    if (status === 200) {
                        playlistDispatch({ type: SET_PLAYLISTS, payload: { playlists: data.playlists } });
                    }
                } catch (err) {
                    playlistDispatch({ type: SET_ERROR, payload: { error: err.response.data.errors[0] } });
                }
            })();
        }
    }, [token]);

    return <PlaylistContext.Provider value={{ playlistState, playlistDispatch }}>{children}</PlaylistContext.Provider>;
}
