import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCartStore } from "../store/cartStore";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  qty: number;
}

interface SuggestionItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_CART: CartItem[] = [
  {
    id: "1",
    name: "Classic Chicken Deal",
    price: 6000,
    originalPrice: 10000,
    discount: 40,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
    qty: 1,
  },
];

const SUGGESTIONS: SuggestionItem[] = [
  {
    id: "s1",
    name: "Supreme Delight Deal",
    price: 6000,
    originalPrice: 10000,
    discount: 40,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300",
  },
  {
    id: "s2",
    name: "Pepperoni Overload Deal",
    price: 6000,
    originalPrice: 10000,
    discount: 40,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300",
  },
  {
    id: "s3",
    name: "Margherita Classic",
    price: 6000,
    originalPrice: 10000,
    discount: 40,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300",
  },
  {
    id: "s4",
    name: "Coca-Cola 500ml",
    price: 800,
    originalPrice: 1200,
    discount: 33,
    image: "https://images.unsplash.com/photo-1561758033-48d52648ae8b?w=300",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  `₦${n.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function QtyControl({
  qty,
  onDec,
  onInc,
  onDelete,
}: {
  qty: number;
  onDec: () => void;
  onInc: () => void;
  onDelete: () => void;
}) {
  return (
    <View style={styles.qtyControl}>
      <TouchableOpacity
        onPress={qty === 1 ? onDelete : onDec}
        activeOpacity={0.7}
      >
        {qty === 1 ? (
          <Text style={styles.trashIcon}>🗑</Text>
        ) : (
          <Text style={styles.qtyBtnText}>−</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.qtyNum}>{qty}</Text>
      <TouchableOpacity onPress={onInc} activeOpacity={0.7}>
        <Text style={styles.qtyBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function SuggestionCard({
  item,
  onAdd,
}: {
  item: SuggestionItem;
  onAdd: () => void;
}) {
  return (
    <View style={styles.suggCard}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.suggImageWrap}>
        {item.discount > 0 && (
          <View style={styles.discBadge}>
            <Text style={styles.discBadgeText}>-{item.discount}%</Text>
          </View>
        )}
        <Image
          source={{ uri: item.image }}
          style={styles.suggImage}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={onAdd}
          activeOpacity={0.8}
        >
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.suggName} numberOfLines={2}>
        {item.name}
      </Text>
      <View style={styles.suggPriceRow}>
        <Text style={styles.suggPrice}>{fmt(item.price)}</Text>
        <Text style={styles.suggOriginal}>{fmt(item.originalPrice)}</Text>
      </View>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function CartScreen() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const { items, totalPrice, removeFromCart, incrementQty, decrementQty } =
    useCartStore();

  const totalOriginal = cart.reduce(
    (sum, i) => sum + i.originalPrice * i.qty,
    0,
  );
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  const clearCart = () => setCart([]);

  const addSuggestion = (s: SuggestionItem) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === s.id);
      if (exists)
        return prev.map((i) => (i.id === s.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...s, qty: 1 }];
    });
  };

  return (
    <View style={styles.screen}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Cart header ── */}
        <View style={styles.cartTitleRow}>
          <View>
            <Text style={styles.cartTitle}>Your Cart</Text>
            <Text style={styles.cartSubtitle}>
              {totalItems} product{totalItems !== 1 ? "s" : ""} from{" "}
              <Text style={styles.storeName}>Dodo Pizza</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={clearCart}
            activeOpacity={0.7}
            style={styles.clearBtn}
          >
            <Text style={styles.clearIcon}>🗑</Text>
          </TouchableOpacity>
        </View>

        {/* ── Cart items ── */}
        {cart.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty</Text>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image
                source={{ uri: item.img }}
                style={styles.cartItemImage}
                resizeMode="cover"
              />
              <View style={styles.cartItemInfo}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <View style={styles.cartItemPriceRow}>
                  <Text style={styles.cartItemPrice}>{fmt(item.price)}</Text>
                  <Text style={styles.cartItemOriginal}>{fmt(item.price)}</Text>
                </View>
              </View>
              <View style={styles.cartItemRight}>
                <QtyControl
                  qty={item.qty}
                  onDec={() => decrementQty(item.id)}
                  onInc={() => incrementQty(item.id)}
                  onDelete={() => removeFromCart(item.id)}
                />
                {/* {item.discount > 0 && (
                  <View style={styles.itemDiscBadge}>
                    <Text style={styles.itemDiscText}>-{item.discount}%</Text>
                  </View>
                )} */}
              </View>
            </View>
          ))
        )}

        {/* ── Add more items ── */}
        <View style={styles.addMoreRow}>
          <TouchableOpacity style={styles.addMoreBtn} activeOpacity={0.7}>
            <Text style={styles.addMoreText}>Add more items</Text>
          </TouchableOpacity>
        </View>

        {/* ── Suggestions ── */}
        <Text style={styles.sectionTitle}>You might also like</Text>
        <FlatList
          data={SUGGESTIONS}
          keyExtractor={(i) => i.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.suggRow}
          renderItem={({ item }) => (
            <SuggestionCard item={item} onAdd={() => addSuggestion(item)} />
          )}
        />

        {/* Bottom padding so content clears the fixed footer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Fixed checkout footer ── */}
      <View style={styles.footer}>
        <View style={styles.footerPrices}>
          {/* <Text style={styles.footerPrice}>{fmt(totalPrice)}</Text> */}
          <Text style={styles.footerOriginal}>{fmt(totalOriginal)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.85}>
          <Text style={styles.checkoutText}>Go to checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 56 : 20,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 22,
    color: "#111",
    lineHeight: 26,
    marginTop: -2,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
  },
  headerRight: {
    width: 36,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  // Cart title
  cartTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
  },
  cartSubtitle: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  storeName: {
    fontWeight: "700",
    textDecorationLine: "underline",
    color: "#111",
  },
  clearBtn: {
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  clearIcon: {
    fontSize: 16,
  },

  emptyText: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 24,
  },

  // Cart item
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    gap: 12,
  },
  cartItemImage: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },
  cartItemInfo: {
    flex: 1,
    gap: 4,
  },
  cartItemName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    lineHeight: 20,
  },
  cartItemPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },
  cartItemOriginal: {
    fontSize: 13,
    color: "#999",
    textDecorationLine: "line-through",
  },
  cartItemRight: {
    alignItems: "flex-end",
    gap: 6,
  },
  itemDiscBadge: {
    backgroundColor: "#E8001C",
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  itemDiscText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  // Qty control
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  qtyBtnText: {
    fontSize: 20,
    color: "#111",
    fontWeight: "400",
    lineHeight: 24,
  },
  trashIcon: {
    fontSize: 16,
  },
  qtyNum: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    minWidth: 18,
    textAlign: "center",
  },

  // Add more
  addMoreRow: {
    alignItems: "flex-end",
    paddingVertical: 14,
  },
  addMoreBtn: {
    backgroundColor: "#F2F2F2",
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  addMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },

  // Suggestions
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
    marginBottom: 14,
  },
  suggRow: {
    gap: 12,
    marginBottom: 12,
  },
  suggCard: {
    flex: 1,
  },
  suggImageWrap: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
    marginBottom: 8,
    position: "relative",
  },
  suggImage: {
    width: "100%",
    height: 150,
  },
  discBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#E8001C",
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 2,
    zIndex: 1,
  },
  discBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  addBtn: {
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
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  addBtnText: {
    fontSize: 20,
    color: "#111",
    lineHeight: 24,
    marginTop: -1,
  },
  suggName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
    lineHeight: 19,
  },
  suggPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  suggPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111",
  },
  suggOriginal: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 36 : 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  footerPrices: {
    gap: 2,
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },
  footerOriginal: {
    fontSize: 13,
    color: "#999",
    textDecorationLine: "line-through",
  },
  checkoutBtn: {
    backgroundColor: "#00A082",
    borderRadius: 50,
    paddingHorizontal: 28,
    paddingVertical: 15,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
