import React, { useEffect, useState } from "react";
import { ThemeContext } from "./Contexts";
import DefaultColors from "../styles/DefaultColors";

type Theme = "light" | "dark";

export function ThemeProvider({ children }) {
  const [theme, setStateTheme] = useState<Theme>("light");
  const [backgroundColor, setBackgroundColor] = useState(
    DefaultColors.lightThemedBackground
  );
  const [fontColor, setFontColor] = useState(DefaultColors.lightThemedFont);

  useEffect(() => {
    setBackgroundColor(
      theme === "light"
        ? DefaultColors.lightThemedBackground
        : DefaultColors.darkThemedBackground
    );
    setFontColor(
      theme === "light"
        ? DefaultColors.lightThemedFont
        : DefaultColors.darkThemedFont
    );
  }, [theme]);

  function setTheme(newTheme: theme) {
    setStateTheme(newTheme);
  }

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        backgroundColor,
        fontColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
