// components/TopBar.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import logo from "../assets/icon.png";

export default function TopBar({
  logoSource = logo, // sol ikon
  cartCount = 0,
  onLogoPress = () => {},
  onCartPress = () => {},
}) {
  return (
    <View className="flex-row items-center justify-between px-4 py-2 bg-white shadow-sm">
      {/* Sol Logo */}
      <TouchableOpacity onPress={onLogoPress} className="flex-row items-center">
        <Image source={logoSource} className="w-16 h-16" resizeMode="contain" />
      </TouchableOpacity>

      {/* Orta Başlık */}
      <Text className="text-xl font-semibold text-gray-900">SellFish</Text>

      {/* Sağ Sepet */}
      <TouchableOpacity onPress={onCartPress} className="relative">
        <Ionicons name="cart-outline" size={28} color="#007AFF" />
        {cartCount > 0 && (
          <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
            <Text className="text-xs text-white font-bold">{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
