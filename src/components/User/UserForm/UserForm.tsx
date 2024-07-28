import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Button, Input, Text, makeStyles } from "@rneui/themed";
import { memo, useEffect, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Keyboard, StyleProp, View, ViewStyle } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import ImagePickerBottomSheetModal from "../../ImagePickerBottomSheetModal";
import { VStack } from "../../common/Stack";
import ProfileImageUpload from "../ProfileImageUpload";

import Config from "@/src/Config";
import { PatchUserUpdatePayload, User } from "@/src/api/types/User";

type IUserFormProps = {
  isSubmitting?: boolean;
  onDelete?: () => void;
  onEdit: (values: PatchUserUpdatePayload) => void;
  style?: StyleProp<ViewStyle>;
  submitButtonText: string;
  user?: User;
};

const UserForm = memo<IUserFormProps>(
  ({ isSubmitting, onDelete, onEdit, style, submitButtonText, user }) => {
    const insets = useSafeAreaInsets();
    const styles = useStyles(insets);
    const { t } = useTranslation();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const { control, handleSubmit, setValue } = useForm<PatchUserUpdatePayload>(
      {
        shouldUnregister: false,
        defaultValues: Config.env === "local" ? { name: "test-user" } : {},
      },
    );
    const profileImageWatch = useWatch({ control, name: "profileImage" });
    const imageUrl = profileImageWatch?.uri || user?.imageUrl;

    useEffect(() => {
      if (user) {
        setValue("name", user.name);
      }
    }, [setValue, user]);

    return (
      <View style={[styles.container, style]}>
        <Controller
          control={control}
          name="name"
          rules={{ required: t("UserForm.name-is-required") }}
          render={({ field, fieldState: { error } }) => (
            <Input
              placeholder={t("UserForm:username")}
              label={t("UserForm:who-are-you")}
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={error?.message}
            />
          )}
        />

        {/* Profile Image  */}
        <VStack gap={12} alignItems="flex-start">
          <Text style={styles.label}>{t("UserForm:profile-image")}</Text>
          <ProfileImageUpload
            imageUrl={imageUrl}
            onPress={() => {
              bottomSheetModalRef.current?.present();
              Keyboard.dismiss();
            }}
          />
        </VStack>

        <VStack alignItems="stretch" gap={12}>
          <Button
            title={submitButtonText}
            containerStyle={styles.button}
            onPress={handleSubmit(onEdit)}
            loading={isSubmitting}
          />
          {onDelete && (
            <Button
              title={t("UserForm:removeFromGroup")}
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
