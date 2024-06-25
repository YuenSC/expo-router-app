import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TouchableHighlight } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import StyledBottomSheet from "./common/StyledBottomSheet";

type IUserFormBottomSheetProps = {
  handleImageAsset: (result: ImagePicker.ImagePickerResult) => Promise<void>;
};

const ImagePickerBottomSheet = forwardRef<
  BottomSheet,
  IUserFormBottomSheetProps
>(({ handleImageAsset }, ref) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const takePhoto = async () => {
    const res = await ImagePicker.requestCameraPermissionsAsync();
    if (res.granted === false) {
      Toast.show({
        type: "error",
        text1: t("UserForm.camera-permission-required"),
        text2: t(
          "UserForm.you-need-to-enable-camera-permissions-to-use-this-feature",
        ),
      });
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
    });
    await handleImageAsset(result);
    bottomSheetRef.current?.close();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    await handleImageAsset(result);
    bottomSheetRef.current?.close();
  };

  useImperativeHandle(ref, () => ({
    close: () => {
      bottomSheetRef.current?.close();
    },
    collapse: () => {
      bottomSheetRef.current?.collapse();
    },
    expand: () => {
      console.log("expand");
      bottomSheetRef.current?.expand();
    },
    forceClose: () => {
      bottomSheetRef.current?.forceClose();
    },
    snapToIndex: (index: number) => {
      bottomSheetRef.current?.snapToIndex(index);
    },
    snapToPosition: (position: number | string) => {
      bottomSheetRef.current?.snapToPosition(position);
    },
  }));

  return (
    <StyledBottomSheet
      ref={bottomSheetRef}
      enablePanDownToClose
      enableDynamicSizing
    >
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
});

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

ImagePickerBottomSheet.displayName = "UserFormBottomSheet";

export default ImagePickerBottomSheet;
