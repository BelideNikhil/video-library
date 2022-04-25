import "./ThreeDotMenu.css";
import { useState } from "react";
import { PlaylistModal } from "../index";
import { useAuth, useWatchHistory, useWatchLater } from "../../Hooks";
import { useLocation, useNavigate } from "react-router-dom";

export default function ThreeDotMenu({ video }) {
    const [showPlaylistModal, setPlaylistModal] = useState(false);
    const navigate = useNavigate();
    const { watchLaterState, addToWatchLater, removeFromWatchLater } = useWatchLater();

    const {
        authState: { token },
    } = useAuth();

    const { removeVideoFromHistory } = useWatchHistory();

    const foundInWatchLater = watchLaterState.watchLaterList?.find((each) => each._id === video._id);
    const currentPath = useLocation().pathname;

    return (
        <>
            <div
                className="three-dot-wrapper flex-clmn-start-start pa-12"
                role="button"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="menu-btn pointer flex-row-start-center ma-8"
                    onClick={(e) => {
                        e.stopPropagation();
                        {
                            token
                                ? foundInWatchLater
                                    ? removeFromWatchLater({ token, video })
                                    : addToWatchLater({ token, video })
                                : navigate("/login");
                        }
                    }}
                >
                    <span className="material-icons-outlined mr-16 ">
                        {foundInWatchLater ? "block" : "watch_later"}
                    </span>
                    {foundInWatchLater ? "Remove from" : "Save to"} Watch Later
                </button>
                <button
                    className="menu-btn pointer flex-row-start-center ma-8"
                    onClick={(e) => {
                        e.stopPropagation();
                        token ? setPlaylistModal(true) : navigate("/login");
                    }}
                >
                    <span className="material-icons-outlined mr-16 ">playlist_add</span>Save to Playlist
                </button>
                {token && currentPath === "/history" ? (
                    <button
                        className="menu-btn pointer flex-row-start-center ma-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeVideoFromHistory({ token, videoId: video._id });
                        }}
                    >
                        <span className="material-icons-outlined mr-16">block</span>Remove From History
                    </button>
                ) : null}
            </div>
            {showPlaylistModal ? <PlaylistModal setPlaylistModal={setPlaylistModal} video={video} /> : null}
        </>
    );
}
