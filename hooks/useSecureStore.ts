// useSecureStore.ts
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

type UseSecureStoreReturn = [
  string | null, // The stored value or null if not found
  (value: string | null) => Promise<void> // Function to save a value
];

const useSecureStore = (key: string): UseSecureStoreReturn => {
  const [storedValue, setStoredValue] = useState<string | null>(null);

  // Function to save a value
  const saveOrDelete = async (value: string | null): Promise<void> => {
    if (value === null) {
      await SecureStore.deleteItemAsync(key);
      setStoredValue(null);
      return;
    }

    try {
      await SecureStore.setItemAsync(key, value);
      setStoredValue(value);
    } catch (error) {
      alert("Failed to save data securely. Please try again.");
    }
  };

  // Function to load the value
  const load = async (): Promise<void> => {
    try {
      const value = await SecureStore.getItemAsync(key);
      setStoredValue(value);
    } catch (error) {
      alert("Failed to load data securely. Please try again.");
    }
  };

  // Load the value when the hook is first used
  useEffect(() => {
    load();
  }, []);

  return [storedValue, saveOrDelete];
};

export default useSecureStore;
