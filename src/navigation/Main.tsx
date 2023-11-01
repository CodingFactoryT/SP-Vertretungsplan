import React, { useContext, useEffect } from "react";
import SubstitutionPlanScreen from "../screens/SubstitutionPlanScreen/SubstitutionPlanScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TryAutoLoginScreen from "../screens/TryAutoLoginScreen/TryAutoLoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSchoolsWithIds } from "../hooks/api/useSchoolsWithIds";

const Stack = createNativeStackNavigator();

function Main() {
  /* const [schoolsWithIds, isLoading] = useSchoolsWithIds();

  useEffect(() => {
    if (!isLoading) {
    }
  }, [isLoading]); */

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="TryAutoLogin"
          component={TryAutoLoginScreen}
          initialParams={{ loginName: "", password: "" }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="SubstitutionPlan"
          component={SubstitutionPlanScreen}
          options={{ animation: "none" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
