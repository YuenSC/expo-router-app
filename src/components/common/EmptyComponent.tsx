import { Text, makeStyles } from "@rneui/themed";
import LottieView from "lottie-react-native";
import { memo } from "react";
import { View } from "react-native";

type IEmptyComponentProps = {
  emptyText?: string;
};

const EmptyComponent = memo<IEmptyComponentProps>(({ emptyText }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        style={styles.emptyLottie}
        source={require("@/src/assets/lottie/empty.json")}
      />
      {emptyText && <Text style={styles.emptyText}>{emptyText}</Text>}
    </View>
  );
});

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  emptyLottie: {
    width: "100%",
    aspectRatio: 1,
    marginTop: -32,
  },
  emptyText: {
    textAlign: "center",
    color: theme.colors.grey2,
    marginTop: -16,
  },
}));

EmptyComponent.displayName = "EmptyComponent";

export default EmptyComponent;
