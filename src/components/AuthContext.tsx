import useSecureStore from "@/src/hooks/useSecureStore";
import { PostLoginPayload } from "@/src/api/types/Login";
import { usePostLogin } from "@/src/api/usePostLogin";
import Config from "@/src/Config";
import { createContext, useContext } from "react";
import { Alert } from "react-native";

interface AuthProps {
  onLogin: (payload: PostLoginPayload) => void;
  onLogout: () => void;
  authState: {
    token: string | null;
    isPending: boolean;
  };
}

const authContext = createContext<AuthProps>({
  onLogin: () => {},
  onLogout: () => {},
  authState: {
    token: null,
    isPending: false,
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
  const { mutate: postLogin, isPending } = usePostLogin({
    onSuccess: ({ data }) => {
      setToken(data.access_token);
    },
    onError: (error) => {
      Alert.alert("Login failed", error.message + Config.apiUrl);
    },
  });

  const onLogin = (payload: PostLoginPayload) => {
    postLogin(payload);
  };

  const onLogout = () => {
    setToken(null);
  };

  return (
    <authContext.Provider
      value={{ onLogin, onLogout, authState: { token, isPending } }}
    >
      {children}
    </authContext.Provider>
  );
};
