import React, { useContext, useEffect, useState } from "react";
import { View, Switch, StyleSheet } from "react-native";
import { ThemeContext } from "../contexts/Contexts";
import { DarkModeIcon, LightModeIcon } from "../resources/assets/icons";
import DefaultColors from "../styles/DefaultColors";
import useAsyncStorage from "../hooks/useAsyncStorage";
import StorageProvider from "../DataProvider/StorageProvider";

export default function ThemeChangerComponent(props: any) {
  const { storeTheme, getStoredTheme } = StorageProvider();
  const { theme, toggleTheme, setTheme } = useContext(ThemeContext);
  useEffect(() => {
    getStoredTheme().then((storedTheme) => {
      if (storedTheme === "dark") {
        setTheme("dark");
        setSwitchState(true);
      }
    });
  }, []);
  const [switchState, setSwitchState] = useState(
    theme === "light" ? false : true
  );

  function toggleThemeSwitch() {
    if (theme === "light") {
      storeTheme("dark");
    } else {
      storeTheme("light");
    }
    setSwitchState((previousState) => !previousState);
    toggleTheme();
  }

  const iconColor =
    theme === "light"
      ? DefaultColors.darkThemedBackground
      : DefaultColors.lightThemedBackground;

  return (
    <View style={props.style}>
      <View
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <LightModeIcon width={"30%"} color={iconColor} />
        <Switch onValueChange={toggleThemeSwitch} value={switchState}></Switch>
        <DarkModeIcon width={"30%"} color={iconColor} />
      </View>
    </View>
  );
}
