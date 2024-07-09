import { Colors, Theme } from "@rneui/themed";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";

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
  }) satisfies NativeStackNavigationOptions;
