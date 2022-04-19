import "./VideoCard.css";
import { getThumbnail, getCreatorImg } from "../../Utils";
import { ThreeDotMenu } from "../index";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
    const [showMenu, setShowMenu] = useState(false);
    const { _id, title, creator, creatorId } = video;
    const videoCardRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (showMenu && videoCardRef.current && !videoCardRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => document.removeEventListener("mousedown", checkIfClickedOutside);
    }, [showMenu]);

    return (
        <div
            className="video-card pointer"
            ref={videoCardRef}
            role="button"
            onClick={() => navigate(`/explore/${_id}`)}
        >
            <img src={getThumbnail(_id)} alt={title} className="thumbnail-img" />
            <div className="video-content-wrapper mt-6">
                <div className="video-content">
                    <img src={getCreatorImg(creatorId)} alt={creator} className="creator-img mr-8" />
                    <div className=" mr-8">
                        <div className="video-card-title mb-4">{title}</div>
                        <div className="creator-tag">{creator}</div>
                    </div>
                </div>
                <div style={{ position: "relative" }}>
                    <button
                        className="video-menu-btn pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu((prev) => !prev);
                        }}
                    >
                        <span className="material-icons-outlined">more_vert</span>
                    </button>
                    {showMenu ? <ThreeDotMenu video={video} /> : null}
                </div>
            </div>
        </div>
    );
}
