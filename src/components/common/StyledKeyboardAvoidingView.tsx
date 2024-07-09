import { makeStyles } from "@rneui/themed";
import { memo } from "react";
import { KeyboardAvoidingView, KeyboardAvoidingViewProps } from "react-native";

type IStyledKeyboardAvoidingViewProps = KeyboardAvoidingViewProps;

const StyledKeyboardAvoidingView = memo<IStyledKeyboardAvoidingViewProps>(
  ({ style, ...props }) => {
    const styles = useStyles();

    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={100}
        {...props}
        style={[styles.container, style]}
      />
    );
  },
);

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

StyledKeyboardAvoidingView.displayName = "StyledKeyboardAvoidingView";

export default StyledKeyboardAvoidingView;
