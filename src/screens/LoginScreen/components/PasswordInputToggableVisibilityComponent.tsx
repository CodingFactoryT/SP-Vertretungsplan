import React, { useContext, useEffect, useState } from "react";
import {
  VisibilityOffIcon,
  VisibilityOnIcon,
} from "../../../resources/assets/icons";
import DefaultColors from "../../../styles/DefaultColors";
import { ThemeContext } from "../../../contexts/Contexts";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";

export default function PasswordInputToggableVisibilityComponent({
  passwordBorderColor,
  setPasswordText,
  passwordText,
  isEnabled,
}) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const { theme } = useContext(ThemeContext);
  const fontColor =
    theme === "light"
      ? DefaultColors.darkThemedBackground
      : DefaultColors.lightThemedBackground;

  const [visibilityIcon, setVisibilityIcon] = useState(
    <VisibilityOffIcon width={"100%"} color={fontColor} />
  );

  const togglePasswordVisibility = () => {
    setPasswordVisible((previousState) => !previousState);
  };

  useEffect(() => {
    setVisibilityIcon(
      isPasswordVisible ? (
        <VisibilityOffIcon width={"100%"} color={fontColor} />
      ) : (
        <VisibilityOnIcon width={"100%"} color={fontColor} />
      )
    );
  }, [isPasswordVisible, fontColor]);

  return (
    <View style={[styles.textInput, { borderColor: passwordBorderColor }]}>
      <TextInput
        placeholder="Passwort"
        placeholderTextColor={fontColor}
        onChangeText={setPasswordText}
        value={passwordText}
        secureTextEntry={!isPasswordVisible}
        editable={isEnabled}
        autoCapitalize="none"
        style={{
          width: "90%",
          color: fontColor,
        }}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.iconStyle}
      >
        {visibilityIcon}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 3,
    width: "80%",
    padding: 10,
    margin: "1%",
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    alignItems: "flex-end",
    width: "10%",
  },
});
