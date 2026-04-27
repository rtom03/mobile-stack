import { getAllItems, getItemsByBrand } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getAllItems,
  });

export const useProduct = (brandId: number) =>
  useQuery({
    queryKey: ["product", brandId],
    queryFn: () => getItemsByBrand(brandId),
    enabled: !!brandId,
  });
