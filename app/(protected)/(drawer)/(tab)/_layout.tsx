import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

import BottomTabBar from "@/src/components/bottomTab/BottomTabBar";
import BottomTabHeader from "@/src/components/bottomTab/BottomTabHeader";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={() => ({
        header: (props) => <BottomTabHeader {...props} />,
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
