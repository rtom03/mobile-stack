import { ORANGE, PR_MENU_ITEMS } from "@/constants";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Back arrow */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}
        >
          <Text style={{ fontSize: 20, color: "#1a1a1a" }}>←</Text>
        </TouchableOpacity>

        <View style={{ height: 1, backgroundColor: "#f0f0f0" }} />

        {/* Profile Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingTop: 20,
            marginBottom: 24,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "800", color: "#1a1a1a" }}>
            Profile
          </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, color: ORANGE, fontWeight: "600" }}>
              sign out
            </Text>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 28,
          }}
        >
          {/* Avatar */}
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: "#d1ccc0",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}
          >
            <Text style={{ fontSize: 36 }}>👤</Text>
          </View>

          {/* Details */}
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "700",
                color: "#1a1a1a",
                marginBottom: 3,
              }}
            >
              Tomiwa
            </Text>
            <Text style={{ fontSize: 13, color: "#555", marginBottom: 2 }}>
              zuckm709@gmail.com
            </Text>
            <Text style={{ fontSize: 13, color: "#555", marginBottom: 6 }}>
              +2349016672162
            </Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 13, color: ORANGE, fontWeight: "600" }}>
                edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Section Label */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "800",
            color: "#1a1a1a",
            paddingHorizontal: 20,
            marginBottom: 4,
          }}
        >
          Menu
        </Text>

        {/* Menu Items */}
        <View style={{ borderTopWidth: 1, borderTopColor: "#f0f0f0" }}>
          {PR_MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#f0f0f0",
              }}
            >
              <Text style={{ fontSize: 20, width: 36 }}>{item.icon}</Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: item.danger ? "#e53935" : "#1a1a1a",
                  fontWeight: item.danger ? "600" : "400",
                }}
              >
                {item.label}
              </Text>

              {/* Badge or value */}
              {item.badge !== null &&
                (item.badge > 0 ? (
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor: ORANGE,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 12, fontWeight: "700", color: "#fff" }}
                    >
                      {item.badge}
                    </Text>
                  </View>
                ) : (
                  <Text style={{ fontSize: 14, color: "#aaa" }}>0</Text>
                ))}
            </TouchableOpacity>
          ))}
        </View>

        {/* QR Code */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;
