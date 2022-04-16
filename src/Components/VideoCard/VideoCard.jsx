import "./VideoCard.css";
import { getThumbnail, getCreatorImg } from "../../Utils";
export default function VideoCard({ video }) {
    const { _id, title, creator, creatorId, views } = video;
    return (
        <div className="video-card pointer">
            <img src={getThumbnail(_id)} alt={title} className="thumbnail-img" />
            <div className="video-content-wrapper mt-6">
                <div className="video-content">
                    <img src={getCreatorImg(creatorId)} alt={creator} className="creator-img mr-8" />
                    <div className=" mr-8">
                        <div className="video-card-title mb-4">{title}</div>
                        <div className="creator-tag">{creator}</div>
                    </div>
                </div>
                <div>
                    <button className="video-menu-btn pointer">
                        <span className="material-icons-outlined">more_vert</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
