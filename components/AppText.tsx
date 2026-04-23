import { Typography } from "@/constants/typography";
import { Text, TextProps } from "react-native";

type Variant = keyof typeof Typography;

export function AppText({
  variant = "body",
  style,
  ...props
}: TextProps & { variant?: Variant }) {
  return <Text {...props} style={[Typography[variant], style]} />;
}
