import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Button, useTheme } from "@rneui/themed";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

import { useGetMe } from "@/src/api/hooks/useGetMe";
import { usePatchUserUpdate } from "@/src/api/hooks/user/usePatchUserUpdate";
import BottomTabBar from "@/src/components/bottomTab/BottomTabBar";
import { HStack } from "@/src/components/common/Stack";
import { useAuth } from "@/src/context/AuthContext";

export default function TabLayout() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { data: me } = useGetMe();
  const queryClient = useQueryClient();
  const { mutate } = usePatchUserUpdate({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
  const { onLogout } = useAuth();

  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        headerTitle: "",
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerShadowVisible: false,
        headerTintColor: theme.colors.black,
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 16 }}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
          >
            <Ionicons name="menu" size={24} color={theme.colors.black} />
          </TouchableOpacity>
        ),

        headerRight: () => {
          return (
            <HStack>
              <Button onPress={onLogout}>
                {t("BottomTabNavigator:logout")}
              </Button>
              <Button
                icon={<AntDesign name="edit" size={24} color="black" />}
                onPress={() =>
                  mutate({ id: me?.id || "", isOnboardingCompleted: false })
                }
              />
            </HStack>
          );
        },
      })}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          tabBarLabel: t("BottomTabNavigator:home"),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="payment" size={24} color={color} />
          ),
          tabBarLabel: t("BottomTabNavigator:payment"),
        }}
      />
      <Tabs.Screen
        name="statistic"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart" size={24} color={color} />
          ),
          tabBarLabel: t("BottomTabNavigator:stats"),
        }}
      />
      <Tabs.Screen
        name="options"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="options" size={24} color={color} />
          ),
          tabBarLabel: t("BottomTabNavigator:options"),
        }}
      />
    </Tabs>
  );
}
