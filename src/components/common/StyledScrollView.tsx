import { useTheme } from "@rneui/themed";
import * as Haptics from "expo-haptics";
import { memo, useState } from "react";
// eslint-disable-next-line no-restricted-imports
import { ScrollView, ScrollViewProps } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

type IStyledScrollViewProps = ScrollViewProps & {
  refetch?: () => Promise<any>;
};

const StyledScrollView = memo<IStyledScrollViewProps>(
  ({ refetch, ...props }) => {
    const { theme } = useTheme();
    const [isRefreshing, setIsRefreshing] = useState(false);

    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
        {...props}
        refreshControl={
          refetch && (
            <RefreshControl
              refreshing={!!isRefreshing}
              onRefresh={async () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                setIsRefreshing(true);
                await refetch();
                setIsRefreshing(false);
              }}
              tintColor={theme.colors.primary}
            />
          )
        }
      />
    );
  },
);

StyledScrollView.displayName = "StyledScrollView";

export default StyledScrollView;
