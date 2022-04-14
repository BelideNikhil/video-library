import { useContext } from "react";
import { ThemeContext } from "../Context";
export function useTheme() {
    const { themeToggle, setThemeToggle } = useContext(ThemeContext);

    function toggleThemeFunction() {
        setThemeToggle((prev) => !prev);
        localStorage.setItem("offroad_theme", JSON.stringify(themeToggle ? false : true));
    }
    return { themeToggle, setThemeToggle, toggleThemeFunction };
}
