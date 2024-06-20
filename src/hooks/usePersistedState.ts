import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const usePersistedState = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T | null>(null);
  const { getItem, setItem } = useAsyncStorage(key);

  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item ? JSON.parse(item) : defaultValue);
  };

  const writeItemToStorage = async (newValue: T) => {
    await setItem(JSON.stringify(newValue));
    setValue(newValue);
  };

  useEffect(() => {
    readItemFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, writeItemToStorage] as const;
};
