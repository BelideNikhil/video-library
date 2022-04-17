import { Navigate, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { VideoListing, Login, Signup, Playlist } from "../Pages";
import { useAuth } from "../Hooks";

export default function PageRoutes() {
    const {
        authState: { token },
    } = useAuth();

    return (
        <div className="route-wrapper">
            <Routes>
                <Route path="/" element={<VideoListing />} />
                <Route path="/explore" element={<VideoListing />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/playlist" element={<Playlist />} />
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
        </div>
    );
}