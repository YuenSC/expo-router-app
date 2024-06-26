import { BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { Button, makeStyles, Text } from "@rneui/themed";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import { useGetMe } from "@/src/api/hooks/useGetMe";
import { usePatchUserUpdate } from "@/src/api/hooks/usePatchUserUpdate";
import StyledBottomSheet from "@/src/components/common/StyledBottomSheet";

const OnboardingSuccessPage = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const router = useRouter();
  const { t } = useTranslation();
  const ref = useRef<BottomSheet>(null);

  const { data } = useGetMe({});
  const { mutate: patchUserUpdate } = usePatchUserUpdate({});
  const userId = data?.id;

  const onClose = () => {
    ref.current?.close();
    if (userId) patchUserUpdate({ id: userId, isOnboardingCompleted: true });
    router.dismissAll();
    router.replace("/home");
  };

  return (
    <StyledBottomSheet
      ref={ref}
      enableDynamicSizing
      enablePanDownToClose
      onClose={onClose}
    >
      <BottomSheetView style={styles.contentContainer}>
        <LottieView
          autoPlay
          loop={false}
          style={styles.lottie}
          source={require("@/src/assets/lottie/congrat.json")}
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            {t("GroupCreateSuccessBottomSheet:congratulations")}
          </Text>
          <Text style={styles.subtitle}>
            {t("GroupCreateSuccessBottomSheet:congrat-message")}
          </Text>
          <Button
            title={t("common:get-started")}
            containerStyle={styles.buttonContainer}
            onPress={onClose}
          />
        </View>
      </BottomSheetView>
    </StyledBottomSheet>
  );
};

const useStyles = makeStyles((theme, inset: EdgeInsets) => ({
  contentContainer: {
    flex: 0,
    minHeight: 100,
    paddingHorizontal: 24,
    paddingBottom: Math.max(inset.bottom + 16, 16),
  },
  content: {
    marginTop: -50,
  },
  lottie: {
    width: "60%",
    aspectRatio: 1,
    alignSelf: "center",
    marginTop: -24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.grey1,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 24,
  },
}));

export default OnboardingSuccessPage;
