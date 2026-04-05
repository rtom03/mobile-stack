import { Dimensions } from "react-native";
import bn from ".././assets/bn/bn.png";
import dp from ".././assets/dp/dodo2.png";
import kk from ".././assets/kk/kk.jpg";
import scoopd from ".././assets/scoopd/scoopd.png";

import { Restaurant } from "./idx.type";

const PR_MENU_ITEMS = [
  { id: "1", icon: "🛒", label: "My cart", badge: 1, danger: false },
  { id: "2", icon: "📋", label: "Menu", badge: null, danger: false },
  { id: "3", icon: "🕐", label: "My orders", badge: null, danger: false },
  {
    id: "4",
    icon: "📍",
    label: "Delivery addresses",
    badge: null,
    danger: false,
  },
  { id: "5", icon: "⭐", label: "Points", badge: 0, danger: false },
  { id: "6", icon: "🗑️", label: "Delete account", badge: null, danger: true },
];

const RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    rank: 1,
    name: "Krispy Kreme",
    rating: 95,
    image: kk,
    badgeType: "discount",
    badgeText: "-35% some items",
  },
  {
    id: "2",
    rank: 2,
    name: "Dodo Pizza",
    rating: 97,
    image: dp,
    badgeType: "discount",
    badgeText: "-30% on orders over ₦2,000",
  },
  {
    id: "3",
    rank: 3,
    name: "Scoop'd",
    rating: 97,
    image: scoopd,
    badgeType: "prime",
    badgeText: "-20%",
  },
  {
    id: "4",
    rank: 3,
    name: "Burger Nation",
    rating: 97,
    image: bn,
    badgeType: "prime",
    badgeText: "-20%",
  },
];
const ORANGE = "rgb(248, 94, 17)";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2.3;

export { CARD_WIDTH, ORANGE, PR_MENU_ITEMS, RESTAURANTS };
