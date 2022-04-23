import "./NewPlaylistCard.css";
import { useState } from "react";
import { usePlaylist, useAuth } from "../../Hooks";

const initialState = { text: "", toggle: false };

export default function NewPlaylistCard() {
    const [newPlaylist, setNewPlaylist] = useState(initialState);
    const { createPlaylistHandler } = usePlaylist();
    const {
        authState: { token },
    } = useAuth();

    function playlistFormHandler(e) {
        e.preventDefault();
        if (newPlaylist.text.trim() !== "") {
            createPlaylistHandler({ newPlaylist: newPlaylist.text, token });
            setNewPlaylist(initialState);
        }
    }

    return (
        <div className="new-playlist-wrapper flex-row-center-center">
            {newPlaylist.toggle ? (
                <form className="user-form pa-24" onSubmit={playlistFormHandler}>
                    <input
                        autoFocus
                        type="text"
                        className="form-input my-8"
                        onChange={(e) => setNewPlaylist((prev) => ({ ...prev, text: e.target.value }))}
                    />
                    <div className="flex-row-spc-btw my-8">
                        <button className="btn btn-primary " type="button" onClick={() => setNewPlaylist(initialState)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-solid-primary create-playlist-btn">
                            Create
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    className="btn btn-primary"
                    onClick={() => setNewPlaylist((prev) => ({ ...prev, toggle: true }))}
                >
                    Create New Playlist
                </button>
            )}
        </div>
    );
}
