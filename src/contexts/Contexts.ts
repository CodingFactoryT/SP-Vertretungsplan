import React from "react";
import DefaultColors from "../styles/DefaultColors";

export const ThemeContext = React.createContext({theme: "light", toggleTheme: () => {}, setTheme: (value: string) => {}, backgroundColor: DefaultColors.lightThemedBackground});   //stores the current theme (dark or light)
export const SIDContext = React.createContext(["" as string, (newSID: string) => {} ]);    //stores the sid after login. The sid authorizes the user and needs to be sent with every request to the Schulportal
export const SchoolsWithIdsContext = React.createContext([[], (newSchoolsWithIds) => {}]);