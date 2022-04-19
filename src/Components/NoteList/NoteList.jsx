import { useAuth, useNotes } from "../../Hooks";
import NoteCard from "./NoteCard";
import "./NoteList.css";

export default function NoteList() {
    const {
        notesState: { notes },
    } = useNotes();

    const {
        authState: { token },
    } = useAuth();

    return (
        <div className="w-90 ma-auto">
            {token ? (
                notes?.map((note) => {
                    return <NoteCard note={note} key={note._id} />;
                })
            ) : (
                <h5 className="txt-center">Login To View or Create Notes</h5>
            )}
        </div>
    );
}
