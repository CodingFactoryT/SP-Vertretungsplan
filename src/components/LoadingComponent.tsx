import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import ThemedScreen from "../screens/ThemedScreen/ThemedScreen";
import { ThemeContext } from "../contexts/Contexts";
import DefaultColors from "../styles/DefaultColors";

export default function LoadingComponent() {
  const { theme, toggleTheme, setTheme, backgroundColor } =
    useContext(ThemeContext);

  return (
    <ThemedScreen>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: backgroundColor,
        }}
      >
        <ActivityIndicator size={50} />
      </View>
    </ThemedScreen>
  );
}
