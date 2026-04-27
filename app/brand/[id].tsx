import { AppText } from "@/components/AppText";
import BrandHeader from "@/components/BrandHeader";
import ItemDetailSheet from "@/components/ItemDetailSheet";
import MenuItemCard from "@/components/MenuItemCard";
import { Category } from "@/constants/idx.type";
import { getItemsByBrand } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface Item {
  id: string;
  name: string;
  price: number;
  img?: string;
  desc: string;
  category?: string;
}

export default function DetailsScreen() {
  const { id, name, hero_img, ratings, desc, category } = useLocalSearchParams<{
    id: string;
    name: string;
    hero_img: string;
    brand_icon: string;
    ratings: string;
    desc: string;
    category: string;
  }>();

  const parsedCategory: Category[] = category
    ? JSON.parse(category as string)
    : [];

  const brandId = parseInt(id);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [qty, setQty] = useState(1);
  // const tabScrollRef = useRef<ScrollView>(null);

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

  const addToCart = (item: Item[]) => {
    return item;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* brand header */}
      <BrandHeader />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── HERO IMAGE ──────────────────────────────────────────────── */}
        <View style={{ width: "100%", height: 200 }}>
          <Image
            source={{ uri: hero_img }}
            style={{ width: "100%", height: "80%" }}
            resizeMode="cover"
          />
        </View>

        {/* ── BRAND INFO ──────────────────────────────────────────────── */}
        <View style={{ paddingHorizontal: 20 }}>
          <AppText
            variant="h2"
            style={{
              color: "#1a1a1a",
              marginBottom: 10,
            }}
          >
            {name}
          </AppText>

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
            <AppText style={{ fontSize: 13, color: "#444" }}>
              Same prices as in store ›
            </AppText>
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
              <AppText style={{ color: "#1a1a1a" }}>{ratings}%</AppText>
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
              <AppText style={{ color: "#1a1a1a" }}>15-25'</AppText>
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
                <AppText
                  style={{
                    fontSize: 11,
                    color: "#aaa",
                    textDecorationLine: "line-through",
                  }}
                >
                  ₦199.00
                </AppText>
                <View
                  style={{
                    backgroundColor: "#e53935",
                    borderRadius: 4,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                  }}
                >
                  <AppText style={{ color: "#fff" }}>Free</AppText>
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
            horizontal
            // ref={tabScrollRef}
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
                <AppText
                  style={{
                    fontSize: 14,
                    color: activeTab === tab.id ? "#1a1a1a" : "#999",
                  }}
                >
                  {tab.name}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── TOP SELLERS SECTION ─────────────────────────────────────── */}
        <View style={{ paddingTop: 20 }}>
          {/* Section heading + arrow */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            <AppText variant="span" style={{ color: "#1a1a1a" }}>
              Top sellers
            </AppText>
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

          {/* Vertical product cards */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              gap: 12,
            }}
          >
            {items.map((item) => (
              // <TouchableOpacity
              //   key={item.id}
              //   style={styles.trigger}
              //   onPress={() => setSheetVisible(true)}
              //   activeOpacity={0.8}
              // >
              //   {/* Image */}
              //   <View
              //     style={{
              //       width: 120,
              //       height: 120,
              //       borderRadius: 10,
              //       backgroundColor: "#f5f5f5",
              //       overflow: "hidden",
              //       flexShrink: 0,
              //       padding: 8,
              //     }}
              //   >
              //     {item.img ? (
              //       <Image
              //         source={{ uri: item.img }}
              //         style={{ width: "100%", height: "100%" }}
              //         resizeMode="center"
              //       />
              //     ) : (
              //       <View
              //         style={{
              //           flex: 1,
              //           alignItems: "center",
              //           justifyContent: "center",
              //         }}
              //       >
              //         <Ionicons name="image-outline" size={28} color="#ccc" />
              //       </View>
              //     )}
              //   </View>

              //   {/* Info */}
              //   <View style={{ flexDirection: "column", gap: 5 }}>
              //     <View style={{ flexDirection: "row", gap: 10 }}>
              //       <AppText
              //         numberOfLines={1}
              //         ellipsizeMode="tail"
              //         style={{
              //           color: "#1a1a1a",
              //           marginBottom: 4,
              //           width: "40%", // 👈 important
              //         }}
              //       >
              //         {item.name}
              //       </AppText>
              //       <AppText
              //         style={{
              //           color: "#453224",
              //         }}
              //       >
              //         ₦{item.price.toLocaleString("en-NG")}.00
              //       </AppText>
              //     </View>
              //     <View
              //       style={{
              //         display: "flex",
              //         flexDirection: "row",
              //         gap: 25,
              //         // justifyContent: "space-between",
              //         paddingVertical: 10,
              //       }}
              //     >
              //       <AppText
              //         numberOfLines={3}
              //         ellipsizeMode="tail"
              //         style={{ fontSize: 10, width: 150 }}
              //       >
              //         {item.desc}
              //       </AppText>
              //     </View>
              //     <TouchableOpacity
              //       style={{
              //         width: 32,
              //         height: 32,
              //         borderRadius: 16,
              //         backgroundColor: "#1a1a1a",
              //         alignItems: "center",
              //         justifyContent: "center",
              //         marginLeft: "auto", // 👈 key line
              //         flexShrink: 0,
              //       }}
              //     >
              //       <Ionicons name="add" size={20} color="#fff" />
              //     </TouchableOpacity>
              //   </View>
              //   {/* Add button */}
              // </TouchableOpacity>
              <MenuItemCard
                item={item}
                onPress={() => setSheetVisible(true)}
                onAdd={() => addToCart(item)}
              />
            ))}
            <ItemDetailSheet
              visible={sheetVisible}
              onClose={() => setSheetVisible(false)}
              quantity={qty}
              onQuantityChange={setQty}
              onAddToCart={() => {
                setSheetVisible(false);
                // handle cart logic here
              }}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingVertical: 40,
    gap: 12,
    borderBottomWidth: 0.3,
    borderBottomColor: "gray",
  },
  triggerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
