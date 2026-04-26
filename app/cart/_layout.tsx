import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="cart/[id]" options={{ title: "Cart" }} />
    </Stack>
  );
}
