import { watchLaterActionTypes } from "../Reducers/ActionTypes";
import { useContext } from "react";
import toast from "react-hot-toast";
import { WatchLaterContext } from "../Context";
import { addToWatchLaterService, removeFromWatchLaterService } from "../Services";

const { SET_ERROR, SET_WATCHLATER_LIST } = watchLaterActionTypes;

export function useWatchLater() {
    const { watchLaterState, watchLaterDispatch } = useContext(WatchLaterContext);

    async function addToWatchLater({ token, video }) {
        const foundInWatchLater = watchLaterState.watchLaterList?.find((each) => each._id === video._id);

        if (token && video && !foundInWatchLater) {
            const toastId = toast.loading("Adding...");
            try {
                const { status, data } = await addToWatchLaterService({ token, video });
                if (status === 201) {
                    watchLaterDispatch({
                        type: SET_WATCHLATER_LIST,
                        payload: { watchLaterList: data.watchlater },
                    });
                    toast.success("Added to Watchlater", { id: toastId });
                }
            } catch (error) {
                toast.error("Error occured, Try again!", { id: toastId });
                watchLaterDispatch({ type: SET_ERROR, payload: error.response.data.errors[0] });
            }
        }
    }

    async function removeFromWatchLater({ token, video }) {
        const foundInWatchLater = watchLaterState.watchLaterList?.find((each) => each._id === video._id);

        if (token && video && foundInWatchLater) {
            const toastId = toast.loading("Removing...");
            try {
                const { status, data } = await removeFromWatchLaterService({ token, videoId: video._id });
                if (status === 200) {
                    watchLaterDispatch({
                        type: SET_WATCHLATER_LIST,
                        payload: { watchLaterList: data.watchlater },
                    });
                    toast.success("Removed from Watchlater.", { id: toastId });
                }
            } catch (error) {
                toast.error("Error occured, Try again!", { id: toastId });
                watchLaterDispatch({ type: SET_ERROR, payload: error.response.data.errors[0] });
            }
        }
    }

    return { watchLaterState, watchLaterDispatch, addToWatchLater, removeFromWatchLater };
}
