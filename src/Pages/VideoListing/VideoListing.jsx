import "./VideoListing.css";
import { Sidebar, VideoCard, Loading } from "../../Components";
import CategoryBar from "./CategoryBar";
import { useVideo } from "../../Hooks";
import { finalFilterFunction } from "../../Utils";

export default function VideoListing() {
    const {
        videoState: { videoList, isLoading },
    } = useVideo();

    const finalVideoList = finalFilterFunction(videoList);

    return (
        <div className="main-wrapper">
            <Sidebar />
            {isLoading ? (
                <Loading />
            ) : (
                <main className="main pt-12">
                    <CategoryBar />
                    {finalVideoList?.length ? (
                        <div className="video-list-wrapper pt-12">
                            {finalVideoList?.map((video) => {
                                return <VideoCard key={video._id} video={video} />;
                            })}
                        </div>
                    ) : (
                        <div className="flex-clmn-center-center ma-16 txt-center">
                            <h4>No videos matched the search keyword.</h4>
                        </div>
                    )}
                </main>
            )}
        </div>
    );
}
