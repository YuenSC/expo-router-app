import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { TouchableHighlight } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import StyledBottomSheet from "../common/StyledBottomSheet";

type IUserFormBottomSheetProps = {
  takePhoto: () => void;
  pickImage: () => void;
};

const UserFormBottomSheet = forwardRef<BottomSheet, IUserFormBottomSheetProps>(
  ({ pickImage, takePhoto }, ref) => {
    const insets = useSafeAreaInsets();
    const styles = useStyles(insets);
    const { theme } = useTheme();
    const { t } = useTranslation();

    return (
      <StyledBottomSheet ref={ref} enablePanDownToClose enableDynamicSizing>
        <BottomSheetView style={styles.bottomSheetView}>
          <TouchableHighlight
            style={styles.bottomSheetButton}
            activeOpacity={0.9}
            underlayColor={theme.colors.grey5}
            onPress={takePhoto}
          >
            <Text style={styles.bottomSheetButtonText}>
              {t("UserForm:take-photo")}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.bottomSheetButton}
            activeOpacity={0.9}
            underlayColor={theme.colors.grey5}
            onPress={pickImage}
          >
            <Text style={styles.bottomSheetButtonText}>
              {t("UserForm:choose-photo-from-library")}
            </Text>
          </TouchableHighlight>
        </BottomSheetView>
      </StyledBottomSheet>
    );
  },
);

const useStyles = makeStyles((theme, insets: EdgeInsets) => ({
  bottomSheetView: {
    backgroundColor: theme.colors.modal,
    minHeight: 10,
    paddingBottom: insets.bottom + 48,
    paddingTop: 16,
  },
  bottomSheetButton: {
    padding: 16,
  },
  bottomSheetButtonText: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
}));

UserFormBottomSheet.displayName = "UserFormBottomSheet";

export default UserFormBottomSheet;
