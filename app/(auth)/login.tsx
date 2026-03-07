import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const fakeLogin = () => {
    const e = email.trim().toLowerCase();
    const p = pass.trim();
  
    if (!e || !p) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
  
    const VALID_EMAIL = 'lea2004@gmail.com';
    const VALID_PASS = 'lea1234';
  
    if (e !== VALID_EMAIL || p !== VALID_PASS) {
      Alert.alert('Connexion impossible', 'Mail ou mot de passe incorrect.');
      return;
    }
  
    router.replace('/(tabs)');
  };
  

  return (
    <LinearGradient
      colors={['#F8EFE8', '#EFCFAF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          
          {/* BACK ARROW */}
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          {/* LOGO */}
          <Image
            source={require('@/assets/images/Logo.png')}
            style={styles.logo}
            contentFit="contain"
          />

          {/* INPUTS */}
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Mail"
            placeholderTextColor="#FBB040"
            style={styles.input}
            autoCapitalize="none"
          />

          <TextInput
            value={pass}
            onChangeText={setPass}
            placeholder="Mot de passe"
            placeholderTextColor="#FBB040"
            style={styles.input}
            secureTextEntry
          />

          {/* SOCIAL BUTTONS */}
          <View style={styles.socialRow}>
            <Pressable style={styles.googleBtn}>
              <Text style={styles.googleText}>Identification Google</Text>
            </Pressable>

            <Pressable style={styles.appleBtn}>
              <Text style={styles.appleText}>Identification</Text>
              <Text style={{ fontSize: 18, fontFamily: 'GillSans'}}></Text>
            </Pressable>
          </View>

          {/* CONTINUE */}
          <Pressable style={styles.continueBtn} onPress={fakeLogin}>
            <Text style={styles.continueText}>Continuer</Text>
          </Pressable>


        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 10,
  },

  backBtn: {
    marginBottom: 10,
    width: 40,
  },
  backText: {
    fontSize: 36,
    fontFamily: 'GillSans-Bold',
    color: '#FBB040',
    //fontWeight: '900',
  },

  logo: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#F3E6DC',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#FBB040',
    marginBottom: 14,
    fontSize: 16,
    color: '#291425',
  },

  socialRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    marginBottom: 30,
  },

  googleBtn: {
    flex: 1,
    backgroundColor: '#BD61A6',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  googleText: {
    color: 'white',
    //fontWeight: '800',
    fontFamily: 'GillSans-Bold',
  },

  appleBtn: {
    flex: 1,
    backgroundColor: '#5B65AE',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  appleText: {
    color: 'white',
    //fontWeight: '800',
    fontFamily: 'GillSans-Bold',
  },

  continueBtn: {
    backgroundColor: '#FBB040',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  continueText: {
    color: 'white',
    fontSize: 20,
    //fontWeight: '900',
    fontFamily: 'GillSans-Bold',
  },
});
