import "./SingleVideo.css";
import { useState, useEffect } from "react";
import { useVideo, useAuth, useNotes, useWatchHistory, useLikes, useWatchLater } from "../../Hooks";
import { Loading, Sidebar, PlaylistModal, NoteInput, NoteList } from "../../Components";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { getCreatorImg, getVideoUrl } from "../../Utils";
import { noteActionTypes } from "../../Reducers/ActionTypes";

const { SET_VIDEO_ID } = noteActionTypes;

export default function SingleVideo() {
    const [showPlaylistModal, setPlaylistModal] = useState(false);
    const navigate = useNavigate();

    const {
        videoState: { videoList, isLoading },
    } = useVideo();

    const {
        authState: { token },
    } = useAuth();

    const { addNoteHandler, notesDispatchFunction } = useNotes();
    const { addToHistoryList } = useWatchHistory();
    const { watchLaterState, addToWatchLater, removeFromWatchLater } = useWatchLater();
    const { addToLikedVideos, removeFromLikedVideos, likesListState } = useLikes();

    const { videoId } = useParams();
    const video = videoList?.find((each) => each._id === videoId);

    function noteSubmitHandler({ e, note, setNoteInput }) {
        e.preventDefault();
        if (note.title.trim() || note.text.trim()) {
            addNoteHandler({ token, note: { ...note, videoId } });
            setNoteInput({ title: "", text: "" });
        }
    }

    const foundInLikedVideos = likesListState.likedList?.find((each) => each._id === video._id);
    const foundInWatchLater = watchLaterState.watchLaterList?.find((each) => each._id === video._id);

    useEffect(() => {
        notesDispatchFunction({ type: SET_VIDEO_ID, payload: { videoId } });
        addToHistoryList({ token, video });
    }, [videoId, token, video]);

    return (
        <div className="main-wrapper">
            <Sidebar />
            {isLoading ? (
                <Loading />
            ) : (
                <main className="main pt-12 single-video-wrapper">
                    <div className="single-video">
                        <ReactPlayer playing width="100%" height="25rem" controls={true} url={getVideoUrl(videoId)} />

                        <div className="single-video-title my-8">{video?.title}</div>
                        <div className="view-count">{video?.views} views</div>

                        <div className="single-video-actions my-12">
                            <button
                                className="btn-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    token
                                        ? foundInLikedVideos
                                            ? removeFromLikedVideos({ token, videoId: video._id })
                                            : addToLikedVideos({ token, video })
                                        : navigate("/login");
                                }}
                            >
                                <i className={`material-icons${foundInLikedVideos ? "" : "-outlined"}`}>thumb_up</i>
                            </button>
                            <button
                                className="btn-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    token
                                        ? foundInWatchLater
                                            ? removeFromWatchLater({ token, video })
                                            : addToWatchLater({ token, video })
                                        : navigate("/login");
                                }}
                            >
                                <i className={`material-icons${foundInWatchLater ? "" : "-outlined"}`}>watch_later</i>
                            </button>
                            <button
                                className="btn-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    token ? setPlaylistModal(true) : navigate("/login");
                                }}
                            >
                                <i className="material-icons-outlined">playlist_add</i>
                            </button>
                        </div>

                        <div className="flex-row-start-center mb-12">
                            <div className="avatar avatar-round avatar-small mr-16">
                                <img src={getCreatorImg(video?.creatorId)} alt={video?.creator} />
                            </div>
                            <span className="creator-tag">{video?.creator}</span>
                        </div>
                        <div className="video-description">{video?.description}</div>
                    </div>

                    {showPlaylistModal ? <PlaylistModal setPlaylistModal={setPlaylistModal} video={video} /> : null}

                    <div className="video-notes-wrapper">
                        <h4 className="txt-center mb-4">Notes</h4>
                        <NoteInput
                            videoId={videoId}
                            noteSubmitHandler={noteSubmitHandler}
                            note={{ title: "", text: "" }}
                        />
                        <NoteList videoId={videoId} />
                    </div>
                </main>
            )}
        </div>
    );
}
