import React from "react";

export const ThemeContext = React.createContext({theme: "light", toggleTheme: () => {}});   //stores the current theme (dark or light)

export const SIDContext = React.createContext(["", (newSID) => {}]);    //stores the sid after login. The sid authorizes the user and needs to be sent with every request to the Schulportal