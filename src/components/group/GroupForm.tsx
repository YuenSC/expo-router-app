import { Button, Input, makeStyles } from "@rneui/themed";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { useGetGroup } from "../../api/hooks/group/useGetGroup";
import { PostGroupCreatePayload } from "../../api/types/Group";

import Config from "@/src/Config";

type IGroupFormProps = {
  groupId?: string;
  isSubmitting?: boolean;
  onSubmit: (values: PostGroupCreatePayload) => void;
};

const GroupForm = memo<IGroupFormProps>(
  ({ groupId, onSubmit, isSubmitting }) => {
    const styles = useStyles();
    const isEdit = groupId;
    const { t } = useTranslation();

    const { data: group } = useGetGroup({ id: groupId || "" });
    const { control, handleSubmit } = useForm<PostGroupCreatePayload>({
      defaultValues:
        Config.env === "local"
          ? {
              name: "Calvin Group",
              description: "Calvin Group Description",
            }
          : {
              name: group?.name,
              description: group?.description,
            },
    });

    return (
      <View style={styles.container}>
        <Controller
          control={control}
          name="name"
          rules={{ required: t("GroupForm:group-name-is-required") }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              onChangeText={onChange}
              value={value}
              placeholder={t("GroupForm:your-first-group-expense")}
              label={t("GroupForm:group-name")}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: t("GroupForm:group-description-is-required") }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              onChangeText={onChange}
              value={value}
              placeholder={t("GroupForm:group-description-placeholder")}
              label={t("GroupForm:group-description")}
              errorMessage={error?.message}
            />
          )}
        />
        <Button
          title={isEdit ? t("Common:edit") : t("Common:create")}
          containerStyle={styles.button}
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
}));

GroupForm.displayName = "GroupForm";

export default GroupForm;
