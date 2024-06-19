import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="onboarding" options={{ headerShown: true }} />
      <Stack.Screen name="(tab)" options={{ headerShown: false }} />
    </Stack>
  );
}
