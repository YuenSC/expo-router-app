import { createContext, PropsWithChildren, useContext } from "react";

import { usePersistedState } from "../hooks/usePersistedState";

interface AppContextType {
  currentGroupId: string | null;
  setCurrentGroupId: (groupId: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [currentGroupId, setCurrentGroupId] = usePersistedState<string | null>(
    "current-group-id",
    null,
  );

  return (
    <AppContext.Provider
      value={{
        currentGroupId,
        setCurrentGroupId,
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
