import "./Sidebar.css";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
    return (
        <aside className="sidebar-wrapper">
            <div className="sidebar">
                <NavLink
                    to="/"
                    className={`sidebar-btn home-btn ${({ isActive }) =>
                        isActive ? "active" : ""} flex-row-start-center px-1 py-12 mb-6`}
                >
                    <span className="material-icons-outlined mx-16">home</span>Home
                </NavLink>
                <NavLink
                    to="/explore"
                    className={`sidebar-btn ${({ isActive }) =>
                        isActive ? "active" : ""} flex-row-start-center px-16 py-12 mb-6`}
                >
                    <span className="material-icons-outlined mx-16">explore</span>Explore
                </NavLink>
                <NavLink
                    to="/watch-later"
                    className={`sidebar-btn ${({ isActive }) =>
                        isActive ? "active" : ""} flex-row-start-center px-16 py-12 mb-6`}
                >
                    <span className="material-icons-outlined mx-16">watch_later</span>Watch Later
                </NavLink>
                <NavLink
                    to="/liked-videos"
                    className={`sidebar-btn ${({ isActive }) =>
                        isActive ? "active" : ""} flex-row-start-center px-16 py-12 mb-6`}
                >
                    <span className="material-icons-outlined mx-16">thumb_up</span>Liked Videos
                </NavLink>
                <NavLink
                    to="/playlist"
                    className={`sidebar-btn ${({ isActive }) =>
                        isActive ? "active" : ""} flex-row-start-center px-16 py-12 mb-6`}
                >
                    <span className="material-icons-outlined mx-16">playlist_play</span>Playlists
                </NavLink>
                <NavLink
                    to="/history"
                    className={`sidebar-btn ${({ isActive }) =>
                        isActive ? "active" : ""} flex-row-start-center px-16 py-12 mb-6`}
                >
                    <span className="material-icons-outlined mx-16">history</span>History
                </NavLink>
            </div>
        </aside>
    );
}
