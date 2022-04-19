import { noteActionTypes } from "../Reducers/ActionTypes";
import { useContext } from "react";
import { NotesContext } from "../Context";
import { deleteNoteService, addNoteService, editNoteService } from "../Services";
import toast from "react-hot-toast";

const { SET_ERROR, SET_NOTES } = noteActionTypes;

export function useNotes() {
    const { notesState, notesDispatchFunction } = useContext(NotesContext);

    async function addNoteHandler({ token, note }) {
        if (token) {
            const toastId = toast.loading("Creating...");

            try {
                const { status, data } = await addNoteService({ token, note });

                if (status === 201) {
                    toast.success("Note Created", { id: toastId });
                    notesDispatchFunction({ type: SET_NOTES, payload: { notes: data.notes } });
                }
            } catch (error) {
                toast.error("Error occured. Try Again", { id: toastId });
                notesDispatchFunction({ type: SET_ERROR, payload: error.response.data.errors[0] });
            }
        }
    }

    async function deleteNoteHandler({ token, noteId }) {
        if (token) {
            const toastId = toast.loading("Deleting...");

            try {
                const { status, data } = await deleteNoteService({ token, noteId });

                if (status === 200) {
                    toast.success("Note Deleted", { id: toastId });
                    notesDispatchFunction({ type: SET_NOTES, payload: { notes: data.notes } });
                }
            } catch (error) {
                toast.error("Error occured. Try Again", { id: toastId });
                notesDispatchFunction({ type: SET_ERROR, payload: error.response.data.errors[0] });
            }
        }
    }

    async function editNoteHandler({ token, note }) {
        if (token) {
            const toastId = toast.loading("Updating...");

            try {
                const { status, data } = await editNoteService({ token, note });

                if (status === 201) {
                    toast.success("Note Updated", { id: toastId });
                    notesDispatchFunction({ type: SET_NOTES, payload: { notes: data.notes } });
                }
            } catch (error) {
                toast.error("Error occured. Try Again", { id: toastId });
                notesDispatchFunction({ type: SET_ERROR, payload: error.response.data.errors[0] });
            }
        }
    }
    return { notesState, notesDispatchFunction, addNoteHandler, deleteNoteHandler, editNoteHandler };
}
