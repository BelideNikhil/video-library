import { watchLaterActionTypes } from "./ActionTypes";

const { SET_LOADING, SET_ERROR, SET_WATCHLATER_LIST } = watchLaterActionTypes;

export function watchLaterReducer(watchLaterState, { type, payload }) {
    switch (type) {
        case SET_WATCHLATER_LIST:
            return { ...watchLaterState, watchLaterList: payload.watchLaterList, isLoading: false, error: "" };
        case SET_LOADING:
            return { ...watchLaterState, isLoading: true };
        case SET_ERROR:
            return { ...watchLaterState, isLoading: false, error: payload.error };
        default:
            return watchLaterState;
    }
}
