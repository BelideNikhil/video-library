import "./ThreeDotMenu.css";
import { useState } from "react";
import { PlaylistModal } from "../index";
import { useAuth, useWatchHistory } from "../../Hooks";
import { useLocation, useNavigate } from "react-router-dom";

export default function ThreeDotMenu({ video }) {
    const [showPlaylistModal, setPlaylistModal] = useState(false);
    const navigate = useNavigate();

    const {
        authState: { token },
    } = useAuth();
    const { removeVideoFromHistory } = useWatchHistory();
    const currentPath = useLocation().pathname;
    return (
        <>
            <div className="three-dot-wrapper flex-clmn-start-start pa-12">
                <button
                    className="menu-btn pointer flex-row-start-center ma-8"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <span className="material-icons-outlined mr-16 ">watch_later</span>Save to Watch Later
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
