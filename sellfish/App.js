import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { onAuthStateChanged } from "firebase/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { auth } from "./firebase";
import { View, Text, TouchableOpacity, Platform } from "react-native";

import TutorialFirst from "./Screens/TutorialScreens/FirstPage";
import TutorialSecond from "./Screens/TutorialScreens/SecondPage";
import TutorialThird from "./Screens/TutorialScreens/ThirdPage";
import RegisterPage from "./Screens/Login/RegisterPage";
import LoginPage from "./Screens/Login/LoginPage";
import HomeScreen from "./Screens/Main/HomeScreen";
import MarketScreen from "./Screens/Main/MarketScreen";
import AccountScreen from "./Screens/Main/AccountScreen";
import CartScreen from "./Screens/Main/CartScreen";
import SellScreen from "./Screens/Main/SellScreen"; // Satış ekranını unutma

import "./global.css";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CustomTabBarButton({ children, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="top-[-20px] justify-center items-center"
    >
      <View className="w-[60px] h-[60px] rounded-full bg-blue-500 shadow-lg justify-center items-center">
        {children}
      </View>
    </TouchableOpacity>
  );
}

function MainTabs() {
  const cartCount = 3;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: Platform.OS === "android" ? 5 : 20,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Anasayfa") iconName = "home-outline";
          else if (route.name === "Pazar") iconName = "fish-outline";
          else if (route.name === "Sepet") iconName = "cart-outline";
          else if (route.name === "Hesabım") iconName = "person-outline";
          else if (route.name === "Satış") iconName = "add";

          if (route.name === "Sepet") {
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
                {cartCount > 0 && (
                  <View className="absolute -top-1.5 -right-2 bg-red-500 rounded-full w-4 h-4 justify-center items-center">
                    <Text className="text-white text-[10px] font-bold">
                      {cartCount}
                    </Text>
                  </View>
                )}
              </View>
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Anasayfa" component={HomeScreen} />
      <Tab.Screen name="Pazar" component={MarketScreen} />

      <Tab.Screen
        name="Satış"
        component={SellScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="add" size={30} color="white" />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarLabel: () => null, // Satış butonunun label'ını gizle
        }}
      />

      <Tab.Screen name="Sepet" component={CartScreen} />
      <Tab.Screen name="Hesabım" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <>
              <Stack.Screen name="TutorialFirst" component={TutorialFirst} />
              <Stack.Screen name="TutorialSecond" component={TutorialSecond} />
              <Stack.Screen name="TutorialThird" component={TutorialThird} />
              <Stack.Screen name="login" component={LoginPage} />
              <Stack.Screen name="register" component={RegisterPage} />
            </>
          ) : (
            <Stack.Screen name="MainTab" component={MainTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
