import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/haptic-tab';
import { Image } from 'expo-image';

import HouseIcon from '../../assets/icons/House_02.svg';
import SearchIcon from '../../assets/icons/search-magnifying-glass.svg';
import UsersIcon from '../../assets/icons/users-group.svg';
import BookIcon from '../../assets/icons/book-open.svg';
import ProfileIcon from '../../assets/icons/User_Circle.svg';

function TabIcon({ source, color }: { source: any; color: string }) {
  return (
    <Image
      source={source}
      style={{
        width: 30,
        height: 30,
        tintColor: color,
      }}
      contentFit="contain"
    />
  );
}

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
            <TabIcon source={HouseIcon} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="recherche"
        options={{
          title: 'Recherche',
          tabBarIcon: ({ color }) => (
            <TabIcon source={SearchIcon} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="fildactualite"
        options={{
          title: 'Communauté',
          tabBarIcon: ({ color }) => (
            <TabIcon source={UsersIcon} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="bibliotheque"
        options={{
          title: 'Bibliothèque',
          tabBarIcon: ({ color }) => (
            <TabIcon source={BookIcon} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
            <TabIcon source={ProfileIcon} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}