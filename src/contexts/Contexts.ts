import React from "react";
import DefaultColors from "../styles/DefaultColors";
type Theme = "light" | "dark";

export const ThemeContext = React.createContext({theme: "light" as Theme, toggleTheme: () => {}, setTheme: (value: theme) => {}, backgroundColor: DefaultColors.lightThemedBackground, fontColor: DefaultColors.lightThemedFont});   //stores the current theme (dark or light)
export const SIDContext = React.createContext({sid: "", setSid: (newSID: string) => {} });    //stores the sid after login. The sid authorizes the user and needs to be sent with every request to the Schulportal
export const SchoolsWithIdsContext = React.createContext([[], (newSchoolsWithIds) => {}]);