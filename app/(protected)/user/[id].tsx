import { makeStyles, Text } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

import { useDeleteUserInGroup } from "@/src/api/hooks/group/useDeleteUserInGroup";
import { useGetGroup } from "@/src/api/hooks/group/useGetGroup";
import { useGetMe } from "@/src/api/hooks/useGetMe";
import { useGetUser } from "@/src/api/hooks/user/useGetUser";
import { usePatchUserUpdate } from "@/src/api/hooks/user/usePatchUserUpdate";
import UserForm from "@/src/components/User/UserForm/UserForm";
import { VStack } from "@/src/components/common/Stack";
import StyledScrollView from "@/src/components/common/StyledScrollView";

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

  const { data: group } = useGetGroup({ id: groupId || "" });
  const { data: me } = useGetMe();

  const isGroupAdmin = group?.users?.find(
    ({ isAdmin, user }) => user.id === me?.id && isAdmin,
  );

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

  if (!id) {
    return (
      <VStack>
        <Text>Your selected user does not exist</Text>
      </VStack>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledScrollView style={styles.container}>
        <UserForm
          user={user}
          submitButtonText={t("Common:edit")}
          isSubmitting={isPending}
          onEdit={(values) =>
            patchUserUpdate({ ...values, id: user?.id || "" })
          }
          onDelete={
            groupId && isGroupAdmin
              ? () => deleteUserInGroup({ userId: id, groupId })
              : undefined
          }
        />
      </StyledScrollView>
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
