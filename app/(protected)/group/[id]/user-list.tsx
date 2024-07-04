import { makeStyles } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import UserListForm from "@/src/components/User/UserList/UserListForm";

const Page = () => {
  const styles = useStyles();
  const { id: groupId } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <UserListForm groupId={groupId} />
    </View>
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
