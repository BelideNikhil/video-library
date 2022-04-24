import { historyActionTypes } from "../Reducers/ActionTypes";
import { useContext } from "react";
import toast from "react-hot-toast";
import { HistoryContext } from "../Context";
import { addToHistoryService, clearWatchHistoryService, removeFromHistoryService } from "../Services";

const { SET_ERROR, SET_HISTORY_LIST } = historyActionTypes;

export function useWatchHistory() {
    const { historyState, historyDispatchFunction } = useContext(HistoryContext);

    async function addToHistoryList({ token, video }) {
        const foundInHistory = historyState.historyList?.find((each) => each._id === video._id);
        if (token && video && !foundInHistory) {
            try {
                const { status, data } = await addToHistoryService({ token, video });

                if (status === 201) {
                    historyDispatchFunction({ type: SET_HISTORY_LIST, payload: { historyList: data.history } });
                }
            } catch (error) {
                historyDispatchFunction({ type: SET_ERROR, payload: error.response.data.errors[0] });
            }
        }
    }

    async function clearWatchHistory({ token }) {
        if (token && historyState.historyList?.length) {
            const toastId = toast.loading("Clearing...");

            try {
                const { status, data } = await clearWatchHistoryService({ token });

                if (status === 200) {
                    toast.success("History has been cleared", { id: toastId });
                    historyDispatchFunction({ type: SET_HISTORY_LIST, payload: { historyList: data.history } });
                }
            } catch (error) {
                toast.error("Error occured, try again!", { id: toastId });
                historyDispatchFunction({ type: SET_ERROR, payload: error.response.data.errors[0] });
            }
        }
    }

    async function removeVideoFromHistory({ token, videoId }) {
        if (token) {
            const toastId = toast.loading("Removing...");

            try {
                const { status, data } = await removeFromHistoryService({ token, videoId });
                if (status === 200) {
                    toast.success("Video removed from history.", { id: toastId });
                    historyDispatchFunction({ type: SET_HISTORY_LIST, payload: { historyList: data.history } });
                }
            } catch (error) {
                toast.error("Error occured, try again!", { id: toastId });
                historyDispatchFunction({ type: SET_ERROR, payload: error.response.data.errors[0] });
            }
        }
    }
    return { historyState, historyDispatchFunction, addToHistoryList, clearWatchHistory, removeVideoFromHistory };
}
