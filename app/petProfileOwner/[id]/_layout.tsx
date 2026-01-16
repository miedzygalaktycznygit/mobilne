import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function PetProfileLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          height: 70,
          paddingBottom: 30,
          paddingTop: 5,
          paddingRight: 15,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <Feather name="info" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="medical"
        options={{
          title: "Historia medyczna",
          tabBarIcon: ({ color }) => (
            <Feather name="activity" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stays"
        options={{
          title: "Pobyty w Hotelu",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
