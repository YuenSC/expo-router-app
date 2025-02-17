import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider, useTheme } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { FullWindowOverlay } from "react-native-screens";
import Toast from "react-native-toast-message";

import { getMe } from "@/src/api/auth";
import { setAxiosToken } from "@/src/api/axios";
import { useAuth } from "@/src/context/AuthContext";
import ContextProvider from "@/src/context/ContextProvider";
import "@/src/i18n";
import { getDefaultStackOptions } from "@/src/styles/getDefaultStackOptions";
import theme from "@/src/styles/rneui";
import { toastConfig } from "@/src/styles/toastConfig";

const queryClient = new QueryClient({});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const StackLayout = () => {
  const { authState, onLogout } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { theme } = useTheme();
  const inAuthGroup = segments[0] === "(protected)";

  useEffect(() => {
    // 1. if in protected page, check if token exists, if no, redirect to login
    if (inAuthGroup) {
      if (authState.token === null) router.replace("/");
      return;
    }

    // 2. if in public page, check if token exists, if yes, redirect to home
    // 2.1. After login or sign up, me api will be refetch, trigger user object update and then redirect to home
    if (authState.token !== null) {
      setAxiosToken(authState.token);
      getMe()
        .then(({ data: user }) => {
          if (router.canDismiss()) router.dismissAll();
          router.replace(
            user?.isOnboardingCompleted ? "/home" : "/onboarding/0",
          );
        })
        .catch(() => {
          onLogout();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.token, inAuthGroup]);

  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        staleTime: 10000,
        retry: (failureCount, error) => {
          if (failureCount > 2) return false;

          if (axios.isAxiosError(error)) {
            return error.response?.status !== 401;
          }
          return false;
        },
      },
      mutations: {
        onError: (error) => {
          const message = axios.isAxiosError(error)
            ? error.response?.data.message
            : error.message;

          const status = axios.isAxiosError(error)
            ? error.response?.status
            : null;

          Toast.show({
            type: "error",
            text1: "Api Error",
            text2: message || "Timeout",
            topOffset: 64,
            visibilityTime: 4000,
          });

          if (inAuthGroup && status === 401) {
            onLogout();
          }
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inAuthGroup]);

  return (
    <Stack
      initialRouteName="welcome"
      screenOptions={getDefaultStackOptions(theme)}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen name="(protected)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  const [loaded] = useFonts({
    SpaceMono: require("../src/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <StackLayout />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
          <FullWindowOverlay>
            <Toast config={toastConfig} />
          </FullWindowOverlay>
        </ThemeProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
}
