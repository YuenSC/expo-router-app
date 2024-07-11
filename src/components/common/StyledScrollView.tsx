import { memo } from "react";
// eslint-disable-next-line no-restricted-imports
import { ScrollView, ScrollViewProps } from "react-native";

type IStyledScrollViewProps = ScrollViewProps;

const StyledScrollView = memo<IStyledScrollViewProps>((props) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      {...props}
    />
  );
});

StyledScrollView.displayName = "StyledScrollView";

export default StyledScrollView;
