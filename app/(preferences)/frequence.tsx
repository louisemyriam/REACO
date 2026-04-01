import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


const OPTIONS = ['Tout le temps', 'Souvent', 'Parfois', 'Rarement'];

export default function FrequenceScreen() {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <LinearGradient
      colors={['#F7EDE6', '#F3D5B5']} 
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <View style={styles.container}>
  
        {/* Back */}
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        {/* Title */}
        <Text style={styles.question}>
          À quelle{'\n'}fréquence{'\n'}lis-tu ?
        </Text>

        {/* Options */}
        <View style={styles.options}>
          {OPTIONS.map((opt) => {
            const isOn = picked === opt;
            return (
              <Pressable
                key={opt}
                onPress={() => setPicked(opt)}
                style={[styles.option, isOn ? styles.optionOn : styles.optionOff]}
              >
                <Text style={[styles.optionText, isOn ? styles.optionTextOn : styles.optionTextOff]}>
                  {opt}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* CTA */}
        <Pressable
          disabled={!picked}
          onPress={() => router.push('/(preferences)/temps')}
          style={[styles.cta, picked ? styles.ctaOn : styles.ctaOff]}
        >
          <Text style={styles.ctaText}>Continuer</Text>
        </Pressable>
        </View>
    </SafeAreaView>
  </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF4EC' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 18 },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  backText: {
    fontSize: 34,
    lineHeight: 34,
    color: '#FEC271',
    //fontWeight: '900',
    fontFamily: 'GillSans-Bold',
  },

  question: {
    fontSize: 36,
    fontWeight: '900',
    color: '#291425',
    textAlign: 'center',
    lineHeight: 40,
    marginTop: 10,
    marginBottom: 26,
  },

  options: {
    gap: 18,
    paddingHorizontal: 4,
  },

  option: {
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Selected (dark blue)
  optionOn: {
    backgroundColor: '#5B65AE',
    borderColor: 'rgba(41,20,37,0.10)',
  },
  optionTextOn: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
  },

  // Unselected (light blue)
  optionOff: {
    backgroundColor: 'rgba(91,101,174,0.22)',
    borderColor: 'rgba(41,20,37,0.06)',
  },
  optionTextOff: {
    color: '#5B65AE',
    fontWeight: '900',
    fontSize: 18,
  },

  optionText: {},

  cta: {
    marginTop: 'auto',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  ctaOn: {
    backgroundColor: '#5B65AE',
    borderColor: 'rgba(41,20,37,0.10)',
  },
  ctaOff: {
    backgroundColor: 'rgba(91,101,174,0.35)',
    borderColor: 'rgba(41,20,37,0.06)',
  },
  ctaText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 22,
  },
});
