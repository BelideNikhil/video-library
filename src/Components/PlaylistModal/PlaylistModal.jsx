import { useState } from "react";
import { useAuth, usePlaylist } from "../../Hooks";
import { Loading } from "../index";
import "./PlaylistModal.css";

export default function PlaylistModal({ setPlaylistModal, video }) {
    const [newPlaylist, setNewPlaylist] = useState({ text: "", toggle: false });
    const {
        playlistState: { playlists, isLoading },
        createPlaylistHandler,
        addToPlaylistHandler,
        removeFromPlaylistHandler,
    } = usePlaylist();

    const {
        authState: { token },
    } = useAuth();

    function playlistFormHandler(e) {
        e.preventDefault();
        if (newPlaylist.text.trim() !== "") {
            createPlaylistHandler({ video, newPlaylist: newPlaylist.text, token });
            setNewPlaylist({ text: "", toggle: false });
        }
    }

    return (
        <div className="playlist-modal-wrapper flex-row-center-center">
            <div className="playlist-content my-8 pa-24">
                <div className="flex-row-spc-btw">
                    <h4>Save To</h4>
                    <button
                        className="btn-icon btn-icon-sm close-modal-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setPlaylistModal(false);
                        }}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                {isLoading ? (
                    <Loading className="loading-small" />
                ) : (
                    <ul className="flex-clmn-spc-btw playlist-modal-ul ">
                        {playlists?.length ? (
                            playlists.map((playlist) => {
                                const presentInPlaylist = playlist.videos.find((each) => each._id === video._id);
                                return (
                                    <li key={playlist._id} className="form-control">
                                        <label className="form-label flex-row-start-center">
                                            <input
                                                type="checkbox"
                                                className="form-input mr-8"
                                                checked={presentInPlaylist ? true : false}
                                                onChange={() =>
                                                    presentInPlaylist
                                                        ? removeFromPlaylistHandler({ video, token, playlist })
                                                        : addToPlaylistHandler({ video, token, playlist })
                                                }
                                            />
                                            {playlist.title}
                                        </label>
                                    </li>
                                );
                            })
                        ) : (
                            <h4 className="txt-center">No playlists available</h4>
                        )}
                    </ul>
                )}
                {newPlaylist.toggle ? (
                    <form className="user-form my-8" onSubmit={playlistFormHandler}>
                        <input
                            type="text"
                            className="form-input my-4"
                            placeholder="Create playlist..."
                            onChange={(e) => setNewPlaylist((prev) => ({ ...prev, text: e.target.value }))}
                            value={newPlaylist.text}
                        />
                        <button className="btn btn-solid-primary create-playlist-btn" type="submit">
                            Create
                        </button>
                    </form>
                ) : (
                    <div>
                        <button
                            className="btn btn-solid-primary create-playlist-btn"
                            onClick={() => setNewPlaylist((prev) => ({ ...prev, toggle: true }))}
                        >
                            Create Playlist
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
