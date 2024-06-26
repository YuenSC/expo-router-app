import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { makeStyles } from "@rneui/themed";
import { ComponentProps, forwardRef } from "react";
import { StyleSheet } from "react-native";

type IStyledBottomSheetProps = ComponentProps<typeof BottomSheet> & {
  backdropProps?: Partial<ComponentProps<typeof BottomSheetBackdrop>>;
};

const StyledBottomSheet = forwardRef<BottomSheet, IStyledBottomSheetProps>(
  ({ children, backdropProps, ...props }, ref) => {
    const styles = useStyles();

    return (
      <BottomSheet
        {...props}
        ref={ref}
        containerStyle={[props.containerStyle]}
        backgroundStyle={[styles.background, props.backgroundStyle]}
        handleIndicatorStyle={[
          styles.handleIndicator,
          props.handleIndicatorStyle,
        ]}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            enableTouchThrough={false}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            style={[styles.backdrop, StyleSheet.absoluteFillObject]}
            {...backdropProps}
          />
        )}
      >
        {children}
      </BottomSheet>
    );
  },
);

const useStyles = makeStyles((theme) => ({
  backdrop: {
    backgroundColor: theme.colors.backdrop,
  },
  background: {
    backgroundColor: theme.colors.modal,
  },
  handleIndicator: {
    backgroundColor: theme.colors.black,
  },
}));

StyledBottomSheet.displayName = "StyledBottomSheet";

export default StyledBottomSheet;
