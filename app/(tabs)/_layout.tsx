import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Abou`theBarber",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="face.smiling.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.pages.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: "My Appointments",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="list.bullet.clipboard.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "logout",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="circle.badge.xmark.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{ title: "Admin", headerShown: true }}
      />
    </Tabs>
  );
}
