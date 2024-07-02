// useSecureStore.ts
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";

type UseSecureStoreReturn = [
  string | null, // The stored value or null if not found
  (value: string | null) => Promise<void>, // Function to save or delete a value
];

const useSecureStore = (
  key: string,
  options?: {
    sync?: boolean; // Option to use synchronous storage retrieval if needed
    onSuccess?: (value: string | null) => void;
  },
): UseSecureStoreReturn => {
  const [storedValue, setStoredValue] = useState<string | null>(null);

  // Function to save a value or delete it if null
  const saveOrDelete = async (value: string | null): Promise<void> => {
    try {
      if (value === null) {
        await SecureStore.deleteItemAsync(key);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
      setStoredValue(value); // Update local state regardless of operation
    } catch (error) {
      console.error("Failed to modify secure storage:", error);
      alert("Failed to save data securely. Please try again.");
    }
  };

  // Function to load the value from secure storage
  const load = async (): Promise<void> => {
    try {
      const value = options?.sync
        ? SecureStore.getItem(key)
        : await SecureStore.getItemAsync(key);
      options?.onSuccess?.(value);
      setStoredValue(value);
    } catch (error) {
      console.error("Failed to load data from secure storage:", error);
      alert("Failed to load data securely. Please try again.");
    }
  };

  // Load the stored value when the hook is first used
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]); // Re-run effect if key changes

  return [storedValue, saveOrDelete];
};

export default useSecureStore;
