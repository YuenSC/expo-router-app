import { makeStyles } from "@rneui/themed";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import { useGetMe } from "@/src/api/hooks/useGetMe";
import { usePatchUserUpdate } from "@/src/api/hooks/usePatchUserUpdate";
import { usePostGroupCreate } from "@/src/api/hooks/usePostGroupCreate";
import GroupForm from "@/src/components/GroupForm";
import UserForm from "@/src/components/userForm/UserForm";

const OnboardingPage = () => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const { step: stepAsString = "0" } = useLocalSearchParams<{
    step: string;
    groupId?: string;
  }>();
  const step = parseInt(stepAsString, 10);
  const { t } = useTranslation();
  const {
    data: user,
    query: { refetch: refetchMe },
  } = useGetMe();

  const navigation = useNavigation();

  const { mutateAsync: patchUserUpdate } = usePatchUserUpdate({
    onSuccess: () => refetchMe(),
  });
  const { mutateAsync: postGroupCreate } = usePostGroupCreate({});

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
          groupId={undefined}
          onSubmit={(values) => {
            postGroupCreate(values).then(() => {
              router.push("/onboarding/2");
            });
          }}
        />
      )}
      {/* {step === 2 && (
        <UserListForm
          onSubmit={(users) => {
            // TODO Use Add Users to Group Api
          }}
        />
      )} */}
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
