import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Colors, Theme } from "@rneui/themed";

import BackButton from "@/src/components/common/BackButton";

export const getDefaultStackOptions = (
  theme: {
    colors: Colors;
  } & Theme,
) =>
  ({
    headerShown: false,
    headerBackTitle: "Back",
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTitleStyle: {
      color: theme.colors.black,
    },
    headerLeft: () => <BackButton />,
    headerShadowVisible: false,
  }) satisfies NativeStackNavigationOptions;
