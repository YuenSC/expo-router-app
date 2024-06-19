import "@/src/api/axios";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { ThemeProvider } from "@rneui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { AuthProvider, useAuth } from "@/src/components/AuthContext";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import "@/src/i18n";
import theme from "@/src/styles/rneui";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const StackLayout = () => {
  const { authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";
    if (authState.token === null && inAuthGroup) {
      router.replace("/");
    } else if (authState.token !== null) {
      router.replace("/onboarding");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.token]);

  return (
    <Stack initialRouteName="welcome">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  const colorScheme = useColorScheme();
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
          <StackLayout />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
