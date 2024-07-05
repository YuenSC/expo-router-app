import { Entypo } from "@expo/vector-icons";
import { makeStyles, useTheme } from "@rneui/themed";
import { useRouter } from "expo-router";
import { memo } from "react";
import { TouchableOpacity } from "react-native";

type IBackButtonProps = object;

const BackButton = memo<IBackButtonProps>(() => {
  const styles = useStyles();
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        }
      }}
    >
      <Entypo
        name="chevron-small-left"
        size={32}
        color={theme.colors.primary}
      />
    </TouchableOpacity>
  );
});

const useStyles = makeStyles((theme) => ({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.modal,
  },
}));

BackButton.displayName = "BackButton";

export default BackButton;
