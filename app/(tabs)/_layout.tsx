import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: '#BD61A6',
        tabBarInactiveTintColor: '#BD61A6',
        tabBarStyle: {
          position: 'absolute',
          left: 18,
          right: 18,
          bottom: 18,
          height: 60,
          backgroundColor: 'rgba(254, 246, 239, 0.96)',
          borderRadius: 999,
          borderTopWidth: 0,
          paddingTop: 10,
          paddingBottom: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowOffset: { width: 0, height: 6 },
          shadowRadius: 10,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => (
            <Ionicons size={26} name="home-outline" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="recherche"
        options={{
          title: 'Recherche',
          tabBarIcon: ({ color }) => (
            <Ionicons size={26} name="search-outline" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="fildactualite"
        options={{
          title: 'Communauté',
          tabBarIcon: ({ color }) => (
            <Ionicons size={26} name="people-outline" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="bibliotheque"
        options={{
          title: 'Bibliothèque',
          tabBarIcon: ({ color }) => (
            <Ionicons size={26} name="book-outline" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
            <Ionicons size={26} name="person-circle-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}