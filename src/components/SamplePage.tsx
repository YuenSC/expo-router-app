import { makeStyles, Text } from "@rneui/themed";
import { SafeAreaView } from "react-native";

const Page = () => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Page</Text>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default Page;
