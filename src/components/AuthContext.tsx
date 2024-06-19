import { createContext, useContext, useState } from "react";

import { PostLoginPayload } from "@/src/api/types/Login";
import { usePostLogin } from "@/src/api/usePostLogin";
import useSecureStore from "@/src/hooks/useSecureStore";

interface AuthProps {
  onLogin: (payload: PostLoginPayload) => void;
  onLogout: () => void;
  authState: {
    token: string | null;
    isPending: boolean;
    error?: string;
  };
  localCredential: {
    email: string | null;
    password: string | null;
  };
}

const authContext = createContext<AuthProps>({
  onLogin: () => {},
  onLogout: () => {},
  authState: {
    token: null,
    isPending: false,
  },
  localCredential: {
    email: "",
    password: "",
  },
});

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useSecureStore("access_token", { sync: true });
  const [localPassword, setLocalPassword] = useSecureStore("password", {
    sync: true,
  });
  const [localEmail, setLocalEmail] = useSecureStore("email", { sync: true });
  const [error, setError] = useState("");

  const { mutate: postLogin, isPending } = usePostLogin({
    onSuccess: ({ data }) => {
      setToken(data.access_token);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onLogin = ({ rememberMe, ...payload }: PostLoginPayload) => {
    postLogin(payload);
    if (rememberMe) {
      setLocalEmail(payload.email);
      setLocalPassword(payload.password);
    } else {
      setLocalEmail(null);
      setLocalPassword(null);
    }
  };

  const onLogout = () => {
    setToken(null);
  };

  return (
    <authContext.Provider
      value={{
        onLogin,
        onLogout,
        authState: { token, isPending, error },
        localCredential: { email: localEmail, password: localPassword },
      }}
    >
      {children}
    </authContext.Provider>
  );
};
