import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Button, makeStyles, Text } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import StyledBottomSheetModal from "../common/StyledBottomSheetModal";
import StyledBottomSheetView from "../common/StyledBottomSheetView";

import { useDeleteExpense } from "@/src/api/hooks/expense/useDeleteExpense";
import { useBottomSheetModalImperativeHandle } from "@/src/hooks/useBottomSheetModalImperativeHandle";

type IExpenseDeleteBottomSheetModalProps = {
  expenseId: string;
  groupId: string;
};

const ExpenseDeleteBottomSheetModal = forwardRef<
  BottomSheetModal,
  IExpenseDeleteBottomSheetModalProps
>(({ expenseId, groupId }, ref) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { mutate, isPending } = useDeleteExpense({
    onSuccess: () => {
      bottomSheetModalRef.current?.dismiss();
      queryClient.invalidateQueries({ queryKey: ["useGetExpenseList"] });
      router.back();
    },
  });

  useBottomSheetModalImperativeHandle(ref, bottomSheetModalRef);

  return (
    <StyledBottomSheetModal
      enablePanDownToClose
      enableDynamicSizing
      ref={bottomSheetModalRef}
    >
      <StyledBottomSheetView style={styles.bottomSheetContainer}>
        <Text style={styles.title}>
          {t(
            "ExpenseDeleteBottomSheetModal:are-you-sure-you-want-to-delete-this-expense",
          )}
        </Text>
        <Button onPress={() => bottomSheetModalRef.current?.dismiss()}>
          {t("Common:cancel")}
        </Button>
        <Button
          type="clear"
          color="error"
          loading={isPending}
          onPress={() => mutate({ groupId, id: expenseId })}
        >
          {t("Common:delete")}
        </Button>
      </StyledBottomSheetView>
    </StyledBottomSheetModal>
  );
});

const useStyles = makeStyles((theme, insets: EdgeInsets) => ({
  bottomSheetContainer: {
    flex: 0,
    minHeight: 100,
    padding: 16,
    paddingBottom: insets.bottom,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "bold",
  },
}));

ExpenseDeleteBottomSheetModal.displayName = "ExpenseDeleteBottomSheetModal";

export default ExpenseDeleteBottomSheetModal;
