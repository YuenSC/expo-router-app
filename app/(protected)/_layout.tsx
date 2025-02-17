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
            headerTitle: t("GroupForm:create-group"),
            headerLargeTitle: true,
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="group/[id]/index"
          options={{
            headerShown: true,
            headerLargeTitle: true,
            headerTitle: t("OptionsScreen:group-detail"),
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="group/[id]/user-list"
          options={{
            headerShown: true,
            headerTitle: t("UserListForm:members"),
            headerLargeTitle: true,
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="group/[id]/delete"
          options={{ presentation: "transparentModal" }}
        />

        {/* Expense */}
        <Stack.Screen
          name="expense/create"
          options={{
            headerShown: true,
            headerTitle: t("Expense:create-expense"),
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="expense/[id]"
          options={{
            headerShown: true,
            headerTitle: t("Expense:edit-expense"),
            presentation: "modal",
          }}
        />

        {/* Others */}
        <Stack.Screen
          name="language"
          options={{
            headerShown: true,
            headerTitle: t("LanguageScreen:language"),
            headerLargeTitle: true,
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="image"
          options={{
            presentation: "transparentModal",
            animation: "fade",
          }}
        />
      </Stack>
    </>
  );
}
