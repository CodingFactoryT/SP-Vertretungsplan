import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DefaultColors from "../../styles/DefaultColors";
import ThemedScreen from "../ThemedScreen/ThemedScreen";
import { ThemeContext } from "../../contexts/Contexts";
import PasswordInputToggableVisibilityComponent from "./components/PasswordInputToggableVisibilityComponent";
import useAsyncStorage from "../../hooks/useAsyncStorage";
import { Dropdown } from "react-native-element-dropdown";
import { useSchoolsWithIds } from "../../hooks/api/useSchoolsWithIds";

export default function LoginScreen({ route, navigation }) {
  const { error } = route.params;
  const [loginNameText, setLoginNameText] = useState("");
  const [loginNameBorderColor, setLoginNameBorderColor] = useState(
    DefaultColors.lightBlue
  );
  const [passwordText, setPasswordText] = useState("");
  const [passwordBorderColor, setPasswordBorderColor] = useState(
    DefaultColors.lightBlue
  );
  const [areTextInputsEnabled, setTextInputsEnabled] = useState(true);
  const { theme, toggleTheme, setTheme, backgroundColor } =
    useContext(ThemeContext);
  const fontColor =
    theme === "light"
      ? DefaultColors.darkThemedBackground
      : DefaultColors.lightThemedBackground;

  const { getData: getLoginName, storeData: storeLoginName } =
    useAsyncStorage("LoginName");
  const { getData: getLoginPassword, storeData: storeLoginPassword } =
    useAsyncStorage("LoginPassword");

  function onLoginButtonPress() {
    setTextInputsEnabled(false);
    if (loginNameText !== "DEMO" && passwordText !== "DEMO") {
      storeLoginName(loginNameText);
      storeLoginPassword(passwordText);
    }

    navigation.replace("TryAutoLogin", {
      loginName: loginNameText,
      password: passwordText,
    });
  }

  useEffect(() => {
    if (error !== "") {
      switch (
        error //provide user feedback for the TextInputs
      ) {
        case "Missing Username!":
          setLoginNameBorderColor(DefaultColors.errorRed);
          setPasswordBorderColor(DefaultColors.lightBlue);
          break;
        case "Missing Password!":
          setLoginNameBorderColor(DefaultColors.lightBlue);
          setPasswordBorderColor(DefaultColors.errorRed);
          break;
        case "Missing Username and Password!":
        case "Invalid SchoolID, Username or Password!":
          setLoginNameBorderColor(DefaultColors.errorRed);
          setPasswordBorderColor(DefaultColors.errorRed);
          break;
        default:
          console.error("Login Error unknown: " + error);
          break;
      }
      setTextInputsEnabled(true);
    }
  }, [error]);

  const [data, setData] = useState();
  const { schoolsWithIds, isLoading } = useSchoolsWithIds();
  const [selectedSchoolIndex, setSelectedSchoolIndex] = useState();

  useEffect(() => {
    const newData = schoolsWithIds.map((item, index) => {
      const label = item.schoolName + "(" + item.schoolDistrict + ")";
      return {
        schoolDistrict: item.schoolDistrict,
        schoolName: item.schoolName,
        label: label,
        schoolId: item.schoolID,
        index: index,
      };
    });

    setData(newData);
  }, [schoolsWithIds]);

  useEffect(() => {
    if (data) {
      console.log(data[selectedSchoolIndex]);
    }
  }, [selectedSchoolIndex]);

  return (
    <ThemedScreen>
      <KeyboardAvoidingView
        style={styles.loginView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={[styles.loginText, { color: fontColor }]}>Login</Text>
        <Dropdown
          style={styles.textInput}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          placeholder={"Schule auswählen"}
          searchPlaceholder="Suchen..."
          value={selectedSchoolIndex}
          onChange={(item) => {
            setSelectedSchoolIndex(item.index);
          }}
        />
        <TextInput
          placeholder="Nutzername"
          placeholderTextColor={fontColor}
          style={[
            styles.textInput,
            { color: fontColor, borderColor: loginNameBorderColor },
          ]}
          onChangeText={(text) => setLoginNameText(text.trim())}
          value={loginNameText}
          editable={areTextInputsEnabled}
          autoCapitalize="none"
        />
        <PasswordInputToggableVisibilityComponent
          passwordBorderColor={passwordBorderColor}
          setPasswordText={setPasswordText}
          passwordText={passwordText}
          isEnabled={areTextInputsEnabled}
        />
        <TouchableOpacity
          onPress={onLoginButtonPress}
          style={styles.loginButton}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text
            numberOfLines={2}
            style={{ textAlign: "center", color: "blue" }}
            onPress={() => {
              setTextInputsEnabled(false);
              navigation.replace("TryAutoLogin", {
                loginName: "DEMO",
                password: "DEMO",
              });
            }}
          >
            Du hast keinen Account?{"\n"}Dann schaue dir hier die Demo an!
          </Text>
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          backgroundColor: DefaultColors.warningRed,
          padding: 10,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ textAlign: "center" }}>
          Diese inoffizielle App repräsentiert keine Regierungsbehörde!{"\n"}
          Sie greift lediglich auf die Daten des{" "}
          <Text
            onPress={() =>
              Linking.openURL("https://start.schulportal.hessen.de")
            }
            style={{ color: "blue" }}
          >
            Schulportal Hessens
          </Text>{" "}
          zu.
        </Text>
      </View>
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
  basicText: {
    fontSize: 20,
    marginBottom: "15%",
  },
  loginButton: {
    backgroundColor: DefaultColors.lightBlue,
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    height: "5%",
    marginTop: 10,
    marginBottom: 20,
  },
  loginView: {
    flex: 1,
    alignItems: "center",
    marginTop: 60,
  },
  loginText: {
    fontSize: 60,
    marginTop: "10%",
    fontFamily: "",
    marginBottom: "20%",
  },
  textInput: {
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 3,
    width: "80%",
    margin: 2,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
