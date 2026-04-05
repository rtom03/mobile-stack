import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="brand/[id]" options={{ title: "Details" }} />
    </Stack>
  );
}
