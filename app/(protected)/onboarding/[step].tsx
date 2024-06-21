import { makeStyles } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import { useGetMe } from "@/src/api/hooks/useGetMe";
import { usePatchUserUpdate } from "@/src/api/hooks/usePatchUserUpdate";
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
  const { data: user } = useGetMe();

  const { mutateAsync: patchUserUpdate } = usePatchUserUpdate({});

  return (
    <View style={styles.container}>
      {step === 0 && (
        <UserForm
          style={styles.contentContainer}
          submitButtonText={t("Common:next")}
          isEdit={false}
          user={user}
          onSubmit={async (values) => {
            if (user?.id) await patchUserUpdate({ ...values, id: user.id });
          }}
        />
      )}
      {/* {step === 1 && (
        <GroupForm
          groupId={undefined}
          onSubmit={(values) => {
            // TODO: Use Create Group Api
          }}
        />
      )}
      {step === 2 && (
        <UserListForm
          onSubmit={(users) => {
            // TODO Use Add Users to Group Api
          }}
        />
      )} */}
    </View>
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
