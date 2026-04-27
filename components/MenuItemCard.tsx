import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuItemCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    desc?: string;
    img?: string;
  };
  onPress: () => void;
  onAdd: () => void;
}

export default function MenuItemCard({
  item,
  onPress,
  onAdd,
}: MenuItemCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Image */}
      <View style={styles.imageWrap}>
        {item.img ? (
          <Image
            source={{ uri: item.img }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imageFallback}>
            <Ionicons name="image-outline" size={26} color="#ccc" />
          </View>
        )}
      </View>

      {/* Text content — takes all remaining width */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.desc} numberOfLines={2}>
          {item.desc}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>
            ₦{item.price.toLocaleString("en-NG")}.00
          </Text>
          {/* + button pinned to right */}
          <TouchableOpacity
            style={styles.addBtn}
            onPress={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            activeOpacity={0.8}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
    backgroundColor: "#fff",
    gap: 14,
  },

  // Image
  imageWrap: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    overflow: "hidden",
    flexShrink: 0, // never compress the image
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Info block — flex:1 so it fills remaining width and never overflows
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  desc: {
    fontSize: 12,
    color: "#888",
    lineHeight: 17,
  },

  // Footer row: price left, + button right
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#453224",
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
});
