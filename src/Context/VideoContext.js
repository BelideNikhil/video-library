import { createContext, useReducer, useRef } from "react";
import { useEffect } from "react";
import { videoReducerFunction } from "../Reducers";
import { videoActionTypes } from "../Reducers/ActionTypes";
import { getVideoList, getPagedVideosService } from "../Services";

const { SET_VIDEOLIST, SET_LOADING, SET_ERROR, SET_TOTAL_PAGES } = videoActionTypes;

const initialState = {
    videoList: [],
    error: "",
    isLoading: false,
    categories: ["All", "Off Road Basics", "Tips n Tricks", "Travel", "Dakar"],
    selectedCategory: "All",
    searchedText: "",
    sortBy: "",
    pageNum: 0,
    lastVideo: null,
    totalPages: 0,
};

export const VideoContext = createContext();

export function VideoProvider({ children }) {
    const [videoState, videoDispatchFunction] = useReducer(videoReducerFunction, initialState);
    const { pageNum, totalPages } = videoState;

    useEffect(() => {
        (async function () {
            try {
                videoDispatchFunction({ type: SET_LOADING });
                const { status, data } = await getVideoList();
                if (status === 200) {
                    videoDispatchFunction({
                        type: SET_TOTAL_PAGES,
                        payload: { totalPages: Math.ceil(data.videos.length / 8) },
                    });
                }
            } catch (err) {
                videoDispatchFunction({ type: SET_ERROR, payload: err.response.data.errors[0] });
            }
        })();
    }, []);

    useEffect(() => {
        if (pageNum < totalPages) {
            (async function () {
                try {
                    videoDispatchFunction({ type: SET_LOADING });
                    const { status, data } = await getPagedVideosService(pageNum);
                    if (status === 200) {
                        videoDispatchFunction({ type: SET_VIDEOLIST, payload: { videoList: data.videos } });
                    }
                } catch (err) {
                    videoDispatchFunction({ type: SET_ERROR, payload: err.response.data.errors[0] });
                }
            })();
        }
    }, [pageNum, totalPages]);

    return <VideoContext.Provider value={{ videoState, videoDispatchFunction }}>{children}</VideoContext.Provider>;
}
