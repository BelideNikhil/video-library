import "./VideoListing.css";
import { Sidebar, VideoCard, Loading } from "../../Components";
import CategoryBar from "./CategoryBar";
import { useVideo } from "../../Hooks";
import { finalFilterFunction } from "../../Utils";
import { useRef, useEffect, useState } from "react";
import { videoActionTypes } from "../../Reducers/ActionTypes";

const { SET_PAGE_NUMBER } = videoActionTypes;

export default function VideoListing() {
    const [lastVideo, setLastVideo] = useState(null);
    const {
        videoState: { videoList, isLoading, pageNum, totalPages },
        videoDispatchFunction,
    } = useVideo();

    const observer = useRef(
        new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoDispatchFunction({ type: SET_PAGE_NUMBER });
                }
            },
            { threshold: 1 }
        )
    );

    useEffect(() => {
        //setting the latest last video to be observed
        const currentObserver = observer.current;
        if (lastVideo) {
            currentObserver.observe(lastVideo);
        }

        return () => {
            if (lastVideo) {
                //unsetting the previous last video
                currentObserver.disconnect();
            }
        };
    }, [lastVideo]);

    const finalVideoList = finalFilterFunction(videoList);
    return (
        <div className="main-wrapper">
            <Sidebar />
            <main className="main pt-12">
                <CategoryBar />
                {finalVideoList?.length ? (
                    <>
                        <div className="video-list-wrapper pt-12">
                            {finalVideoList?.map((video, index) => {
                                return index === finalVideoList.length - 1 && !isLoading && pageNum < totalPages ? (
                                    <div ref={setLastVideo} key={video._id}>
                                        <VideoCard video={video} />
                                    </div>
                                ) : (
                                    <VideoCard key={video._id} video={video} />
                                );
                            })}
                        </div>
                        {isLoading ? <Loading /> : null}
                        <div className="spacer-four"></div>
                    </>
                ) : (
                    <div className="flex-clmn-center-center ma-16 txt-center">
                        <h4>No videos found.</h4>
                    </div>
                )}
            </main>
        </div>
    );
}
