import { PropsWithChildren } from "react";

import { AppProvider } from "./AppContext";
import { AuthProvider } from "./AuthContext";

const ContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <AppProvider>{children}</AppProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
