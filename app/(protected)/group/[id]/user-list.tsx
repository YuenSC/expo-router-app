import { makeStyles } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";

import UserListForm from "@/src/components/User/UserList/UserListForm";
import StyledKeyboardAvoidingView from "@/src/components/common/StyledKeyboardAvoidingView";

const Page = () => {
  const styles = useStyles();
  const { id: groupId } = useLocalSearchParams<{ id: string }>();

  return (
    <StyledKeyboardAvoidingView style={styles.container}>
      <UserListForm groupId={groupId} />
    </StyledKeyboardAvoidingView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
}));

export default Page;
