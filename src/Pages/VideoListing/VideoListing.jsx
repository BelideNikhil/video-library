import "./VideoListing.css";
import { Sidebar, VideoCard, Loading } from "../../Components";
import CategoryBar from "./CategoryBar";
import { useVideo } from "../../Hooks";
import { filterByCategory } from "../../Utils/filterBycategory";

export default function VideoListing() {
    const {
        videoState: { videoList, isLoading, selectedCategory },
    } = useVideo();

    const finalVideoList = filterByCategory(videoList, selectedCategory);

    return (
        <div className="main-wrapper">
            <Sidebar />
            {isLoading ? (
                <Loading />
            ) : (
                <main className="main pt-12">
                    <CategoryBar />
                    <div className="video-list-wrapper pt-12">
                        {finalVideoList?.map((video) => {
                            return <VideoCard key={video._id} video={video} />;
                        })}
                    </div>
                </main>
            )}
        </div>
    );
}
