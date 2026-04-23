import { Tabs } from "expo-router";
import React from "react";

import TabBackground from "@/components/ui/TabBarBackground";
import { Fonts } from "@/constants/fonts";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome6, Fontisto } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const NAV_TABS = [
    { id: "home", label: "Home", emoji: "🏠" },
    { id: "discover", label: "Discover", emoji: "🔍" },
    { id: "orders", label: "Orders", emoji: "🛍️" },
    { id: "profile", label: "Profile", emoji: "👤" },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "rgb(248, 94, 17)",
        tabBarInactiveTintColor: "#8e8e93", // 👈 subtle iOS gray
        headerShown: false,
        tabBarBackground: () => <TabBackground />,
        tabBarStyle: {
          position: "absolute",
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          // ❌ remove border
          borderTopWidth: 0,
          // ✅ shadow (iOS)
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 8,

          // ✅ shadow (Android)
          elevation: 12,
        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarIconStyle: {
          marginBottom: 2,
        },

        tabBarLabelStyle: {
          fontFamily: Fonts.medium, // 👈 apply your font
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => (
            <Fontisto name="shopping-bag-1" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
