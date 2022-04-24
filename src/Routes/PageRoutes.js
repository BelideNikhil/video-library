import { Navigate, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { ResetScrollbar } from "../Components";
import {
    VideoListing,
    Login,
    Signup,
    Playlist,
    SingleVideo,
    SinglePlaylist,
    History,
    WatchLater,
    LikedVideos,
} from "../Pages";
import { useAuth } from "../Hooks";

export default function PageRoutes() {
    const {
        authState: { token },
    } = useAuth();

    return (
        <div className="route-wrapper">
            <ResetScrollbar>
                <Routes>
                    <Route path="/" element={<VideoListing />} />
                    <Route path="/explore" element={<VideoListing />} />
                    <Route path="/explore/:videoId" element={<SingleVideo />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/playlist" element={<Playlist />} />
                        <Route path="/playlist/:playlistId" element={<SinglePlaylist />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/watch-later" element={<WatchLater />} />
                        <Route path="/liked-videos" element={<LikedVideos />} />
                    </Route>

                    {!token ? (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<Navigate to="/explore" replace />} />
                            <Route path="/signup" element={<Navigate to="/explore" replace />} />
                        </>
                    )}
                    <Route path="/*" element={<Navigate to="/explore" />} />
                </Routes>
            </ResetScrollbar>
        </div>
    );
}
