import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import NavSearch from "./NavSearch";
import { useTheme, useAuth } from "../../Hooks";

export default function Navbar() {
    const { themeToggle, toggleThemeFunction } = useTheme();
    const {
        authState: { token },
        userLogoutHandler,
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
                            className={`theme-toggle-btn pointer ${themeToggle ? "rotate" : ""}`}
                            onClick={toggleThemeFunction}
                        >
                            <span className="material-icons-outlined primary-accent">
                                {themeToggle ? "light_mode" : "dark_mode"}
                            </span>
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={token ? userLogoutHandler : () => navigate("/login")}
                        >
                            {token ? "Logout" : "Login"}
                        </button>
                    </div>
                </nav>
            </header>
            <div className="nav-search-mobile">
                <NavSearch />
            </div>
        </div>
    );
}
