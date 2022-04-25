import { likesActionTypes } from "../Reducers/ActionTypes";
import { useContext } from "react";
import toast from "react-hot-toast";
import { LikesContext } from "../Context";
import { addToLikedVideoService, removeFromLikedService } from "../Services";

const { SET_ERROR, SET_LIKED_LIST } = likesActionTypes;

export function useLikes() {
    const { likesListState, likesDispatchFucntion } = useContext(LikesContext);

    async function addToLikedVideos({ token, video }) {
        const foundInLikedVideos = likesListState.likedList?.find((each) => each._id === video._id);

        if (token && video && !foundInLikedVideos) {
            const toastId = toast.loading("Removing...");

            try {
                const { status, data } = await addToLikedVideoService({ token, video });
                if (status === 201) {
                    toast.success("Added to liked videos.", { id: toastId });
                    likesDispatchFucntion({ type: SET_LIKED_LIST, payload: { likedList: data.likes } });
                }
            } catch (error) {
                toast.error("Error occured, try again!", { id: toastId });
                likesDispatchFucntion({ type: SET_ERROR, payload: error.response.data.errors[0] });
            }
        }
    }

    async function removeFromLikedVideos({ token, videoId }) {
        if (token) {
            const toastId = toast.loading("Removing...");

            try {
                const { status, data } = await removeFromLikedService({ token, videoId });
                if (status === 200) {
                    toast.success("Removed from liked videos.", { id: toastId });
                    likesDispatchFucntion({ type: SET_LIKED_LIST, payload: { likedList: data.likes } });
                }
            } catch (error) {
                toast.error("Error occured, try again!", { id: toastId });
                likesDispatchFucntion({ type: SET_ERROR, payload: error.response.data.errors[0] });
            }
        }
    }
    return { likesListState, likesDispatchFucntion, addToLikedVideos, removeFromLikedVideos };
}
