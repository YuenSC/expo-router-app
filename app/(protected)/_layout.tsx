import { useTheme } from "@rneui/themed";
import { Stack } from "expo-router";

export default function RootLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.black,
        },
      }}
    >
      <Stack.Screen name="onboarding/[step]" options={{ headerShown: false }} />
      <Stack.Screen name="(tab)" options={{ headerShown: false }} />
    </Stack>
  );
}
