import "./SinglePlaylist.css";
import { Sidebar } from "../../Components";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth, usePlaylist } from "../../Hooks";
import { getThumbnail } from "../../Utils";

export default function SinglePlaylist() {
    const {
        playlistState: { playlists },
        deleteVideoFromPlaylistHandler,
    } = usePlaylist();
    const {
        authState: { token },
    } = useAuth();

    const { playlistId } = useParams();
    const playlist = playlists?.find((item) => item._id === playlistId);

    const navigate = useNavigate();
    return (
        <div className="main-wrapper">
            <Sidebar />
            <main className="main pt-12">
                <div className="single-playlist-wrapper">
                    <div className="single-playlist-thumbnail">
                        <img
                            src={
                                playlist?.videos[0]?._id
                                    ? getThumbnail(playlist?.videos[0]._id)
                                    : "/Assets/playlist-thumbnail.jpg"
                            }
                            alt={playlist?.title}
                            className="image-responsive"
                        />
                        <h4 className="txt-center">{playlist?.title || "Playlist"}</h4>
                    </div>
                    <div>
                        {playlist ? (
                            playlist.videos?.map((video) => {
                                return (
                                    <div
                                        key={video._id}
                                        className="horizontal-video-card pointer mb-16"
                                        onClick={() => navigate(`/explore/${video._id}`)}
                                    >
                                        <img src={getThumbnail(video._id)} alt={video._id} />
                                        <div className="horizontal-video-content pa-6">
                                            <div>{video.title}</div>
                                            <div className="creator-tag">{video.creator}</div>
                                        </div>
                                        <div>
                                            <button
                                                className="btn-icon delete-video-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteVideoFromPlaylistHandler({
                                                        token,
                                                        videoId: video._id,
                                                        playlistId,
                                                    });
                                                }}
                                            >
                                                <i className="material-icons-outlined">delete_outline</i>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <h4 className="txt-center">Playlist is Empty</h4>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
