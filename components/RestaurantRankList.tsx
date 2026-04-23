import { Brand } from "@/constants/idx.type";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";

export default function RestaurantRankingList({ brands }: { brands: Brand[] }) {
  return (
    <View>
      {/* Need ideas card */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#e8f5f0",
          borderRadius: 16,
          padding: 16,
          gap: 14,
          // marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 36 }}>⭐</Text>
        <View style={{ flex: 1 }}>
          <AppText
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: 4,
            }}
          >
            Need ideas?
          </AppText>
          <AppText style={{ color: "#555", lineHeight: 19 }}>
            Find trending spots, hidden gems, and places your friends love.
          </AppText>
        </View>
      </View>

      {/* Section title */}
      <AppText
        variant="h2"
        style={{
          color: "#1a1a1a",
          marginBottom: 16,
        }}
      >
        Most in demand
      </AppText>

      {/* Brand rows — plain map, no scroll conflict */}
      {brands.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.07,
            shadowRadius: 8,
            elevation: 3,
            gap: 14,
          }}
          onPress={() =>
            router.push({
              pathname: "/brand/[id]",
              params: {
                id: item.id,
                name: item.name,
                brand_icon: item.brand_icon,
                hero_img: item.hero_img,
                ratings: item.ratings,
                category: JSON.stringify(item.category),
              },
            })
          }
        >
          {/* Rank number */}
          <AppText
            style={{
              color: "#1a1a1a",
              width: 28,
              textAlign: "center",
            }}
          >
            {item.ranking}
          </AppText>

          {/* Brand icon */}
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 14,
              backgroundColor: "#130b0b",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: item.brand_icon }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>

          {/* Name + rating */}
          <View style={{ flex: 1 }}>
            <AppText
              variant="span"
              style={{
                color: "#1a1a1a",
                marginBottom: 4,
              }}
            >
              {item.name}
            </AppText>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AppText style={{ fontSize: 14 }}>👍</AppText>
              <AppText
                style={{ fontSize: 14, fontWeight: "600", color: "#444" }}
              >
                {item.ratings}%
              </AppText>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
