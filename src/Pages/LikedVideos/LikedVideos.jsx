import { Loading, Sidebar, VideoCard } from "../../Components";
import { useLikes } from "../../Hooks";

export default function LikedVideos() {
    const {
        likesListState: { likedList, isLoading },
    } = useLikes();

    return (
        <div className="main-wrapper">
            <Sidebar />
            {isLoading ? (
                <Loading />
            ) : likedList?.length ? (
                <main className="main pt-12">
                    <div className="flex-row-spc-btw">
                        <div>Liked Videos</div>
                    </div>
                    <div className="video-list-wrapper pt-12">
                        {likedList?.map((video) => {
                            return <VideoCard key={video._id} video={video} />;
                        })}
                    </div>
                </main>
            ) : (
                <div className="flex-clmn-center-center">
                    <h4>No videos added yet.</h4>
                </div>
            )}
        </div>
    );
}
