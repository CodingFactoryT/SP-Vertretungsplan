import React, { useEffect, useContext } from "react";
import LoadingComponent from "../../components/LoadingComponent";
import { login } from "../../services/api/login";
import { SIDContext } from "../../contexts/Contexts";
import useAsyncStorage from "../../hooks/useAsyncStorage";

export default function TryAutoLoginScreen({ route, navigation }: any) {
  const loginData = route.params;
  const { sid, setSid } = useContext(SIDContext);

  const { getData: getSchoolID, storeData: storeSchoolID } =
    useAsyncStorage("SchoolID");
  const { getData: getUsername, storeData: storeUsername } =
    useAsyncStorage("Username");
  const { getData: getPassword, storeData: storePassword } =
    useAsyncStorage("Password");

  type LoginProp = string | null | undefined;

  function handleLogin(
    schoolID: LoginProp,
    username: LoginProp,
    password: LoginProp
  ) {
    if (sid === "" || sid === "DEMO") {
      login(schoolID, username, password).then(
        ([schoolIDError, usernameError, passwordError, sid]) => {
          setSid(sid);
          if (sid === "") {
            navigation.replace("Login", {
              schoolIDError: schoolIDError,
              usernameError: usernameError,
              passwordError: passwordError,
            });
          } else if (sid === "DEMO") {
            navigation.replace("Login", {
              schoolIDError: -1,
              usernameError: -1,
              passwordError: -1,
            });
            navigation.navigate("SubstitutionPlan");
          } else {
            navigation.replace("SubstitutionPlan");
          }
        }
      );
    } else {
      navigation.replace("SubstitutionPlan");
    }
  }

  useEffect(() => {
    if (loginData.username === "" && loginData.password === "") {
      //if its the initial call

      Promise.all([getSchoolID(), getUsername(), getPassword()]).then(
        ([schoolID, username, password]) => {
          handleLogin(schoolID, username, password);
        }
      );
    } else {
      handleLogin(loginData.schoolID, loginData.username, loginData.password);
    }
  }, []);

  return <LoadingComponent />;
}
