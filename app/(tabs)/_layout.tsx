import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor:"#0b0b0b",
          height: 75,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopColor:"202020",
        },
        tabBarActiveTintColor:'#F5C542',
        tabBarInactiveTintColor:'#8c8c8c',
        tabBarLabelStyle:{fontSize:12,},
        tabBarButton: HapticTab,
       
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Acceuil',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="fildactualite"
        options={{
          title: 'Communaute',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person-outline" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="bibliotheque"
        options={{
          title: 'Bibliothèque',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="book-outline" color={color} />,
        }}
        />

    <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person-outline" color={color} />,
        }}
      />
  
    </Tabs>
  );
}
