import { videoActionTypes } from "./ActionTypes";

const { SET_VIDEOLIST, SET_LOADING, SET_ERROR, SET_SELECTED_CATEGORY } = videoActionTypes;

export function videoReducerFunction(videoState, { type, payload }) {
    switch (type) {
        case SET_VIDEOLIST:
            return { ...videoState, videoList: payload.videoList, isLoading: false, error: "" };
        case SET_LOADING:
            return { ...videoState, isLoading: true };
        case SET_ERROR:
            return { ...videoState, isLoading: false, error: payload.error };
        case SET_SELECTED_CATEGORY:
            return { ...videoState, selectedCategory: payload.selectedCategory };
        default:
            return videoState;
    }
}
