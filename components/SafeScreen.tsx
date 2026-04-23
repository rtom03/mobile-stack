import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = ViewProps & {
  top?: boolean;
  bottom?: boolean;
};

export function SafeScreen({
  top = true,
  bottom = true,
  style,
  ...props
}: Props) {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View
      {...props}
      style={[
        {
          flex: 1,
          paddingTop: top ? insets.top : 0,
          paddingBottom: bottom ? tabBarHeight : 0, // 👈 dynamic
        },
        style,
      ]}
    />
  );
}
