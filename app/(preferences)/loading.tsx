import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Video } from 'expo-av';

export default function LoadingScreen() {

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500); // temps chargement (change si tu veux)

    return () => clearTimeout(t);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* VIDEO */}
        <Video
          source={require('@/assets/videos/ChargementVideo.mp4')} 
          style={styles.video}
          resizeMode="contain"
          shouldPlay
          isLooping
          isMuted
        />

        {/* TEXTE PRINCIPAL */}
        <Text style={styles.title}>Préparation de votre profil</Text>

        {/* CONSEIL BAS */}
        <Text style={styles.tip}>Conseil : N'oublie pas de faire une pause !</Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FEF1EA', // couleur demandée
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  video: {
    width: 550,   
    height: 550,
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2D1623',
    textAlign: 'center',
    marginTop: 10,
  },

  tip: {
    position: 'absolute',
    bottom: 40,
    fontSize: 14,
    color: '#2D1623',
    fontWeight: '500',
  },
});
