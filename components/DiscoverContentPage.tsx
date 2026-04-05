import { ORANGE } from "@/constants";
import { Brand } from "@/constants/idx.type";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import {
  Animated,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RestaurantRankingList from "./RestaurantRankList";

// ─── constants ────────────────────────────────────────────────────────────────
const HERO_HEIGHT = 240; // full height of orange section
const SEARCH_TOP = 44; // where bar rests once hero is gone (safe-area gap)
const STRADDLE = 50; // px the bar rises above the orange/white seam

// scrollY value at which the bar has fully reached the top
const SCROLL_AT_TOP = HERO_HEIGHT - SEARCH_TOP - STRADDLE; // 174

interface DiscoverProps {
  setIsSearching: (x: boolean) => void;
  brands: Brand[];
}

export default function DiscoverContent({
  setIsSearching,
  brands,
}: DiscoverProps) {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Hero content fades in first 45% of scroll
  const heroOpacity = scrollY.interpolate({
    inputRange: [0, HERO_HEIGHT * 0.45],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  // Search bar travels from straddling seam → sticky SEARCH_TOP
  const searchBarTop = scrollY.interpolate({
    inputRange: [0, SCROLL_AT_TOP],
    outputRange: [HERO_HEIGHT - STRADDLE, SEARCH_TOP],
    extrapolate: "clamp",
  });

  // ── NEW ── White backdrop fades in only as bar locks into its sticky slot
  // Starts fading 16px before the bar reaches its final position
  const headerBgOpacity = scrollY.interpolate({
    inputRange: [SCROLL_AT_TOP - 16, SCROLL_AT_TOP],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1 }}>
      {/* LAYER 1 — Static orange slab */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HERO_HEIGHT,
          backgroundColor: ORANGE,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: "#fde9a2",
            marginTop: 20,
            right: -30,
            top: -20,
          }}
        />
      </View>

      {/* LAYER 2 — Scrollable content */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: HERO_HEIGHT - 28,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingTop: 40,
            paddingHorizontal: 16,
            paddingBottom: 50,
          }}
        >
          <RestaurantRankingList brands={brands} />
        </View>
      </Animated.ScrollView>

      {/* LAYER 3 — Hero text overlay, fades on scroll */}
      <Animated.View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HERO_HEIGHT,
          opacity: heroOpacity,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: "#fff",
            borderRadius: 24,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 40,
            marginBottom: 16,
            gap: 6,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#1a1a1a" }}>
            Obafemi Awolowo Way
          </Text>
          <AntDesign name="down" size={14} color="black" />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 34, fontWeight: "800", color: "#fff" }}>
            Discover
          </Text>
          <Text style={{ fontSize: 80, marginBottom: -14 }}>🔍</Text>
        </View>
      </Animated.View>

      {/* ── NEW — LAYER 4: White header backdrop ──────────────────────────
       *  Sits directly behind the search bar.
       *  Opacity 0 → 1 over the last 16px of the bar's journey to the top.
       *  Blocks scrolling content from showing through when bar is sticky.
       *  zIndex 9 (one below the search bar at 10).
       */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: SEARCH_TOP + 45,
          backgroundColor: "#fff",
          opacity: headerBgOpacity,
          zIndex: 9,
          justifyContent: "flex-end",

          // iOS
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08,
          shadowRadius: 8,

          // Android
          elevation: 4,
        }}
      />

      {/* LAYER 5 — Search bar, animated top */}
      <Animated.View
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          top: searchBarTop,
          zIndex: 10,
        }}
      >
        <Pressable
          onPress={() => setIsSearching(true)}
          style={({ pressed }) => ({
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: pressed ? "#e8e8e8" : "#f2f2f2",
            borderRadius: 28,
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: "#e0e0e0",
            position: "absolute",
          })}
        >
          <Ionicons
            name="search"
            size={16}
            color="#999"
            style={{ marginRight: 8 }}
          />
          <Text style={{ fontSize: 14, color: "#aaa", flex: 1 }}>
            Search in Discover
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
