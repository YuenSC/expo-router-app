import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  Button,
  Image,
  Input,
  Text,
  makeStyles,
  useTheme,
} from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { memo, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Keyboard,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import UserFormBottomSheet from "./UserFormBottomSheet";
import { VStack } from "../Stack";

import Config from "@/src/Config";
import { PatchUserUpdatePayload, User } from "@/src/api/types/User";

type IUserFormProps = {
  isEdit?: boolean;
  onSubmit: (values: PatchUserUpdatePayload) => Promise<void>;
  onDelete?: () => void;
  user?: User;
  submitButtonText: string;
  style?: StyleProp<ViewStyle>;
};

const UserForm = memo<IUserFormProps>(
  ({ onSubmit, isEdit, user, onDelete, submitButtonText, style }) => {
    const insets = useSafeAreaInsets();
    const styles = useStyles(insets);
    const { t } = useTranslation();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { theme } = useTheme();

    const {
      control,
      handleSubmit,
      formState: { isSubmitting },
      setValue,
    } = useForm<PatchUserUpdatePayload>({
      shouldUnregister: false,
      defaultValues: Config.env === "local" ? { name: "test-user" } : {},
    });
    const profileImageWatch = useWatch({ control, name: "profileImage" });
    const imageUrl = profileImageWatch?.uri || user?.imageUrl;

    const handleImageAsset = async (result: ImagePicker.ImagePickerResult) => {
      if (result.canceled || !result?.assets?.[0]) {
        return;
      }
      const { uri, fileName, mimeType } = result.assets[0];
      setValue("profileImage", {
        uri,
        type: mimeType,
        name: fileName || "profile-image",
      });
    };

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

    return (
      <View style={[styles.container, style]}>
        {isEdit ? (
          <Text h1 style={styles.title}>
            {t("UserForm:edit-member")}
          </Text>
        ) : (
          <Text h1 style={styles.title}>
            {user?.name
              ? t("UserForm:hi-user", {
                  name: user.name,
                })
              : t("UserForm:create-profile")}
          </Text>
        )}

        <Controller
          control={control}
          name="name"
          rules={{ required: t("UserForm:name-s") }}
          render={({ field, fieldState: { error } }) => (
            <Input
              autoFocus
              placeholder={t("UserForm:username")}
              label={t("UserForm:who-are-you")}
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={error?.message}
            />
          )}
        />

        {/* Profile Image  */}
        <VStack gap={12}>
          <Text style={styles.label}>{t("UserForm:profile-image")}</Text>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.expand();
              Keyboard.dismiss();
            }}
            style={[styles.profileImageContainer, { marginLeft: 8 }]}
          >
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={styles.profileImageContainer}
              />
            ) : (
              <MaterialIcons
                name="file-upload"
                size={30}
                color={theme.colors.black}
              />
            )}
          </TouchableOpacity>
        </VStack>

        <VStack alignItems="stretch" gap={4}>
          <Button
            title={submitButtonText}
            containerStyle={styles.button}
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
          />
          {onDelete && (
            <Button
              title={t("Common:delete")}
              type="outline"
              color="error"
              onPress={onDelete}
            />
          )}
        </VStack>

        <UserFormBottomSheet
          takePhoto={takePhoto}
          pickImage={pickImage}
          ref={bottomSheetRef}
        />
      </View>
    );
  },
);

const useStyles = makeStyles((theme, insets: EdgeInsets) => ({
  container: {
    paddingHorizontal: theme.spacing.lg,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing.xl,
  },
  button: {
    marginTop: theme.spacing.xl,
  },
  label: {
    color: theme.colors.grey3,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  profileImageContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
}));

UserForm.displayName = "UserForm";

export default UserForm;
