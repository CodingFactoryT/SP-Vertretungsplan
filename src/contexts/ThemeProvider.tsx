import React, { useState } from "react";
import { ThemeContext } from "./Contexts";
import DefaultColors from "../styles/DefaultColors";

export function ThemeProvider({ children }) {
  const [theme, setStateTheme] = useState("light");
  const [backgroundColor, setBackgroundColor] = useState(
    DefaultColors.lightThemedBackground
  );

  function toggleTheme() {
    setStateTheme((previousState) =>
      previousState === "light" ? "dark" : "light"
    );
    setBackgroundColor(
      theme === "light"
        ? DefaultColors.darkThemedBackground
        : DefaultColors.lightThemedBackground
    );
    console.log(backgroundColor);
  }

  function setTheme(value: string) {
    if (value !== "light" && value !== "dark") {
      console.error("Theme not supported!: " + value);
      return;
    }

    setStateTheme(value);

    const newBackgroundColor =
      value === "light"
        ? DefaultColors.lightThemedBackground
        : DefaultColors.darkThemedBackground;
    setBackgroundColor(newBackgroundColor);
  }

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme, backgroundColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
