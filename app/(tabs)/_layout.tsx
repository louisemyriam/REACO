import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = {
    background: '#fff4ec',
    text: '#291425',
    tabBar: '#291425',
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor:"#291425",
          height: 75,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopColor:"#291425",
        },
        tabBarActiveTintColor:'#F5C542',
        tabBarInactiveTintColor:'#bd61A6',
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
