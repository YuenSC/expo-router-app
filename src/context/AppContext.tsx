import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react";

import { usePersistedState } from "../hooks/usePersistedState";

interface AppContextType {
  currentGroupId: string | null;
  setCurrentGroupId: (groupId: string | null) => void;
  suggestedCurrencyCodes: string[];
  addSuggestionsCurrencyCode: (currencyCode: string) => void;
  removeSuggestionsCurrencyCode: (currencyCode: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [currentGroupId, setCurrentGroupId] = usePersistedState<string | null>(
    "current-group-id",
    null,
  );

  const [suggestedCurrencyCodes, setSuggestionsCurrencyCodes] =
    usePersistedState<string[]>("suggested-currency-codes", []);

  const addSuggestionsCurrencyCode = useCallback(
    (currencyCode: string) => {
      const newValue = suggestedCurrencyCodes.includes(currencyCode)
        ? suggestedCurrencyCodes
        : [...suggestedCurrencyCodes, currencyCode];

      setSuggestionsCurrencyCodes(newValue);
    },
    [setSuggestionsCurrencyCodes, suggestedCurrencyCodes],
  );

  const removeSuggestionsCurrencyCode = useCallback(
    (currencyCode: string) => {
      setSuggestionsCurrencyCodes(
        suggestedCurrencyCodes.filter((item) => item !== currencyCode),
      );
    },
    [setSuggestionsCurrencyCodes, suggestedCurrencyCodes],
  );

  return (
    <AppContext.Provider
      value={{
        currentGroupId,
        setCurrentGroupId,
        suggestedCurrencyCodes: suggestedCurrencyCodes ?? [],
        addSuggestionsCurrencyCode,
        removeSuggestionsCurrencyCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
