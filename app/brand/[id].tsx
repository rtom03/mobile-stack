import { getItemsByBrand } from "@/constants/services/api";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function DetailsScreen() {
  const { id, name, hero_img, ratings } = useLocalSearchParams<{
    id: string;
    name: string;
    hero_img: string;
    brand_icon: string;
    ratings: string;
  }>();

  const brandId = parseInt(id);

  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getItemByBrand = async () => {
      try {
        console.log(brandId);

        const res = await getItemsByBrand(brandId);

        setItem(res); // ✅ res is the actual data now
      } catch (error) {
        console.error("Failed to fetch brand:", error);
      } finally {
        setLoading(false);
      }
    };

    getItemByBrand(); // ✅ call it inside, don't return the promise
  }, [brandId]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Hero Image */}
      <View style={{ width: "100%", height: 220 }}>
        <Image
          source={{ uri: hero_img }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />

        {/* Back Button overlaid on image */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 48,
            left: 16,
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
      </View>

      {/* Brand Info */}
      <View style={{ padding: 20 }}>
        {/* Name */}
        <Text
          style={{
            fontSize: 26,
            fontWeight: "800",
            color: "#1a1a1a",
            marginBottom: 8,
          }}
        >
          {name}
        </Text>

        {/* Same prices badge */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            marginBottom: 20,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 13, color: "#444" }}>
            🏠 Same prices as in store →
          </Text>
        </View>

        {/* Stats Row */}
        <View
          style={{ flexDirection: "row", gap: 32, justifyContent: "center" }}
        >
          {/* Ratings */}
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={{ fontSize: 24 }}>👍</Text>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#1a1a1a" }}>
              {ratings}%
            </Text>
          </View>

          {/* Delivery Time */}
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={{ fontSize: 24 }}>⏱️</Text>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#1a1a1a" }}>
              15-25'
            </Text>
          </View>

          {/* Delivery Fee */}
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={{ fontSize: 24 }}>🛵</Text>
            <View
              style={{
                backgroundColor: "#f5c842",
                borderRadius: 6,
                paddingHorizontal: 10,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{ fontSize: 13, fontWeight: "700", color: "#1a1a1a" }}
              >
                Free
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
