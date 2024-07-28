import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Button, Text, makeStyles } from "@rneui/themed";
import { memo, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import StyledBottomSheetModal from "../common/StyledBottomSheetModal";
import StyledBottomSheetView from "../common/StyledBottomSheetView";

type IOnboardingWelcomeDialogProps = object;

const OnboardingWelcomeDialog = memo<IOnboardingWelcomeDialogProps>(() => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <StyledBottomSheetModal
      ref={bottomSheetRef}
      enablePanDownToClose
      enableDynamicSizing
    >
      <StyledBottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>
          {t("OnboardingWelcomeDialog:welcome-to-groupexpense")}
        </Text>
        <Text style={styles.subtitle}>
          {t(
            "OnboardingWelcomeDialog:lets-started-the-onboarding-journey-to-manage-your-group-expenses",
          )}
        </Text>
        <Button
          title={t("common:get-started")}
          containerStyle={styles.buttonContainer}
          onPress={() => bottomSheetRef.current?.dismiss()}
        />
      </StyledBottomSheetView>
    </StyledBottomSheetModal>
  );
});

const useStyles = makeStyles((theme, insets: EdgeInsets) => ({
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: insets.bottom + 24,
    paddingTop: 12,
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

OnboardingWelcomeDialog.displayName = "OnboardingWelcomeDialog";

export default OnboardingWelcomeDialog;
