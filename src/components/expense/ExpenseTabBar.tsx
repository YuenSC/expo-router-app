import { Text, makeStyles } from "@rneui/themed";
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
} from "react-native-tab-view";

type IExpenseTabBarProps = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string;
    title: string;
  }>;
};

const ExpenseTabBar = (props: IExpenseTabBarProps) => {
  const styles = useStyles();

  return (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      renderLabel={({ route, focused }) => (
        <Text style={[focused && styles.tabBarLabel]}>{route.title}</Text>
      )}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  tabBar: {
    backgroundColor: theme.colors.background,
  },
  tabIndicator: {
    backgroundColor: theme.colors.primary,
  },
  tabBarLabel: {
    fontWeight: "bold",
  },
}));

export default ExpenseTabBar;
