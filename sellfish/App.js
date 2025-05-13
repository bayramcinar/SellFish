import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TutorialFirst from "./Screens/TutorialScreens/FirstPage";
import TutorialSecond from "./Screens/TutorialScreens/SecondPage";
import TutorialThird from "./Screens/TutorialScreens/ThirdPage";
import RegisterPage from "./Screens/Login/RegisterPage";
import LoginPage from "./Screens/Login/LoginPage";
import "./global.css";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TutorialFirst"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TutorialFirst" component={TutorialFirst} />
        <Stack.Screen name="TutorialSecond" component={TutorialSecond} />
        <Stack.Screen name="TutorialThird" component={TutorialThird} />
        <Stack.Screen name="login" component={LoginPage} />
        <Stack.Screen name="register" component={RegisterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
