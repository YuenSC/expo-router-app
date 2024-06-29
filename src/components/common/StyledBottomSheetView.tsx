import { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";
import { makeStyles } from "@rneui/themed";
import { memo } from "react";

type IStyledBottomSheetViewProps = BottomSheetViewProps;

const StyledBottomSheetView = memo<IStyledBottomSheetViewProps>((props) => {
  const styles = useStyles();

  return (
    <BottomSheetView {...props} style={[styles.container, props?.style]} />
  );
});

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 0,
    minHeight: 100,
  },
}));

StyledBottomSheetView.displayName = "StyledBottomSheetView";

export default StyledBottomSheetView;
