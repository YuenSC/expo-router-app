import { makeStyles } from "@rneui/themed";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollViewProps } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import { useGetGroupList } from "@/src/api/hooks/group/useGetGroupList";
import { usePatchGroupUpdate } from "@/src/api/hooks/group/usePatchGroupUpdate";
import { usePostGroupCreate } from "@/src/api/hooks/group/usePostGroupCreate";
import { useGetMe } from "@/src/api/hooks/useGetMe";
import { usePatchUserUpdate } from "@/src/api/hooks/user/usePatchUserUpdate";
import UserForm from "@/src/components/User/UserForm/UserForm";
import UserListForm from "@/src/components/User/UserList/UserListForm";
import BackButton from "@/src/components/common/BackButton";
import GroupForm from "@/src/components/group/GroupForm";

const scrollViewProps = {
  keyboardDismissMode: "on-drag",
  keyboardShouldPersistTaps: "always",
  contentContainerStyle: { flex: 1 },
  contentInsetAdjustmentBehavior: "automatic",
} satisfies ScrollViewProps;

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

  // Mutations
  const { mutate: patchUserUpdate, isPending: isPendingPatchUserUpdate } =
    usePatchUserUpdate({
      onSuccess: () => {
        refetchMe();
        router.push("/onboarding/1");
      },
    });
  const { mutate: postGroupCreate, isPending: isPendingPostGroupCreate } =
    usePostGroupCreate({
      onSuccess: ({ data: { id } }) => {
        router.push(`/onboarding/2?groupId=${id}`);
      },
    });
  const { mutate: patchGroupUpdate, isPending: isPendingPatchGroupUpdate } =
    usePatchGroupUpdate({
      onSuccess: ({ data: { id } }) => {
        router.push(`/onboarding/2?groupId=${id}`);
      },
    });

  useEffect(() => {
    const titleByStep = {
      0: t("UserForm:edit-member"),
      1: groups[0] ? groups[0].name : t("GroupForm:create-group"),
      2: t("UserListForm:members"),
    } as Record<number, string>;

    navigation.setOptions({
      headerTitle: titleByStep[step] || "",
      headerLeft: () => {
        if (step === 0) return null;
        return <BackButton />;
      },
    });
  }, [groups, navigation, step, t]);

  return (
    <>
      {step === 0 && (
        <KeyboardAwareScrollView style={styles.container} {...scrollViewProps}>
          <UserForm
            style={styles.contentContainer}
            submitButtonText={t("Common:next")}
            user={user}
            isSubmitting={isPendingPatchUserUpdate}
            onEdit={(values) =>
              patchUserUpdate({ ...values, id: user?.id || "" })
            }
          />
        </KeyboardAwareScrollView>
      )}

      {step === 1 && (
        <KeyboardAwareScrollView style={styles.container} {...scrollViewProps}>
          <GroupForm
            groupId={groups[0]?.id}
            isSubmitting={isPendingPostGroupCreate || isPendingPatchGroupUpdate}
            onSubmit={(values) => {
              if (!firstGroupCreatedByUser) {
                postGroupCreate(values);
              } else {
                patchGroupUpdate({
                  ...values,
                  id: firstGroupCreatedByUser.id,
                });
              }
            }}
          />
        </KeyboardAwareScrollView>
      )}

      {step === 2 && (
        <UserListForm
          groupId={groupId}
          buttonText={t("Common:done")}
          onSubmit={() => router.push("/onboarding/success")}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme, insets: EdgeInsets) => ({
  keyboardAvoidingView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    paddingTop: 12,
  },
}));

export default OnboardingPage;
