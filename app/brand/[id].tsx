import { Category } from "@/constants/idx.type";
import { getItemsByBrand } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Item {
  id: string;
  name: string;
  price: number;
  img?: string;
  category?: string;
}

export default function DetailsScreen() {
  const { id, name, hero_img, ratings, category } = useLocalSearchParams<{
    id: string;
    name: string;
    hero_img: string;
    brand_icon: string;
    ratings: string;
    category: string;
  }>();

  const parsedCategory: Category[] = category
    ? JSON.parse(category as string)
    : [];

  const brandId = parseInt(id);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const getItemByBrand = async () => {
      try {
        const res = await getItemsByBrand(brandId);
        setItems(Array.isArray(res) ? res : []);
        // console.log(parsedCategory);
      } catch (error) {
        console.error("Failed to fetch brand:", error);
      } finally {
        setLoading(false);
      }
    };
    getItemByBrand();
  }, [brandId]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen options={{ headerShown: false }} />

      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "absolute",
          top: 20,
          width: "100%",
          shadowColor: "#000",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── HERO IMAGE ──────────────────────────────────────────────── */}
        <View style={{ width: "100%", height: 200 }}>
          <Image
            source={{ uri: hero_img }}
            style={{ width: "100%", height: "80%" }}
            resizeMode="cover"
          />

          {/* Back button */}
        </View>

        {/* ── BRAND INFO ──────────────────────────────────────────────── */}
        <View
          style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "800",
              color: "#1a1a1a",
              marginBottom: 10,
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
              borderRadius: 8,
              alignSelf: "flex-start",
              marginBottom: 24,
            }}
          >
            <Ionicons
              name="home-outline"
              size={13}
              color="#444"
              style={{ marginRight: 5 }}
            />
            <Text style={{ fontSize: 13, color: "#444" }}>
              Same prices as in store ›
            </Text>
          </View>

          {/* Stats row */}
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 32 }}
          >
            {/* Ratings */}
            <View style={{ alignItems: "center", gap: 6 }}>
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: "#e8f5f0",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="thumbs-up-outline" size={24} color="#2E7D32" />
              </View>
              <Text
                style={{ fontSize: 13, fontWeight: "700", color: "#1a1a1a" }}
              >
                {ratings}%
              </Text>
            </View>

            {/* Delivery time */}
            <View style={{ alignItems: "center", gap: 6 }}>
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: "#fdf4e3",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="time-outline" size={24} color="#b8860b" />
              </View>
              <Text
                style={{ fontSize: 13, fontWeight: "700", color: "#1a1a1a" }}
              >
                15-25'
              </Text>
            </View>

            {/* Delivery fee — strikethrough + red Free */}
            <View style={{ alignItems: "center", gap: 6 }}>
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: "#fdf4e3",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="bicycle-outline" size={24} color="#b8860b" />
              </View>
              <View style={{ alignItems: "center", gap: 2 }}>
                <Text
                  style={{
                    fontSize: 11,
                    color: "#aaa",
                    textDecorationLine: "line-through",
                  }}
                >
                  ₦199.00
                </Text>
                <View
                  style={{
                    backgroundColor: "#e53935",
                    borderRadius: 4,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{ fontSize: 12, fontWeight: "700", color: "#fff" }}
                  >
                    Free
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ── CATEGORY TABS ───────────────────────────────────────────── */}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#f0f0f0",
            marginTop: 16,
          }}
        >
          <ScrollView
            // ref={tabScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12 }}
          >
            {parsedCategory.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: 2.5,
                  borderBottomColor:
                    activeTab === tab.id ? "#1a1a1a" : "transparent",
                  marginRight: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: activeTab === tab.id ? "700" : "500",
                    color: activeTab === tab.id ? "#1a1a1a" : "#999",
                  }}
                >
                  {tab.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── TOP SELLERS SECTION ─────────────────────────────────────── */}
        <View style={{ paddingTop: 20, paddingBottom: 16 }}>
          {/* Section heading + arrow */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "800", color: "#1a1a1a" }}>
              Top sellers
            </Text>
            <TouchableOpacity
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#1a1a1a",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Horizontal product cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
          >
            {items.map((item) => (
              <View
                key={item.id}
                style={{
                  width: 150,
                  borderRadius: 16,
                  backgroundColor: "#fff",
                  shadowColor: "#000",
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 3,
                  overflow: "hidden",
                }}
              >
                {/* Image */}
                <View
                  style={{ width: "100%", height: 120, position: "relative" }}
                >
                  {item.img ? (
                    <Image
                      source={{ uri: item.img }}
                      style={{ width: "80%", height: "100%" }}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#f5f5f5",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons name="image-outline" size={32} color="#ccc" />
                    </View>
                  )}

                  {/* + button */}
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: "#fff",
                      alignItems: "center",
                      justifyContent: "center",
                      shadowColor: "#000",
                      shadowOpacity: 0.12,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                  >
                    <Ionicons name="add" size={20} color="#1a1a1a" />
                  </TouchableOpacity>
                </View>

                {/* Card body */}
                <View style={{ padding: 10 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "700",
                      color: "#1a1a1a",
                      marginBottom: 4,
                    }}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#1a1a1a",
                    }}
                  >
                    ₦{item.price.toLocaleString("en-NG")}.00
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}
