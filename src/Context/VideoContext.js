import { createContext, useReducer } from "react";
import { useEffect } from "react";
import { videoReducerFunction } from "../Reducers";
import { videoActionTypes } from "../Reducers/ActionTypes";
import { getVideoList } from "../Services";
const { SET_VIDEOLIST, SET_LOADING, SET_ERROR } = videoActionTypes;

const initialState = {
    videoList: [],
    error: "",
    isLoading: false,
    categories: ["All", "Off Road Basics", "Tips n Tricks", "Travel", "Dakar"],
    selectedCategory: "All",
    searchedText: "",
    sortBy: "",
};

export const VideoContext = createContext();

export function VideoProvider({ children }) {
    const [videoState, videoDispatchFunction] = useReducer(videoReducerFunction, initialState);

    useEffect(() => {
        (async function () {
            try {
                videoDispatchFunction({ type: SET_LOADING });
                const { status, data } = await getVideoList();
                if (status === 200) {
                    videoDispatchFunction({ type: SET_VIDEOLIST, payload: { videoList: data.videos } });
                }
            } catch (err) {
                videoDispatchFunction({ type: SET_ERROR, payload: err.response.data.errors[0] });
            }
        })();
    }, []);

    return <VideoContext.Provider value={{ videoState, videoDispatchFunction }}>{children}</VideoContext.Provider>;
}
