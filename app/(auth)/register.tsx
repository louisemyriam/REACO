import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';


export default function RegisterScreen() {
  // Fake default values (pré-remplis)
  const [email, setEmail] = useState('louise@gmail.com');
  const [pseudo, setPseudo] = useState('loulou');
  const [pass, setPass] = useState('loulou1234');
  const [pass2, setPass2] = useState('loulou1234');
  const [accepted, setAccepted] = useState(false);


  const validateAndContinue = () => {
    const e = email.trim();
    const u = pseudo.trim();
    const p1 = pass.trim();
    const p2 = pass2.trim();

    if (!e || !u || !p1 || !p2) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (p1 !== p2) {
      Alert.alert('Erreur', 'Les mots de passe ne sont pas identiques.');
      return;
    }

    if (!accepted) {
      Alert.alert('Conditions', 'Veuillez accepter les conditions.');
      return;
    }

    // OK -> go to next step (preferences for example)
    router.replace('/(preferences)/genres');
  };

  return (
    <LinearGradient colors={['#FFF4EC', '#FEC271']} style={styles.safe}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Back arrow */}
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={28} color="#FCB040" />
          </Pressable>

          {/* Logo (placeholder image space) */}
          <View style={styles.logoBox}>
            <Image
              source={require('@/assets/images/Logo.png')}
              style={styles.logo}
              contentFit="contain"
            />
          </View>

          {/* Form */}
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Mail"
            placeholderTextColor="#FCB040"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            value={pseudo}
            onChangeText={setPseudo}
            placeholder="Pseudonyme"
            placeholderTextColor="#FCB040"
            style={styles.input}
            autoCapitalize="none"
          />

          <TextInput
            value={pass}
            onChangeText={setPass}
            placeholder="Mot de passe"
            placeholderTextColor="#FCB040"
            style={styles.input}
            secureTextEntry
          />

          <TextInput
            value={pass2}
            onChangeText={setPass2}
            placeholder="Confirmation Mot de passe"
            placeholderTextColor="#FCB040"
            style={styles.input}
            secureTextEntry
          />

          {/* Social buttons (UI only for now) */}
          <Pressable style={[styles.socialBtn, styles.googleBtn]}>
            <Text style={styles.socialText}>Identification Google</Text>
          </Pressable>

          <Pressable style={[styles.socialBtn, styles.appleBtn]}>
            <Text style={styles.socialText}>Identification Apple</Text>
          </Pressable>

          {/* Small links + checkbox line (UI simple) */}
          <View style={styles.linksRow}>
            <Pressable>
              <Text style={styles.smallLink}>Mentions légales</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.smallLink}>Politique de confidentialité</Text>
            </Pressable>
          </View>

          <Pressable
             style={styles.checkRow}
            onPress={() => setAccepted(!accepted)}
            >
           <View
             style={[
            styles.fakeCheckbox,
            accepted && { backgroundColor: '#FCB040' } // filled when checked
            ]}
          />

          <Text style={styles.checkText}>
            J’accepte les conditions d’utilisations
          </Text>
        </Pressable>


          {/* Continue */}
          <Pressable style={styles.continueBtn} onPress={validateAndContinue}>
            <Text style={styles.continueText}>Continuer</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },

  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 12,
  },

  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginBottom: 10,
  },

  logoBox: {
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  logo: {
    width: 180,
    height: 180,
  },

  input: {
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: '#FCB040', // no blue — always yellow
    marginBottom: 12,
    color: '#291425',
    fontSize: 15,
    fontFamily: 'GillSans',
  },

  socialBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  googleBtn: {
    backgroundColor: '#BD61A6',
  },
  appleBtn: {
    backgroundColor: '#5B65AE',
  },
  socialText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },

  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingHorizontal: 4,
  },
  smallLink: {
    fontSize: 12,
    color: '#291425',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    paddingHorizontal: 4,
  },
  fakeCheckbox:{
    width:20,
    height:20,
    borderRadius:5,
    borderWidth:2,
    borderColor:'#FCB040',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#FFF',
  },  
  checkText: {
    fontSize: 12,
    color: '#291425',
    fontWeight: '500',
  },

  continueBtn: {
    marginTop: 26,
    backgroundColor: '#FCB040',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  continueText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 20,
  },
});
