import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

import { removeAxiosToken, setAxiosToken } from "../api/axios";
import { usePostSignUp } from "../api/hooks/usePostSignUp";
import { PostSignUpPayload } from "../api/types/SignUp";

import { usePostLogin } from "@/src/api/hooks/usePostLogin";
import { PostLoginPayload } from "@/src/api/types/Login";
import useSecureStore from "@/src/hooks/useSecureStore";

interface AuthProps {
  onLogin: (payload: PostLoginPayload) => void;
  onLogout: () => void;
  onSignUp: (payload: PostSignUpPayload) => void;
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
  onSignUp: () => {},
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
  const queryClient = useQueryClient();

  // Token Related
  const [token, setToken] = useSecureStore("access_token", {
    sync: true,
    onSuccess: (token) => {
      console.log("Reset Token in useSecureStore");
      if (token) setAxiosToken(token);
    },
  });
  console.log("token", token);
  const [localPassword, setLocalPassword] = useSecureStore("password", {
    sync: true,
  });
  const [localEmail, setLocalEmail] = useSecureStore("email", { sync: true });
  const [error, setError] = useState("");

  const { mutate: postLogin, isPending: isPendingLogin } = usePostLogin({
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      setToken(data.access_token);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const { mutate: postSignUp, isPending: isPendingSignUp } = usePostSignUp({
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
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

  const onSignUp = (payload: PostSignUpPayload) => {
    postSignUp(payload);
  };

  const onLogout = () => {
    setToken(null);
    removeAxiosToken();
  };

  return (
    <authContext.Provider
      value={{
        onLogin,
        onLogout,
        onSignUp,
        authState: {
          token,
          isPending: isPendingLogin || isPendingSignUp,
          error,
        },
        localCredential: { email: localEmail, password: localPassword },
      }}
    >
      {children}
    </authContext.Provider>
  );
};
