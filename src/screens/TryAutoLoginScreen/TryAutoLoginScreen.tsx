import React, { useEffect, useContext } from "react";
import LoadingComponent from "../../components/LoadingComponent";
import { useLogin } from "../../hooks/api/useLogin";
import { SIDContext } from "../../contexts/Contexts";
import useAsyncStorage from "../../hooks/useAsyncStorage";

export default function TryAutoLoginScreen({ route, navigation }) {
  const loginData = route.params;
  const [login] = useLogin();
  const [sid] = useContext(SIDContext);

  const { getData: getSchoolID, storeData: storeSchoolID } =
    useAsyncStorage("SchoolID");
  const { getData: getUsername, storeData: storeUsername } =
    useAsyncStorage("Username");
  const { getData: getLoginPassword, storeData: storeLoginPassword } =
    useAsyncStorage("LoginPassword");

  function handleLogin(schoolID, name, password) {
    if (sid === "" || sid === "DEMO") {
      login(schoolID, name, password).then(
        ([schoolIDError, usernameError, passwordError, sid]) => {
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

      Promise.all([getSchoolID(), getUsername(), getLoginPassword()]).then(
        ([schoolID, username, loginPassword]) => {
          handleLogin(schoolID, username, loginPassword);
        }
      );
    } else {
      handleLogin(loginData.schoolID, loginData.username, loginData.password);
    }
  }, []);

  return <LoadingComponent />;
}
