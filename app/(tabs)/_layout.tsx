import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text, TouchableOpacity } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";

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
        // tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        tabBarActiveTintColor: "rgb(248, 94, 17)",
        // tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={1} />
        ),
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {
            padding: 18,
            height: 100,
            borderTopWidth: 1,
            alignItems: "center",
            justifyContent: "center",
          },
        }),
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
        tabBarLabelStyle: {
          textAlign: "center",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
        }}
      />

      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🔍</Text>,
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🛍️</Text>,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}
