import { Button, Input, Text, makeStyles } from "@rneui/themed";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { VStack } from "../Stack";

import Config from "@/src/Config";
import { useGetUser } from "@/src/api/hooks/useGetUser";
import { PatchUserUpdatePayload } from "@/src/api/types/User";

type IUserFormProps = {
  isEdit?: boolean;
  onSubmit: (values: PatchUserUpdatePayload) => Promise<void>;
  onDelete?: () => void;
  userId?: string;
  submitButtonText: string;
};

const UserForm = memo<IUserFormProps>(
  ({ onSubmit, isEdit, userId, onDelete, submitButtonText }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const { data: user } = useGetUser({ id: userId || "" });

    const {
      control,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm<PatchUserUpdatePayload>({
      defaultValues:
        Config.env === "local"
          ? {
              username: "test-user",
            }
          : {},
    });

    return (
      <View style={styles.container}>
        {isEdit ? (
          <Text h1 style={styles.title}>
            {t("UserForm:edit-member")}
          </Text>
        ) : (
          <Text h1 style={styles.title}>
            {user?.username
              ? t("UserForm:hi-user", {
                  name: user.username,
                })
              : t("UserForm:create-profile")}
          </Text>
        )}

        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("UserForm:username")}
              label={t("UserForm:who-are-you")}
            />
          )}
        />

        {/* Profile Image  */}

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
      </View>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
  label: {
    color: theme.colors.grey3,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  relatedGroup: {
    marginLeft: 10,
    marginTop: 4,
    marginBottom: 16,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
  },
}));

UserForm.displayName = "UserForm";

export default UserForm;
