import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { AppText } from "./AppText";

const LocationNav = () => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#fff",
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginTop: 40,
        marginBottom: 16,
        gap: 6,
      }}
    >
      <Text style={{ fontSize: 14 }}>📍</Text>

      <AppText style={{ fontSize: 15, fontWeight: "600", color: "#1a1a1a" }}>
        Obafemi Awolowo Way
      </AppText>
      <AntDesign name="down" size={14} color="black" />
    </TouchableOpacity>
  );
};

export default LocationNav;
