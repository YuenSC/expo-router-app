import { makeStyles } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

import { useDeleteUserInGroup } from "@/src/api/hooks/group/useDeleteUserInGroup";
import { useGetUser } from "@/src/api/hooks/user/useGetUser";
import { usePatchUserUpdate } from "@/src/api/hooks/user/usePatchUserUpdate";
import UserForm from "@/src/components/User/UserForm/UserForm";

const UserUpdateBottomSheet = () => {
  const router = useRouter();
  const styles = useStyles();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { id, groupId } = useLocalSearchParams<{
    id: string;
    groupId: string;
  }>();

  const { data: user } = useGetUser({ id: id || "" });

  const { mutate: patchUserUpdate, isPending } = usePatchUserUpdate({
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({
        queryKey: ["user", user?.id],
      });
    },
  });
  const { mutate: deleteUserInGroup } = useDeleteUserInGroup({
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({
        queryKey: ["group", groupId],
      });
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <UserForm
          isEdit
          user={user}
          submitButtonText={t("Common:edit")}
          isSubmitting={isPending}
          onEdit={(values) =>
            patchUserUpdate({ ...values, id: user?.id || "" })
          }
          onDelete={
            groupId && id
              ? () => deleteUserInGroup({ userId: id || "", groupId })
              : undefined
          }
          isHideTitle
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: 8,
    paddingVertical: 16,
  },
}));

export default UserUpdateBottomSheet;
