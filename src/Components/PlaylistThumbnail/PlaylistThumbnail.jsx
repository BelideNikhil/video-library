import "./PlaylistThumbnail.css";
import { getThumbnail } from "../../Utils/getThumbnail";
import { useAuth, usePlaylist } from "../../Hooks";

export default function PlaylistThumbnail({ playlist }) {
    const { deletePlaylistHandler } = usePlaylist();
    const {
        authState: { token },
    } = useAuth();

    return (
        <div className="playlist-thumbnail">
            <img
                src={playlist.videos.length ? getThumbnail(playlist.videos[0]._id) : "/Assets/playlist-thumbnail.jpg"}
                alt={playlist.title}
            />
            <div className="thumbnail-overlay flex-clmn-center-center">
                <div>{playlist.videos.length}</div>
                <span className="material-icons-outlined">playlist_play</span>
            </div>
            <div className="flex-row-spc-btw">
                <div className="playlist-title">{playlist.title}</div>
                <button
                    className="btn-icon delete-playlist-btn"
                    onClick={() => deletePlaylistHandler({ playlistId: playlist._id, token })}
                >
                    <span className="material-icons-outlined">delete_outline</span>
                </button>
            </div>
        </div>
    );
}
