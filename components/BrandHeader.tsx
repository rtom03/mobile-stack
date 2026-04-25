import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const BrandHeader = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        elevation: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        //   paddingTop: insets.top, // ✅ safe area aware
        paddingHorizontal: 16,
        marginTop: 15,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          // left: 16,
          backgroundColor: "#fff",
          borderRadius: 20,
          width: 36,
          height: 36,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Ionicons name="chevron-back" size={22} color="#1a1a1a" />
      </TouchableOpacity>

      {/* Top-right: search, heart, more */}
      <View
        style={{
          position: "absolute",
          right: 16,
          flexDirection: "row",
          gap: 8,
        }}
      >
        {(["search", "heart-outline", "ellipsis-vertical"] as const).map(
          (icon) => (
            <TouchableOpacity
              key={icon}
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                width: 36,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Ionicons name={icon} size={18} color="#1a1a1a" />
            </TouchableOpacity>
          ),
        )}
      </View>
    </View>
  );
};

export default BrandHeader;
