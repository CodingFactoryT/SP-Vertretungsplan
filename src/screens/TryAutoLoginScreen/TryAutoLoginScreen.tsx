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
  const { getData: getLoginName, storeData: storeLoginName } =
    useAsyncStorage("LoginName");
  const { getData: getLoginPassword, storeData: storeLoginPassword } =
    useAsyncStorage("LoginPassword");

  function handleLogin(schoolID, name, password) {
    if (sid === "" || sid === "DEMO") {
      login(schoolID, name, password).then(
        ([schoolIDError, loginNameError, passwordError, sid]) => {
          if (sid === "") {
            navigation.replace("Login", {
              schoolIDError: schoolIDError,
              loginNameError: loginNameError,
              passwordError: passwordError,
            });
          } else if (sid === "DEMO") {
            navigation.replace("Login", {
              schoolIDError: -1,
              loginNameError: -1,
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
    if (loginData.loginName === "" && loginData.password === "") {
      //if its the initial call

      Promise.all([getSchoolID(), getLoginName(), getLoginPassword()]).then(
        ([schoolID, loginName, loginPassword]) => {
          handleLogin(schoolID, loginName, loginPassword);
        }
      );
    } else {
      handleLogin(loginData.schoolID, loginData.loginName, loginData.password);
    }
  }, []);

  return <LoadingComponent />;
}
