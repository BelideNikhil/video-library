import { useAuth, useNotes } from "../../Hooks";
import NoteCard from "./NoteCard";
import "./NoteList.css";
import Loading from "../Loading/Loading";

export default function NoteList() {
    const {
        notesState: { notes, isLoading },
    } = useNotes();

    const {
        authState: { token },
    } = useAuth();

    return (
        <div className="w-90 ma-auto">
            {token ? (
                isLoading ? (
                    <Loading />
                ) : (
                    notes.map((note) => <NoteCard note={note} key={note._id} />)
                )
            ) : (
                <h5 className="txt-center">Login To View or Create Notes</h5>
            )}
        </div>
    );
}
