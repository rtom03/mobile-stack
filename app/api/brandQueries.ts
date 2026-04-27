import { getAllBrands, getBrandById } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

// fetch all brands
export const useBrands = () =>
  useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });

// fetch items by brand id
export const useItemsByBrand = (brandId: number) =>
  useQuery({
    queryKey: ["items", brandId],
    queryFn: () => getBrandById(brandId),
    enabled: !!brandId, // only runs if brandId exists
  });
