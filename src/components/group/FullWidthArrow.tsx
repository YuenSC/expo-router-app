import { AntDesign } from "@expo/vector-icons";
import { makeStyles, useTheme } from "@rneui/themed";
import { memo } from "react";
import { View } from "react-native";

type IFullWidthArrowProps = object;

const FullWidthArrow = memo<IFullWidthArrowProps>(() => {
  const { theme } = useTheme();
  const lineColor = theme.colors.divider;
  const styles = useStyles(lineColor);

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <AntDesign
        name="right"
        size={24}
        color={lineColor}
        style={styles.arrow}
      />
    </View>
  );
});

const useStyles = makeStyles((theme, lineColor: string) => ({
  container: {
    height: 24,
    justifyContent: "center",
  },
  line: {
    height: 2,
    backgroundColor: lineColor,
  },
  arrow: {
    position: "absolute",
    top: 0,
    right: -7,
  },
}));

FullWidthArrow.displayName = "FullWidthArrow";

export default FullWidthArrow;
