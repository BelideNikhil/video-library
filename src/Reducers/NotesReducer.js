import { noteActionTypes } from "./ActionTypes";

const { SET_LOADING, SET_ERROR, SET_NOTES } = noteActionTypes;

export function notesReducerFunction(notesState, { type, payload }) {
    switch (type) {
        case SET_NOTES:
            return { ...notesState, notes: payload.notes, isLoading: false, error: "" };
        case SET_LOADING:
            return { ...notesState, isLoading: true };
        case SET_ERROR:
            return { ...notesState, isLoading: false, error: payload.error };
        default:
            return notesState;
    }
}
