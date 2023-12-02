import React, { useEffect, useContext } from "react";
import LoadingComponent from "../../components/LoadingComponent";
import { login } from "../../services/api/login";
import { SIDContext } from "../../contexts/Contexts";
import StorageProvider from "../../DataProvider/StorageProvider";

export default function TryAutoLoginScreen({ route, navigation }: any) {
  const loginData = route.params;
  const { sid, setSid } = useContext(SIDContext);

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

  const { getStoredLoginData } = StorageProvider();
  useEffect(() => {
    if (loginData.username === "" && loginData.password === "") {
      //if its the initial call

      getStoredLoginData().then((storedLoginData) => {
        //[schoolID, username, password]
        handleLogin(storedLoginData[0], storedLoginData[1], storedLoginData[2]);
      });
    } else {
      handleLogin(loginData.schoolID, loginData.username, loginData.password);
    }
  }, []);

  return <LoadingComponent />;
}
