import { Entypo } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { Fragment, memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

const BottomTabBar = memo<
  BottomTabBarProps & {
    groupId?: string;
  }
>(({ state, descriptors, insets, navigation, groupId }) => {
  const styles = useStyles(insets);
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const color = isFocused ? theme.colors.primary : theme.colors.grey2;

        return (
          <Fragment key={route.key}>
            {index === 2 && (
              <TouchableOpacity
                disabled={!groupId}
                style={[
                  styles.addPaymentButton,
                  !groupId && { backgroundColor: theme.colors.grey3 },
                ]}
                onPress={() => navigation.navigate("AddPayment", { groupId })}
              >
                <Entypo name="plus" size={40} color={theme.colors.white} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tabItem}
            >
              <View style={styles.iconContainer}>
                {options?.tabBarIcon?.({
                  color,
                  focused: isFocused,
                  size: 24,
                })}
              </View>
              <Text style={{ color }}>
                {(options?.tabBarLabel as string) || ""}
              </Text>
            </TouchableOpacity>
          </Fragment>
        );
      })}
    </View>
  );
});

const useStyles = makeStyles((theme, insets: EdgeInsets) => ({
  container: {
    backgroundColor: theme.colors.background,
    flexDirection: "row",
    borderTopColor: theme.colors.grey5,
    borderTopWidth: 1,
    paddingBottom: Math.max(16, insets.bottom),
  },
  tabItem: { flex: 1, alignItems: "center", paddingTop: 12 },
  iconContainer: { width: 24, height: 24, marginBottom: 4 },
  addPaymentButton: {
    backgroundColor: theme.colors.primary,
    width: 56,
    height: 56,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    top: -12,
  },
}));

BottomTabBar.displayName = "BottomTabBar";

export default BottomTabBar;
