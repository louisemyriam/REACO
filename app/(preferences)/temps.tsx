import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


const OPTIONS = ['15 min/jour', '30 min/jour', '45 min/jour', '1 h/jour', 'Plus'];

export default function TempsScreen() {
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
        {/* Back arrow */}
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        {/* Title */}
        <Text style={styles.question}>
          Combien de temps{'\n'}souhaites-tu{'\n'}consacrer ?
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

        {/* Continue */}
        <Pressable
          disabled={!picked}
          onPress={() => router.replace('/(preferences)/loading')}
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

  /* back arrow */
  backBtn: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 34,
    color: '#FEC271',
    fontWeight: '900',
  },

  /* title */
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

  /* SELECTED (rose foncé) */
  optionOn: {
    backgroundColor: '#BD61A6',
    borderColor: 'rgba(41,20,37,0.10)',
  },
  optionTextOn: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 18,
  },

  /* NOT SELECTED (rose clair) */
  optionOff: {
    backgroundColor: 'rgba(189,97,166,0.25)',
    borderColor: 'rgba(41,20,37,0.06)',
  },
  optionTextOff: {
    color: '#BD61A6',
    fontWeight: '900',
    fontSize: 18,
  },

  optionText: {},

  /* continue */
  cta: {
    marginTop: 'auto',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  ctaOn: {
    backgroundColor: '#BD61A6',
    borderColor: 'rgba(41,20,37,0.10)',
  },
  ctaOff: {
    backgroundColor: 'rgba(189,97,166,0.35)',
    borderColor: 'rgba(41,20,37,0.06)',
  },
  ctaText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 22,
  },
});
