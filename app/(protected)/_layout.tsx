import { useTheme } from "@rneui/themed";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function RootLayout() {
  const { theme } = useTheme();
  const { t } = useTranslation();

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
      <Stack.Screen name="(drawer)" />

      {/* Onboarding */}
      <Stack.Screen
        name="onboarding/success"
        options={{ presentation: "transparentModal" }}
      />
      <Stack.Screen name="onboarding/[step]" />

      {/* User */}
      <Stack.Screen
        name="user/[id]"
        options={{
          headerShown: true,
          headerTitle: t("UserForm:edit-member"),
          presentation: "modal",
        }}
      />

      {/* Group */}
      <Stack.Screen
        name="group/create"
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="group/[id]/user-list"
        options={{ headerShown: true, headerTitle: "" }}
      />
    </Stack>
  );
}
