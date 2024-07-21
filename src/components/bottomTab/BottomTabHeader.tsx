import { Ionicons } from "@expo/vector-icons";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { DrawerActions } from "@react-navigation/native";
import { makeStyles, useTheme } from "@rneui/themed";
import { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import { HStack } from "../common/Stack";

const BottomTabHeader = memo<BottomTabHeaderProps>(
  ({ layout, navigation, options: { headerTitle, headerShown }, route }) => {
    const insets = useSafeAreaInsets();
    const styles = useStyles(insets);
    const { theme } = useTheme();
    const title =
      typeof headerTitle === "string" && headerTitle ? headerTitle : "";

    const titleStyles = useAnimatedStyle(() => {
      if (headerShown === false)
        return {
          opacity: 0,
        };

      return {
        opacity: withTiming(title ? 1 : 0, { duration: 200 }),
      };
    });

    return (
      <HStack style={styles.container}>
        <TouchableOpacity
          style={styles.headerLeftContainer}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
        >
          <Ionicons name="menu" size={24} color={theme.colors.black} />
        </TouchableOpacity>
        <Animated.Text style={[styles.title, titleStyles]}>
          {title}
        </Animated.Text>
        <View style={styles.headerLeftContainer} />
      </HStack>
    );
  },
);

const useStyles = makeStyles((theme, insets: EdgeInsets) => ({
  container: {
    backgroundColor: theme.colors.background,
    flexDirection: "row",
    borderTopColor: theme.colors.grey5,
    borderTopWidth: 1,
    paddingTop: insets.top + 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    color: theme.colors.black,
    fontSize: 18,
    fontWeight: "bold",
  },
  headerLeftContainer: {
    minWidth: 32,
  },
}));

BottomTabHeader.displayName = "BottomTabHeader";

export default BottomTabHeader;
