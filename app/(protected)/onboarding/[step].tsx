import { makeStyles } from "@rneui/themed";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  ScrollView,
  ScrollViewProps,
} from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import { useGetGroupList } from "@/src/api/hooks/group/useGetGroupList";
import { usePatchGroupUpdate } from "@/src/api/hooks/group/usePatchGroupUpdate";
import { usePostGroupCreate } from "@/src/api/hooks/group/usePostGroupCreate";
import { useGetMe } from "@/src/api/hooks/useGetMe";
import { usePatchUserUpdate } from "@/src/api/hooks/user/usePatchUserUpdate";
import UserForm from "@/src/components/User/UserForm/UserForm";
import UserListForm from "@/src/components/User/UserList/UserListForm";
import GroupForm from "@/src/components/group/GroupForm";

const scrollViewProps = {
  keyboardDismissMode: "on-drag",
  keyboardShouldPersistTaps: "always",
  contentContainerStyle: { flex: 1 },
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
    navigation.setOptions({
      headerShown: step !== 0,
      headerTitle: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      {step === 0 && (
        <ScrollView style={styles.container} {...scrollViewProps}>
          <UserForm
            style={styles.contentContainer}
            submitButtonText={t("Common:next")}
            user={user}
            isSubmitting={isPendingPatchUserUpdate}
            onSubmit={(values) =>
              patchUserUpdate({ ...values, id: user?.id || "" })
            }
          />
        </ScrollView>
      )}

      {step === 1 && (
        <ScrollView style={styles.container} {...scrollViewProps}>
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
        </ScrollView>
      )}

      {step === 2 && (
        <UserListForm
          groupId={groupId}
          buttonText={t("Common:done")}
          onSubmit={() => router.push("/onboarding/success")}
        />
      )}
    </KeyboardAvoidingView>
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
  },
  contentContainer: {
    paddingTop: insets.top + 24,
  },
}));

export default OnboardingPage;
