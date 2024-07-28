import { useTheme } from "@rneui/themed";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

import BackButton from "@/src/components/common/BackButton";
import { getDefaultStackOptions } from "@/src/styles/getDefaultStackOptions";

export default function RootLayout() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Stack screenOptions={getDefaultStackOptions(theme)}>
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          headerLeft: () => <BackButton type="close" />,
          title: t("common:login"),
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: true,
          headerLeft: () => <BackButton type="close" />,
          title: t("common:sign-up"),
        }}
      />
      <Stack.Screen
        name="otp-email-verification"
        options={{
          headerShown: true,
          title: t("Otp:verify-email"),
        }}
      />
    </Stack>
  );
}
