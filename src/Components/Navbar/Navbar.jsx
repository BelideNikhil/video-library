import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import NavSearch from "./NavSearch";
import { useTheme, useAuth } from "../../Hooks";

export default function Navbar() {
    const { themeToggle, toggleThemeFunction } = useTheme();
    const {
        authState: {
            token,
            userDetails: { firstName, lastName },
        },
    } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="header-wrapper pa-8 ">
            <header className="header pa-8 flex-row-spc-btw">
                <button className="btn-icon nav-toggle-btn mr-16">
                    <i className="fas fa-bars"></i>
                </button>
                <Link to="/explore">
                    <button className="header-logo">
                        Off Road <span className="primary-accent">T</span>
                        <span className="secondary-accent">V</span>
                    </button>
                </Link>
                <div className="nav-search-web">
                    <NavSearch />
                </div>
                <nav className="header-nav-links">
                    <div className="flex-row-spc-evenly">
                        <button
                            className={`theme-toggle-btn pointer mr-6 ${themeToggle ? "rotate" : ""}`}
                            onClick={toggleThemeFunction}
                        >
                            <span className="material-icons-outlined primary-accent">
                                {themeToggle ? "light_mode" : "dark_mode"}
                            </span>
                        </button>
                        {token ? (
                            <div
                                className="avatar avatar-text avatar-round pointer mr-6"
                                role="button"
                                onClick={() => navigate("/profile")}
                            >
                                {firstName.charAt(0) + lastName.charAt(0)}
                            </div>
                        ) : (
                            <button className="btn btn-primary" onClick={() => navigate("/login")}>
                                Login
                            </button>
                        )}
                    </div>
                </nav>
            </header>
            <div className="nav-search-mobile">
                <NavSearch />
            </div>
        </div>
    );
}
