import { useState, createContext } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [themeToggle, setThemeToggle] = useState(JSON.parse(localStorage.getItem("offroad_theme")) || true);

    return <ThemeContext.Provider value={{ themeToggle, setThemeToggle }}>{children}</ThemeContext.Provider>;
}
