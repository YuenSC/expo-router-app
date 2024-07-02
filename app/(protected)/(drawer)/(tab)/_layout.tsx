import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useTheme } from "@rneui/themed";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

import BottomTabBar from "@/src/components/bottomTab/BottomTabBar";

export default function TabLayout() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        headerTitle: "",
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.black,
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 16 }}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
          >
            <Ionicons name="menu" size={24} color={theme.colors.black} />
          </TouchableOpacity>
        ),
      })}
      tabBar={(props) => <BottomTabBar groupId={undefined} {...props} />}
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
