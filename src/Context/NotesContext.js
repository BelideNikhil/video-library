import { createContext, useReducer, useEffect } from "react";
import { notesReducerFunction } from "../Reducers";
import { useAuth } from "../Hooks";
import { noteActionTypes } from "../Reducers/ActionTypes";
import { getNotesService } from "../Services";

const initialState = { notes: [], isLoading: false, error: "", videoId: "" };
const { SET_ERROR, SET_NOTES, SET_LOADING } = noteActionTypes;

export const NotesContext = createContext();

export function NotesProvider({ children }) {
    const [notesState, notesDispatchFunction] = useReducer(notesReducerFunction, initialState);
    const {
        authState: { token },
    } = useAuth();
    const { videoId } = notesState;

    useEffect(() => {
        if (token && videoId) {
            notesDispatchFunction({ type: SET_LOADING });
            (async () => {
                try {
                    const { status, data } = await getNotesService({ token, videoId });
                    if (status === 200) {
                        notesDispatchFunction({ type: SET_NOTES, payload: { notes: data.notes } });
                    }
                } catch (error) {
                    notesDispatchFunction({ type: SET_ERROR, payload: error.response.data.errors[0] });
                }
            })();
        }
    }, [token, videoId]);

    return <NotesContext.Provider value={{ notesState, notesDispatchFunction }}>{children}</NotesContext.Provider>;
}
