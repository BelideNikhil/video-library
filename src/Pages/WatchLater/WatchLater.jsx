import { Loading, Sidebar, VideoCard } from "../../Components";
import { useWatchLater } from "../../Hooks";

export default function WatchLater() {
    const {
        watchLaterState: { watchLaterList, isLoading },
    } = useWatchLater();

    return (
        <div className="main-wrapper">
            <Sidebar />
            {isLoading ? (
                <Loading />
            ) : watchLaterList?.length ? (
                <main className="main pt-12">
                    <div className="flex-row-spc-btw">
                        <div>Watch Later</div>
                    </div>
                    <div className="video-list-wrapper pt-12">
                        {watchLaterList?.map((video) => {
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
