import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { makeStyles } from "@rneui/themed";
import {
  ComponentProps,
  forwardRef,
  PropsWithChildren,
  useCallback,
} from "react";
import { StyleSheet } from "react-native";
import { FullWindowOverlay } from "react-native-screens";

type IStyledBottomSheetProps = ComponentProps<typeof BottomSheetModal> & {
  backdropProps?: Partial<ComponentProps<typeof BottomSheetBackdrop>>;
};

const StyledBottomSheetModal = forwardRef<
  BottomSheetModal,
  IStyledBottomSheetProps
>(({ children, backdropProps, ...props }, ref) => {
  const styles = useStyles();

  const renderContainerComponent = useCallback(
    ({ children }: PropsWithChildren) => (
      <FullWindowOverlay>{children}</FullWindowOverlay>
    ),
    [],
  );

  return (
    <BottomSheetModal
      {...props}
      ref={ref}
      containerComponent={renderContainerComponent}
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
    </BottomSheetModal>
  );
});

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

StyledBottomSheetModal.displayName = "StyledBottomSheetModal";

export default StyledBottomSheetModal;
