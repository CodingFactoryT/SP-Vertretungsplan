import React, { useEffect, useContext } from "react";
import LoadingComponent from "../../components/LoadingComponent";
import { login } from "../../services/api/login";
import { SIDContext } from "../../contexts/Contexts";
import StorageProvider from "../../DataProvider/StorageProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TryAutoLoginScreen({ route, navigation }: any) {
	const loginData = route.params;
	const { sid, setSid } = useContext(SIDContext);

	type LoginProp = string | null | undefined;

	function handleLogin(schoolID: LoginProp, username: LoginProp, password: LoginProp) {
		if (sid === "" || sid === "DEMO") {
			login(schoolID, username, password).then(([schoolIDError, usernameError, passwordError, sid]) => {
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
			});
		} else {
			navigation.replace("SubstitutionPlan");
		}
	}

	const { storeLoginData, getStoredLoginData, getStoredLoginDataDEPRECATED } = StorageProvider();
	useEffect(() => {
		if (loginData.username === "" && loginData.password === "") {
			//if its the initial call

			getStoredLoginData().then((storedLoginData) => {
				//[schoolID, username, password]
				if (!storedLoginData[0] && !storedLoginData[1] && !storedLoginData[2]) {
					//needed for migrating to SecureStore
					getStoredLoginDataDEPRECATED().then((storedLoginDataDEPRECATED) => {
						if (storedLoginDataDEPRECATED[0] || storedLoginDataDEPRECATED[1] || storedLoginDataDEPRECATED[2]) {
							storeLoginData(storedLoginDataDEPRECATED[0], storedLoginDataDEPRECATED[1], storedLoginDataDEPRECATED[2]);

							AsyncStorage.removeItem("SchoolID");
							AsyncStorage.removeItem("LoginName");
							AsyncStorage.removeItem("LoginPassword");

							handleLogin(storedLoginDataDEPRECATED[0], storedLoginDataDEPRECATED[1], storedLoginDataDEPRECATED[2]);

							return;
						}
					});
				}
				handleLogin(storedLoginData[0], storedLoginData[1], storedLoginData[2]);
			});
		} else {
			handleLogin(loginData.schoolID, loginData.username, loginData.password);
		}
	}, []);

	return <LoadingComponent />;
}
