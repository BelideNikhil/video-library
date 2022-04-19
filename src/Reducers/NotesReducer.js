import { noteActionTypes } from "./ActionTypes";

const { SET_LOADING, SET_ERROR, SET_NOTES, SET_VIDEO_ID } = noteActionTypes;

export function notesReducerFunction(notesState, { type, payload }) {
    switch (type) {
        case SET_NOTES:
            return { ...notesState, notes: payload.notes, isLoading: false, error: "" };
        case SET_LOADING:
            return { ...notesState, isLoading: true };
        case SET_ERROR:
            return { ...notesState, isLoading: false, error: payload.error };
        case SET_VIDEO_ID:
            return { ...notesState, videoId: payload.videoId };
        default:
            return notesState;
    }
}
