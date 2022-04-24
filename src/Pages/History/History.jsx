import { Loading, Sidebar, VideoCard } from "../../Components";
import { useAuth, useWatchHistory } from "../../Hooks";

export default function History() {
    const {
        historyState: { historyList, isLoading },
        clearWatchHistory,
    } = useWatchHistory();

    const {
        authState: { token },
    } = useAuth();

    return (
        <div className="main-wrapper">
            <Sidebar />
            {isLoading ? (
                <Loading />
            ) : historyList?.length ? (
                <main className="main pt-12">
                    <div className="flex-row-spc-btw">
                        <div>History</div>
                        <button className="btn btn-primary" onClick={() => clearWatchHistory({ token })}>
                            Clear History
                        </button>
                    </div>
                    <div className="video-list-wrapper pt-12">
                        {historyList?.map((video) => {
                            return <VideoCard key={video._id} video={video} />;
                        })}
                    </div>
                </main>
            ) : (
                <div className="flex-clmn-center-center">
                    <h4>No history available.</h4>
                </div>
            )}
        </div>
    );
}
