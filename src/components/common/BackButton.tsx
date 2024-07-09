import { Entypo } from "@expo/vector-icons";
import { makeStyles, Text, useTheme } from "@rneui/themed";
import { useRouter } from "expo-router";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

import { HStack } from "./Stack";

type IBackButtonProps = object;

const BackButton = memo<IBackButtonProps>(() => {
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
      <HStack gap={0}>
        <Entypo
          name="chevron-small-left"
          size={32}
          color={theme.colors.primary}
        />
        <Text style={styles.title}>{t("Common:back", { lng: "en" })}</Text>
      </HStack>
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
