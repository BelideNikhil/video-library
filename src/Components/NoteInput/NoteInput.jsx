import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks";
import "./NoteInput.css";

const initialState = { title: "", text: "" };

export default function NoteInput({ noteSubmitHandler, note, setIsEditing }) {
    const [noteInput, setNoteInput] = useState(note);
    const navigate = useNavigate();
    const {
        authState: { token },
    } = useAuth();

    return (
        <div className="video-note-form-wrapper mb-24">
            <form
                className="user-form flex-clmn-center-center"
                onSubmit={(e) => {
                    token ? noteSubmitHandler({ e, note: noteInput, setNoteInput }) : navigate("/login");
                }}
            >
                <input
                    type="text"
                    className="form-input my-8"
                    onChange={(e) => setNoteInput((prev) => ({ ...prev, title: e.target.value }))}
                    value={noteInput?.title}
                    maxLength="40"
                />
                <textarea
                    cols="30"
                    rows="10"
                    className="form-input my-8"
                    onChange={(e) => setNoteInput((prev) => ({ ...prev, text: e.target.value }))}
                    value={noteInput?.text}
                ></textarea>
                <div className="flex-row-spc-btw">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            setIsEditing ? setIsEditing(false) : null;
                            setNoteInput(initialState);
                        }}
                    >
                        Discard
                    </button>
                    <button type="submit" className="btn btn-solid-primary create-note-btn">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
