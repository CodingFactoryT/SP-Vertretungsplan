import React, { useState } from "react";
import { ThemeContext } from "./Contexts";

export function ThemeProvider({ children }) {
  const [theme, setStateTheme] = useState("light");

  function toggleTheme() {
    setStateTheme((previousState) =>
      previousState === "light" ? "dark" : "light"
    );
  }

  function setTheme(value: string) {
    if (value !== "light" && value !== "dark") {
      console.error("Theme not supported!: " + value);
      return;
    }

    setStateTheme(value);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
