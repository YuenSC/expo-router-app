import { useTheme } from "@rneui/themed";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

import NetworkDialog from "@/src/components/NetworkDialog";
import { getDefaultStackOptions } from "@/src/styles/getDefaultStackOptions";

export default function RootLayout() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <NetworkDialog />
      <Stack screenOptions={getDefaultStackOptions(theme)}>
        <Stack.Screen name="(drawer)" />

        {/* Onboarding */}
        <Stack.Screen
          name="onboarding/success"
          options={{ presentation: "transparentModal" }}
        />
        <Stack.Screen
          name="onboarding/[step]"
          options={{
            headerShown: true,
            headerLargeTitle: true,
          }}
        />

        {/* User */}
        <Stack.Screen
          name="user/[id]"
          options={{
            headerShown: true,
            headerLargeTitle: true,
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
          options={{
            headerShown: true,
            headerTitle: t("UserListForm:members"),
            headerLargeTitle: true,
          }}
        />
        <Stack.Screen
          name="group/[id]/delete"
          options={{ presentation: "transparentModal" }}
        />
      </Stack>
    </>
  );
}
