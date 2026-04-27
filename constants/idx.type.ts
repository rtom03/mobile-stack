export type BadgeType = "discount" | "prime" | null;

export interface Category {
  id: number;
  name: string;
}
export interface Brand {
  id: string;
  name: string;
  ranking: number;
  ratings: number;
  likes: number;
  brand_icon: string;
  hero_img: string;
  badgeType: BadgeType;
  badgeText: string | null;
  length: number;
  desc: string;
  category: Category[];
}
[];
