import { AntDesign, Entypo } from "@expo/vector-icons";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { useRouter } from "expo-router";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

import { HStack } from "./Stack";

type IBackButtonProps = {
  type?: "back" | "close";
};

const BackButton = memo<IBackButtonProps>(({ type = "back" }) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        }
      }}
    >
      {type === "back" && (
        <HStack gap={0}>
          <Entypo
            name="chevron-small-left"
            size={32}
            color={theme.colors.primary}
          />
          <Text style={styles.title}>{t("Common:back", { lng: "en" })}</Text>
        </HStack>
      )}
      {type === "close" && (
        <HStack gap={0}>
          <AntDesign name="close" size={32} color={theme.colors.primary} />
        </HStack>
      )}
    </TouchableOpacity>
  );
});

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginLeft: -4,
    fontWeight: "500",
    fontSize: 16,
    color: theme.colors.primary,
  },
}));

BackButton.displayName = "BackButton";

export default BackButton;
