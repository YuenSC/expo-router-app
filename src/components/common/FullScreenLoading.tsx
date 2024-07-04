import { makeStyles, useTheme } from "@rneui/themed";
import { memo } from "react";
import { ActivityIndicator, View } from "react-native";

type IFullScreenLoadingProps = object;

const FullScreenLoading = memo<IFullScreenLoadingProps>(() => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    </View>
  );
});

const useStyles = makeStyles((theme) => ({
  background: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  container: {
    backgroundColor: theme.colors.modal,
    borderRadius: 10, // Optional: if you want rounded corners
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
  },
}));

FullScreenLoading.displayName = "FullScreenLoading";

export default FullScreenLoading;
