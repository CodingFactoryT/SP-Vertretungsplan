import React, { useContext } from "react";
import ThemeChangerComponent from "../../components/ThemeChangerComponent";
import { View, StyleSheet, StatusBar } from "react-native";
import DefaultColors from "../../styles/DefaultColors";
import { ThemeContext } from "../../contexts/Contexts";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThemedScreen({ children }) {
  const { theme, toggleTheme, setTheme, backgroundColor } =
    useContext(ThemeContext);

  const statusBarStyle = theme === "light" ? "dark-content" : "light-content";
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}
    >
      <View style={styles.themeChangerComponentStyle}>
        <ThemeChangerComponent
          style={{
            width: "30%",
            margin: "3%",
          }}
        />
      </View>
      <StatusBar
        animated={false}
        backgroundColor={backgroundColor}
        barStyle={statusBarStyle}
        hidden={false}
      />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  themeChangerComponentStyle: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    position: "absolute",
    width: "100%",
  },
});
