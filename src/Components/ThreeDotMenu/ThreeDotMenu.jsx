import "./ThreeDotMenu.css";
import { useState } from "react";
import { PlaylistModal } from "../index";
import { useAuth } from "../../Hooks";
import { useNavigate } from "react-router-dom";

export default function ThreeDotMenu({ video }) {
    const [showPlaylistModal, setPlaylistModal] = useState(false);
    const navigate = useNavigate();

    const {
        authState: { token },
    } = useAuth();

    return (
        <>
            <div className="three-dot-wrapper flex-clmn-start-start pa-12">
                <button className="menu-btn pointer flex-row-start-center ma-8">
                    <span className="material-icons-outlined mr-16 ">thumb_up</span>Save to Liked
                </button>
                <button className="menu-btn pointer flex-row-start-center ma-8">
                    <span className="material-icons-outlined mr-16 ">watch_later</span>Save to Watch Later
                </button>
                <button
                    className="menu-btn pointer flex-row-start-center ma-8"
                    onClick={() => (token ? setPlaylistModal(true) : navigate("/login"))}
                >
                    <span className="material-icons-outlined mr-16 ">playlist_add</span>Save to Playlist
                </button>
            </div>
            {showPlaylistModal ? <PlaylistModal setPlaylistModal={setPlaylistModal} video={video} /> : null}
        </>
    );
}
