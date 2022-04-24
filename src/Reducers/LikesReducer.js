import { likesActionTypes } from "./ActionTypes";

const { SET_LOADING, SET_ERROR, SET_LIKED_LIST } = likesActionTypes;

export function likesReducerFunction(likesListState, { type, payload }) {
    switch (type) {
        case SET_LIKED_LIST:
            return { ...likesListState, likedList: payload.likedList, isLoading: false, error: "" };
        case SET_LOADING:
            return { ...likesListState, isLoading: true };
        case SET_ERROR:
            return { ...likesListState, isLoading: false, error: payload.error };
        default:
            return likesListState;
    }
}
