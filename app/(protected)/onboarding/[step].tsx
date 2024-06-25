import { makeStyles } from "@rneui/themed";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import { useGetGroup } from "@/src/api/hooks/useGetGroup";
import { useGetGroupList } from "@/src/api/hooks/useGetGroupList";
import { useGetMe } from "@/src/api/hooks/useGetMe";
import { usePatchGroupUpdate } from "@/src/api/hooks/usePatchGroupUpdate";
import { usePatchUserUpdate } from "@/src/api/hooks/usePatchUserUpdate";
import { usePostGroupCreate } from "@/src/api/hooks/usePostGroupCreate";
import GroupForm from "@/src/components/GroupForm";
import UserListForm from "@/src/components/UserListForm";
import UserForm from "@/src/components/userForm/UserForm";

//TODO: Use only one post api to create user, group, and add users to group
//to prevent creating duplicate stuff if user stop the onboarding process
const OnboardingPage = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const styles = useStyles(insets);
  const { step: stepAsString = "0", groupId } = useLocalSearchParams<{
    step: string;
    groupId?: string;
  }>();
  const step = parseInt(stepAsString, 10);

  // Fetch Data
  const {
    data: user,
    query: { refetch: refetchMe },
  } = useGetMe();
  const { data: groups } = useGetGroupList({ page: 1, pageSize: 10 });
  const firstGroupCreatedByUser = groups[0];
  const { data: group } = useGetGroup(
    { id: groupId || "" },
    { enabled: !!groupId },
  );

  // Mutations
  const { mutateAsync: patchUserUpdate } = usePatchUserUpdate({
    onSuccess: () => refetchMe(),
  });
  const { mutateAsync: postGroupCreate } = usePostGroupCreate({});
  const { mutateAsync: patchGroupUpdate } = usePatchGroupUpdate({});

  useEffect(() => {
    navigation.setOptions({
      headerShown: step !== 0,
      headerTitle: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <ScrollView
      style={styles.container}
      keyboardDismissMode="on-drag"
      contentContainerStyle={{ flex: 1 }}
    >
      {step === 0 && (
        <UserForm
          style={styles.contentContainer}
          submitButtonText={t("Common:next")}
          user={user}
          onSubmit={async (values) => {
            if (!user?.id) return;
            await patchUserUpdate({ ...values, id: user.id }).then(() => {
              router.push("/onboarding/1");
            });
          }}
        />
      )}

      {step === 1 && (
        <GroupForm
          groupId={groups[0]?.id}
          onSubmit={(values) => {
            if (!firstGroupCreatedByUser)
              postGroupCreate(values).then(({ data: group }) => {
                router.push(`/onboarding/2?groupId=${group.id}`);
              });
            else {
              patchGroupUpdate({
                ...values,
                id: firstGroupCreatedByUser.id,
              }).then(() => {
                router.push(
                  `/onboarding/2?groupId=${firstGroupCreatedByUser.id}`,
                );
              });
            }
          }}
        />
      )}
      {step === 2 && (
        <UserListForm
          group={group}
          buttonText={t("Common:done")}
          onSubmit={(users) => {}}
        />
      )}
    </ScrollView>
  );
};

const useStyles = makeStyles((theme, insets: EdgeInsets) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    paddingTop: insets.top + 24,
  },
}));

export default OnboardingPage;
