import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useLayoutEffect, useState } from "react";

export const usePersistedState = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(defaultValue);
  const { getItem, setItem, removeItem } = useAsyncStorage(key);

  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item ? JSON.parse(item) : defaultValue);
  };

  const writeItemToStorage = (newValue: T) => {
    setValue(newValue);
    if (newValue) {
      setItem(JSON.stringify(newValue));
    } else {
      removeItem();
    }
  };

  useLayoutEffect(() => {
    readItemFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, writeItemToStorage] as const;
};
