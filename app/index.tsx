import { Dialog, makeStyles, Text } from "@rneui/themed";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, TouchableWithoutFeedback } from "react-native";

import Config from "@/src/Config";
import ButtonWithRef from "@/src/components/common/ButtonWithRef";
import { VStack } from "@/src/components/common/Stack";

const WelcomePage = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [isDebugMode, setIsDebugMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onLongPress={() => setIsDebugMode(!isDebugMode)}
      >
        <LottieView
          autoPlay
          style={styles.lottieAnimation}
          source={require("@/src/assets/lottie/welcome.json")}
        />
      </TouchableWithoutFeedback>

      <Text style={styles.titleText}>{t("WelcomeScreen:title")}</Text>
      <Text style={styles.subtitleText}>{t("WelcomeScreen:subtitle")}</Text>

      <VStack gap={8} style={styles.buttonGroup} alignItems="stretch">
        <Link href="/login" asChild>
          <ButtonWithRef
            title={t("common:login")}
            containerStyle={styles.buttonContainer}
          />
        </Link>
        <Link href="/sign-up" asChild>
          <ButtonWithRef
            type="clear"
            title={t("common:sign-up")}
            containerStyle={styles.buttonContainer}
          />
        </Link>
      </VStack>

      <Dialog
        isVisible={isDebugMode}
        onBackdropPress={() => setIsDebugMode(false)}
      >
        <Text>{JSON.stringify(Config, null, 2)}</Text>
      </Dialog>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  lottieAnimation: {
    width: "100%",
    aspectRatio: 1,
  },
  titleText: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 16,
  },
  subtitleText: {
    textAlign: "center",
    fontSize: 16,
    color: theme.colors.grey1,
  },
  buttonGroup: {
    marginTop: "auto",
    marginBottom: 16,
  },
  buttonContainer: {
    marginHorizontal: 16,
  },
}));

export default WelcomePage;
