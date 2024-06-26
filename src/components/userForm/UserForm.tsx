import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Button, Input, Text, makeStyles } from "@rneui/themed";
import { memo, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Keyboard, StyleProp, View, ViewStyle } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import ImagePickerBottomSheetModal from "../ImagePickerBottomSheetModal";
import ProfileImageUpload from "../ProfileImageUpload";
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
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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
          <ProfileImageUpload
            imageUrl={imageUrl}
            onPress={() => {
              bottomSheetModalRef.current?.present();
              Keyboard.dismiss();
            }}
          />
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

        <ImagePickerBottomSheetModal
          onImageUpload={(image) => setValue("profileImage", image)}
          ref={bottomSheetModalRef}
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
