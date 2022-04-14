import "./Styles/App.css";
import { Navbar, ToastWrapper } from "./Components";
import { useTheme } from "./Hooks";
import PageRoutes from "./Routes/PageRoutes";

export default function App() {
    const { themeToggle } = useTheme();

    return (
        <div className={`App ${themeToggle ? "dark" : ""}`}>
            <ToastWrapper />
            <Navbar />
            <PageRoutes />
        </div>
    );
}
