import { createContext, useReducer, useEffect } from "react";
import { watchLaterReducer } from "../Reducers";
import { useAuth } from "../Hooks";
import { watchLaterActionTypes } from "../Reducers/ActionTypes";
import { getWatchLaterService } from "../Services";

const { SET_LOADING, SET_ERROR, SET_WATCHLATER_LIST } = watchLaterActionTypes;

const initialState = { watchLaterList: [], isLoading: false, error: "" };

export const WatchLaterContext = createContext();

export function WatchLaterProvider({ children }) {
    const [watchLaterState, watchLaterDispatch] = useReducer(watchLaterReducer, initialState);
    const {
        authState: { token },
    } = useAuth();

    useEffect(() => {
        if (token) {
            watchLaterDispatch({ type: SET_LOADING });
            (async () => {
                try {
                    const { status, data } = await getWatchLaterService({ token });
                    if (status === 200) {
                        watchLaterDispatch({ type: SET_WATCHLATER_LIST, payload: { watchLaterList: data.watchLater } });
                    }
                } catch (error) {
                    watchLaterDispatch({ type: SET_ERROR, payload: error.response.data.errors[0] });
                }
            })();
        }
    }, [token]);

    return (
        <WatchLaterContext.Provider value={{ watchLaterState, watchLaterDispatch }}>
            {children}
        </WatchLaterContext.Provider>
    );
}
