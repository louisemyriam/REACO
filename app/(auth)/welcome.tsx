import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={['#FFF4EC', '#FEC271']} 
      style={styles.safe}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>

          {/* LOGO */}
          <Image
            source={require('@/assets/images/Logo.png')}
            style={styles.logoImage}
            contentFit="contain"
          />

          {/* BUTTONS */}
          <View style={styles.buttons}>
            {/* INSCRIPTION */}
            <Pressable
              style={[styles.btn, styles.btnPrimary]}
              onPress={() => router.push('/(auth)/register')}
            >
              <Text style={styles.btnPrimaryText}>Inscription</Text>
            </Pressable>

            {/* CONNEXION */}
            <Pressable
              style={[styles.btn, styles.btnConnexion]}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={styles.btnConnexionText}>Connexion</Text>
            </Pressable>

            {/* INVITE */}
            <Pressable onPress={() => router.replace('/(tabs)')}>
              <Text style={styles.guestText}>Continuer en tant qu'invité</Text>
            </Pressable>
          </View>

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoImage: {
    width: 260,
    height: 260,
    marginBottom: 60,
  },

  buttons: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },

  btn: {
    width: '75%',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
  },

  // INSCRIPTION (violet)
  btnPrimary: {
    backgroundColor: '#BD61A6',
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
    fontFamily: 'GillSans',
  },

  // CONNEXION (rose clair)
  btnConnexion: {
    backgroundColor: '#F3C2DA',
  },
  btnConnexionText: {
    color: '#BD61A6',
    fontWeight: '800',
    fontSize: 16,
  },

  // INVITE TEXT
  guestText: {
    marginTop: 10,
    fontSize: 15,
    color: '#FCB040',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
