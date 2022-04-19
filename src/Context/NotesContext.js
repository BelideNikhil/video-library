import { createContext, useReducer, useEffect } from "react";
import { notesReducerFunction } from "../Reducers";
import { useAuth } from "../Hooks";
import { noteActionTypes } from "../Reducers/ActionTypes";
import { getNotesService } from "../Services";

const initialState = { notes: [], isLoading: false, error: "" };
const { SET_ERROR, SET_NOTES } = noteActionTypes;

export const NotesContext = createContext();

export function NotesProvider({ children }) {
    const [notesState, notesDispatchFunction] = useReducer(notesReducerFunction, initialState);
    const {
        authState: { token },
    } = useAuth();

    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    const { status, data } = await getNotesService(token);
                    if (status === 200) {
                        notesDispatchFunction({ type: SET_NOTES, payload: { notes: data.notes } });
                    }
                } catch (error) {
                    notesDispatchFunction({ type: SET_ERROR, payload: error.response.data.errors[0] });
                }
            })();
        }
    }, [token]);

    return <NotesContext.Provider value={{ notesState, notesDispatchFunction }}>{children}</NotesContext.Provider>;
}
