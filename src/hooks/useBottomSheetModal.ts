import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";

export const useBottomSheetModal = <T>(defaultValue?: T) => {
  const ref = useRef<BottomSheetModal>(null);
  const [value, setValue] = useState<T | undefined>(defaultValue);

  const open = useCallback((newValue?: T) => {
    if (newValue !== undefined) {
      setValue(newValue);
    }
    ref.current?.present();
  }, []);

  const close = useCallback(() => {
    ref.current?.close();
    setValue(undefined); // Reset value when closing
  }, []);

  useEffect(() => {
    const currentRef = ref.current; // Copy ref.current to a variable
    return () => {
      currentRef?.close(); // Use the copied variable in the cleanup function
    };
  }, []);

  return { ref, open, close, value, setValue };
};
