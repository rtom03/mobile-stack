import { AppText } from "@/components/AppText";
import { getBrandById, getItemsByBrand } from "@/services/api";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2.3;

// ─── Data ───────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 1, label: "Burger", emoji: "🍔", bg: "#FFF3E0" },
  { id: 2, label: "Coffee", emoji: "☕", bg: "#FFF8E1" },
  { id: 3, label: "Pizza", emoji: "🍕", bg: "#FBE9E7" },
  { id: 4, label: "Ice Cream", emoji: "🍦", bg: "#E8F5E9" },
];

export const CAROUSEL_ITEMS = [
  {
    id: "1",
    name: "Dodo Pizza",
    tag: "🍕 Pizza",
    rating: "4.8",
    time: "25 min",
    color: "#FF6B35",
    bg: "#FFF0EB",
    emoji: "🍕",
  },
  {
    id: "2",
    name: "Krispy Kreme",
    tag: "🍩 Donuts",
    rating: "4.9",
    time: "20 min",
    color: "#E91E63",
    bg: "#FCE4EC",
    emoji: "🍩",
  },
  {
    id: "3",
    name: "Burger Nation",
    tag: "🍔 Burgers",
    rating: "4.7",
    time: "30 min",
    color: "#FF8F00",
    bg: "#FFF8E1",
    emoji: "🍔",
  },
  {
    id: "4",
    name: "Scoop'd",
    tag: "🍦 Ice Cream",
    rating: "4.6",
    time: "15 min",
    color: "#00ACC1",
    bg: "#E0F7FA",
    emoji: "🍦",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function CategoryIcon({
  item,
  active,
  onPress,
}: {
  item: (typeof CATEGORIES)[0];
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.categoryWrapper}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.categoryCircle,
          active && styles.categoryCircleActive,
          { backgroundColor: active ? "#fff" : "rgba(255,255,255,0.35)" },
        ]}
      >
        <Text>{item.emoji}</Text>
      </View>
      <AppText variant="span" style={styles.categoryLabel}>
        {item.label}
      </AppText>
    </TouchableOpacity>
  );
}

function RestaurantCard({ item }: { item: (typeof CAROUSEL_ITEMS)[0] }) {
  return (
    <TouchableOpacity
      style={[styles.restaurantCard, { backgroundColor: item.bg }]}
      activeOpacity={0.85}
    >
      {/* Big emoji hero */}
      <View style={[styles.cardHero, { backgroundColor: item.color + "22" }]}>
        <Text style={styles.cardHeroEmoji}>{item.emoji}</Text>
      </View>

      {/* Info */}
      <View style={styles.cardInfo}>
        <AppText variant="span" style={styles.cardName} numberOfLines={1}>
          {item.name}
        </AppText>
        <AppText style={[styles.cardTag, { color: item.color }]}>
          {item.tag}
        </AppText>
        <View style={styles.cardMeta}>
          <AppText style={styles.cardMetaText}>⭐ {item.rating}</AppText>
          <View style={styles.cardDot} />
          <AppText style={styles.cardMetaText}>⏱ {item.time}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [dotIndex, setDotIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const [brandItems, setBrandItems] = useState();
  const [selectedBrand, setSelectedBrand] = useState();

  const handleBrandPress = async (brandId: number) => {
    try {
      const [brand, items] = await Promise.all([
        getBrandById(brandId),
        getItemsByBrand(brandId),
      ]);
      setActiveCategory(brandId);
      setSelectedBrand(brand);
      setBrandItems(items);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCarouselScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / (CARD_WIDTH + 12));
    setDotIndex(Math.min(index, CAROUSEL_ITEMS.length - 1));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(244, 65, 0)" />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        {/* ── Sticky Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.92)",
              borderRadius: 24,
              paddingHorizontal: 16,
              paddingVertical: 9,
              width: 200,
              maxWidth: 280,
              gap: 6,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 3,
              marginTop: 30,
            }}
            activeOpacity={0.8}
          >
            <AppText style={styles.locationPin}>📍</AppText>
            <AppText style={styles.locationText} numberOfLines={1}>
              Ak… Ogunlewe Road, 310B
            </AppText>
            <AppText style={styles.locationChevron}>▾</AppText>
          </TouchableOpacity>
        </View>

        {/* ── Hero Wave Section ── */}
        <View style={styles.hero}>
          {/* Greeting */}
          <AppText style={styles.heroGreeting} variant="h2">
            Good afternoon 👋
          </AppText>
          <AppText style={styles.heroSubtitle}>
            What are you craving today?
          </AppText>

          {/* Categories Grid */}
          <View style={styles.categoryRow}>
            {CATEGORIES.map((cat) => (
              <CategoryIcon
                key={cat.id}
                item={cat}
                active={activeCategory === cat.id}
                onPress={() => handleBrandPress(cat.id)}
              />
            ))}
          </View>

          {/* Wave bottom */}
          <View style={styles.heroWave} />
        </View>

        {/* ── For You Section ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText style={styles.sectionTitle} variant="h2">
              These are for you
            </AppText>
            <TouchableOpacity>
              <AppText style={styles.sectionSeeAll}>See all →</AppText>
            </TouchableOpacity>
          </View>

          {/* Horizontal Carousel */}
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
            snapToInterval={CARD_WIDTH + 12}
            decelerationRate="fast"
            onScroll={handleCarouselScroll}
            scrollEventThrottle={16}
          >
            {CAROUSEL_ITEMS.map((item) => (
              <RestaurantCard key={item.id} item={item} />
            ))}
          </ScrollView>

          {/* Dots */}
          <View style={styles.dotsRow}>
            {CAROUSEL_ITEMS.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === dotIndex && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        {/* ── Free Delivery Banner ── */}
        <View style={styles.bannerWrapper}>
          <View style={styles.banner}>
            <View style={styles.bannerText}>
              <AppText style={styles.bannerTitle}>
                🛵 Free delivery in the
                <AppText style={styles.bannerHighlight}>WHOLE app</AppText>
              </AppText>
              <AppText style={styles.bannerSub}>No minimum purchase</AppText>
            </View>
            <AppText style={styles.bannerEmoji}>📦</AppText>
          </View>
        </View>
      </ScrollView>

      {/* ── Bottom Navigation ── */}
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
  },

  // Header
  header: {
    backgroundColor: "rgb(248, 94, 17)",
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 9,
    maxWidth: 280,

    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginTop: 20,
  },
  locationPin: { fontSize: 14 },
  locationText: {
    flex: 1,

    color: "#1A1A1A",
    letterSpacing: -0.2,
  },
  locationChevron: { fontSize: 12, color: "#F9A825", fontWeight: "900" },

  // Hero
  hero: {
    backgroundColor: "rgb(248, 94, 17)",
    paddingTop: 4,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  heroGreeting: {
    color: "#fff",
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.82)",
    marginBottom: 24,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryWrapper: {
    alignItems: "center",
    flex: 1,
  },
  categoryCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryCircleActive: {
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  categoryLabel: {
    color: "#fff",
    letterSpacing: 0.2,
    textAlign: "center",
  },
  heroWave: {
    position: "absolute",
    bottom: -20,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  // Section
  section: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#1A1A1A",
    letterSpacing: -0.4,
  },
  sectionSeeAll: {
    color: "#F9A825",
  },

  // Carousel
  carouselContent: {
    paddingRight: 20,
    gap: 12,
  },
  restaurantCard: {
    width: CARD_WIDTH,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHero: {
    height: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeroEmoji: { fontSize: 54 },
  cardInfo: { padding: 12 },
  cardName: {
    color: "#1A1A1A",
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  cardTag: {
    marginBottom: 6,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardMetaText: {
    color: "#888",
  },
  cardDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#CCC",
  },

  // Dots
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#DDD",
  },
  dotActive: {
    width: 18,
    backgroundColor: "#F9A825",
  },

  // Banner
  bannerWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  banner: {
    backgroundColor: "#FFF8E1",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFE082",
  },
  bannerText: { flex: 1 },
  bannerTitle: {
    color: "#1A1A1A",
    marginBottom: 3,
    lineHeight: 20,
  },
  bannerHighlight: { color: "#F9A825", fontWeight: "900" },
  bannerSub: {
    color: "#888",
    fontWeight: "500",
  },
  bannerEmoji: { fontSize: 36, marginLeft: 12 },

  // List Cards
  listCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  listCardEmoji: {
    width: 58,
    height: 58,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  listCardInfo: { flex: 1 },
  listCardName: {
    color: "#1A1A1A",
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  listCardTag: {
    marginBottom: 4,
  },
  listCardBadge: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginLeft: 8,
  },
  listCardBadgeText: {
    color: "#fff",

    letterSpacing: 0.3,
  },

  // Bottom Nav
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: 28,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 16,
  },
  navTab: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  navIconBg: {
    width: 44,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  navIconBgActive: {
    backgroundColor: "#FFF3CD",
  },
  navEmoji: { fontSize: 20 },
  navLabel: {
    color: "#BBBBBBB",
  },
  navLabelActive: {
    color: "#F9A825",
    fontWeight: "800",
  },
});
