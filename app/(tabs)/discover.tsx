import DiscoverContent from "@/components/DiscoverContentPage";
import { FullSearchPage } from "@/components/FullSearchPage";
import { ORANGE } from "@/constants";
import { getAllBrands } from "@/services/api";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";

export default function DiscoverScreen() {
  const [search, setSearch] = useState<string>("");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const data = await getAllBrands();
      setBrands(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={ORANGE} />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {isSearching ? (
        <FullSearchPage
          search={search}
          setSearch={setSearch}
          setIsSearching={setIsSearching}
        />
      ) : (
        <DiscoverContent setIsSearching={setIsSearching} brands={brands} />
      )}
    </SafeAreaView>
  );
}
