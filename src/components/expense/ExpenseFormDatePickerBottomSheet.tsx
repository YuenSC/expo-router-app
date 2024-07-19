import { BottomSheetModal } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { makeStyles, useTheme } from "@rneui/themed";
import { forwardRef, useRef } from "react";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import StyledBottomSheetModal from "../common/StyledBottomSheetModal";
import StyledBottomSheetView from "../common/StyledBottomSheetView";

import { PostExpenseCreatePayload } from "@/src/api/types/Expense";
import { useBottomSheetModalImperativeHandle } from "@/src/hooks/useBottomSheetModalImperativeHandle";

type IExpenseFormDatePickerBottomSheetModalProps = {
  onClose: () => void;
};

const ExpenseFormDatePickerBottomSheetModal = forwardRef<
  BottomSheetModal,
  IExpenseFormDatePickerBottomSheetModalProps
>(({ onClose }, ref) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const { theme } = useTheme();
  const {
    i18n: { language },
  } = useTranslation();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {
    field: { value, onChange },
  } = useController<PostExpenseCreatePayload, "incurredOn">({
    name: "incurredOn",
    rules: { required: true },
  });

  useBottomSheetModalImperativeHandle(ref, bottomSheetModalRef);
  return (
    <StyledBottomSheetModal
      enablePanDownToClose
      enableDynamicSizing
      ref={bottomSheetModalRef}
      onChange={(index) => index === -1 && onClose()}
    >
      <StyledBottomSheetView style={styles.bottomSheetContainer}>
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="datetime"
          display="spinner"
          onChange={(event, date) => date && onChange(date.toISOString())}
          textColor={theme.colors.black}
          locale={language}
        />
      </StyledBottomSheetView>
    </StyledBottomSheetModal>
  );
});

const useStyles = makeStyles((theme, insets: EdgeInsets) => ({
  bottomSheetContainer: {
    flex: 0,
    minHeight: 100,
  },
}));

ExpenseFormDatePickerBottomSheetModal.displayName =
  "ExpenseFormDatePickerBottomSheetModal";

export default ExpenseFormDatePickerBottomSheetModal;
