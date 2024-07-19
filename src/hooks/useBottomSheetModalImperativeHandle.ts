import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ForwardedRef, RefObject, useImperativeHandle } from "react";

export const useBottomSheetModalImperativeHandle = (
  ref: ForwardedRef<BottomSheetModalMethods>,
  bottomSheetRef: RefObject<BottomSheetModalMethods>,
) => {
  useImperativeHandle(ref, () => ({
    close: () => {
      bottomSheetRef.current?.close();
    },
    collapse: () => {
      bottomSheetRef.current?.collapse();
    },
    dismiss: () => {
      bottomSheetRef.current?.dismiss();
    },
    expand: () => {
      bottomSheetRef.current?.expand();
    },
    forceClose: () => {
      bottomSheetRef.current?.forceClose();
    },
    present: () => {
      bottomSheetRef.current?.present();
    },
    snapToIndex: (index: number) => {
      bottomSheetRef.current?.snapToIndex(index);
    },
    snapToPosition: (position: number | string) => {
      bottomSheetRef.current?.snapToPosition(position);
    },
  }));
};
