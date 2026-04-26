import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MenuItem {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  badge?: string;
  route?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MENU_GROUPS: MenuItem[][] = [
  [
    {
      id: "orders",
      icon: "bag-outline",
      label: "Order history",
      route: "/orders",
    },
    {
      id: "account",
      icon: "person-outline",
      label: "Account",
      route: "/account",
    },
  ],
  [
    {
      id: "prime",
      icon: "shield-outline",
      label: "Glovo Prime",
      route: "/prime",
    },
    {
      id: "promo",
      icon: "pricetag-outline",
      label: "Promo codes",
      route: "/promo",
    },
    {
      id: "language",
      icon: "language-outline",
      label: "Language",
      route: "/language",
    },
    {
      id: "appearance",
      icon: "contrast-outline",
      label: "Appearance",
      badge: "New",
      route: "/appearance",
    },
    { id: "faq", icon: "help-circle-outline", label: "FAQ", route: "/faq" },
  ],
];

const TAB_ITEMS = [
  {
    id: "home",
    icon: "home-outline" as keyof typeof Ionicons.glyphMap,
    label: "Home",
  },
  {
    id: "discover",
    icon: "search-outline" as keyof typeof Ionicons.glyphMap,
    label: "Discover",
  },
  {
    id: "orders",
    icon: "bag-outline" as keyof typeof Ionicons.glyphMap,
    label: "Orders",
  },
  {
    id: "profile",
    icon: "person" as keyof typeof Ionicons.glyphMap,
    label: "Profile",
    active: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function MenuRow({ item, isLast }: { item: MenuItem; isLast: boolean }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.menuRow, !isLast && styles.menuRowBorder]}
      activeOpacity={0.6}
      onPress={() => item.route && router.push(item.route as any)}
    >
      <View style={styles.menuRowLeft}>
        <Ionicons name={item.icon} size={22} color="#333" />
        <Text style={styles.menuLabel}>{item.label}</Text>
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </View>
      <Ionicons name="chevron-forward" size={18} color="#C0C0C0" />
    </TouchableOpacity>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      {/* ── Yellow hero ── */}
      <View style={styles.hero}>
        {/* Help button */}
        <View style={styles.heroTopRow}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.helpBtn} activeOpacity={0.8}>
            <Text style={styles.helpText}>Help</Text>
          </TouchableOpacity>
        </View>

        {/* User row */}
        <TouchableOpacity style={styles.userRow} activeOpacity={0.75}>
          {/* Avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>TR</Text>
          </View>

          {/* Name + subtitle */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Tomiwa{"\n"}Raheem</Text>
            <Text style={styles.userSub}>Connect with friends</Text>
          </View>

          {/* NEW badge + chevron */}
          <View style={styles.userRowRight}>
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#1a1a1a" />
          </View>
        </TouchableOpacity>
      </View>

      {/* ── White card content ── */}
      <ScrollView
        style={styles.sheet}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.sheetContent}
      >
        <Text style={styles.sectionTitle}>Profile</Text>

        {MENU_GROUPS.map((group, gi) => (
          <View key={gi} style={styles.menuGroup}>
            {group.map((item, idx) => (
              <MenuRow
                key={item.id}
                item={item}
                isLast={idx === group.length - 1}
              />
            ))}
          </View>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* ── Bottom tab bar ── */}
      <View style={styles.tabBar}>
        {TAB_ITEMS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <View style={tab.active ? styles.tabIconActive : undefined}>
              <Ionicons
                name={tab.icon}
                size={24}
                color={tab.active ? "#F5A623" : "#999"}
              />
            </View>
            <Text
              style={[styles.tabLabel, tab.active && styles.tabLabelActive]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const HERO_BG = "#F5A623";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: HERO_BG,
  },

  // Hero
  hero: {
    backgroundColor: HERO_BG,
    paddingTop: Platform.OS === "ios" ? 56 : 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  helpBtn: {
    backgroundColor: "#00A082",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 50,
  },
  helpText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  // User row
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6ECFC4",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1a1a1a",
    lineHeight: 26,
  },
  userSub: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  userRowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
  },
  newBadge: {
    borderWidth: 1.5,
    borderColor: "#00A082",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  newBadgeText: {
    color: "#00A082",
    fontSize: 11,
    fontWeight: "700",
  },

  // White sheet
  sheet: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  sheetContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 20,
  },

  // Menu groups
  menuGroup: {
    borderRadius: 0,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  menuRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  badge: {
    backgroundColor: "#E6F7F4",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#00A082",
    fontSize: 11,
    fontWeight: "700",
  },

  // Tab bar
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingBottom: Platform.OS === "ios" ? 28 : 10,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },
  tabIconActive: {
    // no background — just color change
  },
  tabLabel: {
    fontSize: 11,
    color: "#999",
  },
  tabLabelActive: {
    color: "#1a1a1a",
    fontWeight: "600",
  },
});
