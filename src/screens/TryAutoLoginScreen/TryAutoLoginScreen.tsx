import React, { useEffect, useContext } from "react";
import LoadingComponent from "../../components/LoadingComponent";
import { useLogin } from "../../hooks/api/useLogin";
import { SIDContext } from "../../contexts/Contexts";
import useAsyncStorage from "../../hooks/useAsyncStorage";

export default function TryAutoLoginScreen({ route, navigation }) {
  const loginData = route.params;
  const [login] = useLogin();
  const [sid] = useContext(SIDContext);

  const { getData: getLoginName, storeData: storeLoginName } =
    useAsyncStorage("LoginName");
  const { getData: getLoginPassword, storeData: storeLoginPassword } =
    useAsyncStorage("LoginPassword");

  function handleLogin(name, password) {
    if (sid === "" || sid === "DEMO") {
      login(6013, name, password).then(([error, sid]) => {
        if (sid === "") {
          navigation.replace("Login", { error: error });
        } else if (sid === "DEMO") {
          navigation.replace("Login", { error: "" });
          navigation.navigate("SubstitutionPlan");
        } else {
          navigation.replace("SubstitutionPlan");
        }
      });
    } else {
      navigation.replace("SubstitutionPlan");
    }
  }

  useEffect(() => {
    if (loginData.loginName === "" && loginData.password === "") {
      //if its the initial call

      Promise.all([getLoginName(), getLoginPassword()]).then(
        ([loginName, loginPassword]) => {
          handleLogin(loginName, loginPassword);
        }
      );
    } else {
      handleLogin(loginData.loginName, loginData.password);
    }
  }, []);

  return <LoadingComponent />;
}
