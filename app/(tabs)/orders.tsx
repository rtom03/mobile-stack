import { AppText } from "@/components/AppText";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ORANGE = "rgb(248, 94, 17)";

const PENDING_ORDERS = [
  {
    id: "1",
    name: "Scoop'd Ice Cream Bar",
    icon: "🍦",
    deliveryTime: "20-30min",
    items: 1,
    price: "₦35,000.00",
  },
  {
    id: "2",
    name: "Burger Nation",
    icon: "🍔",
    deliveryTime: "25-35min",
    items: 1,
    price: "₦8,600.00",
  },
];

export default function OrdersScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Title */}
        <AppText
          style={{
            fontSize: 28,
            fontWeight: "800",
            color: "#1a1a1a",
            paddingHorizontal: 20,
            paddingTop: 16,
            marginBottom: 16,
            marginTop: 20,
          }}
        >
          Orders
        </AppText>

        {/* Track Orders Card */}
        <View
          style={{
            marginHorizontal: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#e5e5e5",
            paddingVertical: 32,
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: "#f0f0f0",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <AppText style={{ fontSize: 30 }}>📦</AppText>
          </View>
          <AppText
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: 4,
            }}
          >
            Track your orders
          </AppText>
          <AppText style={{ fontSize: 13, color: "#888", textAlign: "center" }}>
            Your ongoing orders will be listed here
          </AppText>
        </View>

        {/* Continue your order */}
        <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <AppText
              style={{ fontSize: 20, fontWeight: "800", color: "#1a1a1a" }}
            >
              Continue your order
            </AppText>
            <View
              style={{
                backgroundColor: "#e8e8e8",
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{ fontSize: 13, fontWeight: "700", color: "#1a1a1a" }}
              >
                {PENDING_ORDERS.length}
              </Text>
            </View>
          </View>
        </View>

        {/* Pending Order Items */}
        {PENDING_ORDERS.map((order, index) => (
          <TouchableOpacity
            key={order.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderBottomWidth: index < PENDING_ORDERS.length - 1 ? 1 : 0,
              borderBottomColor: "#f0f0f0",
            }}
          >
            {/* Store Icon */}
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 12,
                backgroundColor: "#f5f5f5",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 14,
                borderWidth: 1,
                borderColor: "#e8e8e8",
              }}
            >
              <Text style={{ fontSize: 28 }}>{order.icon}</Text>
            </View>

            {/* Info */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: "#1a1a1a",
                  marginBottom: 5,
                }}
              >
                {order.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 4,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                    backgroundColor: ORANGE,
                    borderRadius: 6,
                    paddingHorizontal: 7,
                    paddingVertical: 2,
                  }}
                >
                  <Text style={{ fontSize: 11 }}>✂️</Text>
                  <Text
                    style={{ fontSize: 11, fontWeight: "700", color: "#fff" }}
                  >
                    Free
                  </Text>
                </View>
                <Text style={{ fontSize: 12, color: "#555" }}>
                  · {order.deliveryTime}
                </Text>
              </View>
              <Text style={{ fontSize: 12, color: "#888" }}>
                {order.items} item
              </Text>
            </View>

            {/* Price */}
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#1a1a1a" }}>
              {order.price}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Order History Banner */}
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 32,
            backgroundColor: "#f5f5f5",
            borderRadius: 16,
            padding: 18,
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
          }}
        >
          <Text style={{ fontSize: 44 }}>🗒️</Text>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: "#1a1a1a",
                marginBottom: 5,
              }}
            >
              Need to review past orders or reorder?
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 13,
                  color: ORANGE,
                  fontWeight: "600",
                  textDecorationLine: "underline",
                }}
              >
                Check your order history
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
