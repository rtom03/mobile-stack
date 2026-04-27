import { Item } from "@/app/brand/[id]";
import { useCartStore } from "@/app/store/cartStore";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface DealBottomSheetProps {
  deal?: Item & { qty: number };
  visible: boolean;
  quantity: number; // 👈 ADD THIS

  onClose: () => void;
  onQuantityChange?: (qty: number) => void;
  onAddToCart?: () => void;
}

export default function ItemDetailSheet({
  deal,
  visible,
  onClose,
  onQuantityChange,
  onAddToCart,
}: DealBottomSheetProps) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const { addToCart, incrementQty, decrementQty, items } = useCartStore();

  useEffect(() => {
    console.log(items);
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 320,
          useNativeDriver: true,
          easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic — fast start, smooth land
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 260,
          useNativeDriver: true,
          easing: (t) => t * t, // ease-in — snappy dismiss
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const formatPrice = (val: number | undefined) =>
    val !== undefined
      ? `₦${val.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`
      : "₦0.00";

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Backdrop */}

      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Sheet — no fixed height, grows with content, capped at 90% */}

      <Animated.View
        style={[styles.sheet, { transform: [{ translateY }] }]}
        key={deal?.id}
      >
        <View style={styles.handle} />

        <TouchableOpacity
          style={styles.closeBtn}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>

        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: deal?.img }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.body}>
            <View style={styles.badge}>
              {/* <Text style={styles.badgeText}>-{deal.discount}%</Text> */}
            </View>

            <Text style={styles.title}>{deal?.name}</Text>

            <View style={styles.priceRow}>
              <Text style={styles.price}>
                {formatPrice((deal?.price ?? 0) * (deal?.qty ?? 1))}{" "}
              </Text>
              <Text style={styles.originalPrice}>
                {/* {formatPrice(deal.originalPrice)} */}
              </Text>
            </View>

            {/* <Text style={styles.note}>{deal.lowestPriceNote}</Text> */}
            <Text style={styles.description}>{deal?.desc}</Text>

            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => decrementQty(deal?.id)} // ✅ ?? not |
                activeOpacity={0.7}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{deal?.qty || 1}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => incrementQty(deal?.id)} // ✅ optional chain + nullish
                activeOpacity={0.7}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.ctaBtn}
            activeOpacity={0.85}
            onPress={() => {
              onAddToCart?.();
            }}
          >
            <Text style={styles.ctaText}>
              Add {deal?.qty ?? 1} for{" "}
              {formatPrice((deal?.price ?? 0) * (deal?.qty ?? 1))}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: SCREEN_HEIGHT * 0.95, // ✅ minimum height — always at least 75% tall
    maxHeight: SCREEN_HEIGHT * 0.95,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // No `height` prop — sheet is exactly as tall as its content
  },
  handle: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 4,
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DEDEDE",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  closeBtnText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "600",
  },
  scrollContent: {
    // intentionally empty — no extra padding that adds phantom space
  },
  imageContainer: {
    width: "100%",
    height: 280,
    backgroundColor: "#F9F9F9",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E8001C",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
  },
  originalPrice: {
    fontSize: 16,
    color: "#999",
    textDecorationLine: "line-through",
    fontWeight: "400",
  },
  note: {
    fontSize: 12,
    color: "#666",
    marginBottom: 18,
    lineHeight: 18,
  },
  description: {
    fontSize: 15,
    color: "#444",
    marginBottom: 24,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 50,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 20,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    fontSize: 22,
    color: "#111",
    lineHeight: 26,
  },
  qtyValue: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
    minWidth: 24,
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 40 : 24, // home indicator clearance
    backgroundColor: "#fff",
  },
  ctaBtn: {
    backgroundColor: "#00A082",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
