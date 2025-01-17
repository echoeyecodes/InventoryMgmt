import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="add-inventory" />
    </Stack>
  );
}
