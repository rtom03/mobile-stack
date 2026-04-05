import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface FullSearchProps {
  search: string;
  setSearch: (x: string) => void;
  setIsSearching: (x: boolean) => void;
}

export function FullSearchPage({
  search,
  setSearch,
  setIsSearching,
}: FullSearchProps) {
  const [recent] = useState([
    "krispy kreme",
    "dodo pizza",
    "dodo",
    "donuts",
    "krispy",
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: 52, // safe-area-friendly top margin
          paddingBottom: 12,
          gap: 12,
        }}
      >
        {/* Back button — gray rounded square matching screenshot */}
        <TouchableOpacity
          onPress={() => setIsSearching(false)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 90,
            backgroundColor: "#f2f2f2",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="chevron-back" size={22} color="#1a1a1a" />
        </TouchableOpacity>

        {/* Search input — gray fill + green border */}
        <Pressable
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f2f2f2",
            borderRadius: 28,
            borderWidth: 1,
            borderColor: "#aaa",
            paddingHorizontal: 16,
            paddingVertical: 8,
            gap: 8,
          }}
        >
          <Ionicons
            name="search"
            size={16}
            color="#999"
            style={{ marginRight: 8 }}
          />
          <TextInput
            autoFocus
            placeholder="Search"
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
            style={{ flex: 1, fontSize: 15, color: "#1a1a1a", padding: 0 }}
            returnKeyType="search"
          />
        </Pressable>
      </View>

      {/* ── RECENT SEARCHES ─────────────────────────────────────────────── */}
      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: "#1a1a1a",
            marginBottom: 16,
          }}
        >
          Recent searches
        </Text>

        {/* Chips — white bg + light border, matching screenshot */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {recent.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSearch(item)}
              style={{
                backgroundColor: "#fff",
                paddingVertical: 9,
                paddingHorizontal: 16,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#e0e0e0",
              }}
            >
              <Text style={{ fontSize: 14, color: "#1a1a1a" }}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
