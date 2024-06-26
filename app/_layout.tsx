import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider, useTheme } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { FullWindowOverlay } from "react-native-screens";
import Toast from "react-native-toast-message";

import { setAxiosToken } from "@/src/api/axios";
import { AuthProvider, useAuth } from "@/src/components/AuthContext";
import "@/src/i18n";
import theme from "@/src/styles/rneui";
import { toastConfig } from "@/src/styles/toastConfig";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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

  useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";
    if (authState.token === null && inAuthGroup) {
      router.replace("/");
    } else if (authState.token !== null) {
      setAxiosToken(authState.token);
      if (router.canDismiss()) router.dismissAll();
      router.replace(
        authState?.user?.isOnboardingCompleted ? "/home" : "/onboarding/0",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.token]);

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
