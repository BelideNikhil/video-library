import { historyActionTypes } from "./ActionTypes";

const { SET_LOADING, SET_ERROR, SET_HISTORY_LIST } = historyActionTypes;

export function historyReducerFunction(historyState, { type, payload }) {
    switch (type) {
        case SET_HISTORY_LIST:
            return { ...historyState, historyList: payload.historyList, isLoading: false, error: "" };
        case SET_LOADING:
            return { ...historyState, isLoading: true };
        case SET_ERROR:
            return { ...historyState, isLoading: false, error: payload.error };
        default:
            return historyState;
    }
}
