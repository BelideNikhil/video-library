import NoteInput from "../NoteInput/NoteInput";
import { useAuth, useNotes } from "../../Hooks";
import { useState } from "react";

export default function NoteCard({ note }) {
    const [isEditing, setIsEditing] = useState(false);
    const { deleteNoteHandler, editNoteHandler } = useNotes();
    const {
        authState: { token },
    } = useAuth();

    function noteSubmitHandler({ e, note }) {
        e.preventDefault();
        if (note.title.trim() && note.text.trim()) {
            editNoteHandler({ token, note });
            setIsEditing(false);
        }
    }

    return isEditing ? (
        <NoteInput note={note} noteSubmitHandler={noteSubmitHandler} setIsEditing={setIsEditing} />
    ) : (
        <div className="card video-note-card my-12">
            <div className="ma-8">{note.title}</div>
            <div className="ma-8">{note.text}</div>
            <div className="video-note-actions">
                <button className="btn-icon" onClick={() => setIsEditing(true)}>
                    <i className="material-icons-outlined">edit</i>
                </button>
                <button className="btn-icon" onClick={() => deleteNoteHandler({ token, noteId: note._id })}>
                    <i className="material-icons-outlined">delete_outline</i>
                </button>
            </div>
        </div>
    );
}
