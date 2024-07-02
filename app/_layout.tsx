import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider, useTheme } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { useFonts } from "expo-font";
import {
  Stack,
  useGlobalSearchParams,
  usePathname,
  useRouter,
  useSegments,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { FullWindowOverlay } from "react-native-screens";
import Toast from "react-native-toast-message";

import { setAxiosToken } from "@/src/api/axios";
import { useGetMe } from "@/src/api/hooks/useGetMe";
import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import "@/src/i18n";
import theme from "@/src/styles/rneui";
import { toastConfig } from "@/src/styles/toastConfig";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      retry: (failureCount, error) => {
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

        Toast.show({
          type: "error",
          text1: "Api Error",
          text2: message,
          topOffset: 64,
          autoHide: false,
        });
      },
    },
  },
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const StackLayout = () => {
  const { authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { data: user } = useGetMe();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";

    // 1. if in protected page, check if token exists, if no, redirect to login
    if (inAuthGroup) {
      if (authState.token === null) router.replace("/");
      return;
    }

    // 2. if in public page, check if token exists, if yes, redirect to home
    // 2.1. After login or sign up, me api will be refetch, trigger user object update and then redirect to home
    if (authState.token !== null && !!user) {
      setAxiosToken(authState.token);
      if (router.canDismiss()) router.dismissAll();
      router.replace(user?.isOnboardingCompleted ? "/home" : "/onboarding/0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.token, user]);

  return (
    <Stack
      initialRouteName="welcome"
      screenOptions={{
        headerShown: false,
        headerBackTitle: "Back",
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.black,
        },
      }}
    >
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          title: t("common:login"),
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: true,
          title: t("common:sign-up"),
          presentation: "modal",
        }}
      />
      <Stack.Screen name="(protected)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default function RootLayout() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  useReactQueryDevTools(queryClient);

  const [loaded] = useFonts({
    SpaceMono: require("../src/assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Track the location in your analytics provider here.
  useEffect(() => {
    console.log("Location changed", pathname, params);
  }, [pathname, params]);

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
      <AuthProvider>
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
      </AuthProvider>
    </QueryClientProvider>
  );
}
