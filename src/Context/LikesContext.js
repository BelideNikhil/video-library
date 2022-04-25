import { createContext, useReducer, useEffect } from "react";
import { likesReducerFunction } from "../Reducers";
import { useAuth } from "../Hooks";
import { likesActionTypes } from "../Reducers/ActionTypes";
import { getLikesService } from "../Services";

const { SET_ERROR, SET_LIKED_LIST, SET_LOADING } = likesActionTypes;

const initialState = { likedList: [], isLoading: false, error: "" };

export const LikesContext = createContext();

export function LikesProvider({ children }) {
    const [likesListState, likesDispatchFucntion] = useReducer(likesReducerFunction, initialState);
    const {
        authState: { token },
    } = useAuth();

    useEffect(() => {
        if (token) {
            likesDispatchFucntion({ type: SET_LOADING });
            (async () => {
                try {
                    const { status, data } = await getLikesService({ token });
                    if (status === 200) {
                        likesDispatchFucntion({ type: SET_LIKED_LIST, payload: { likedList: data.likes } });
                    }
                } catch (error) {
                    likesDispatchFucntion({ type: SET_ERROR, payload: error.response.data.errors[0] });
                }
            })();
        }
    }, [token]);

    return <LikesContext.Provider value={{ likesListState, likesDispatchFucntion }}>{children}</LikesContext.Provider>;
}
