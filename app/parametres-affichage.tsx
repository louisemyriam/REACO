import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  playBackgroundSound,
  stopBackgroundSound,
  playEffectSound,
  stopEffectSound,
} from './audioManager';

import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const MUSIC_OPTIONS = ['Fantasy', 'Lo-fi', 'Rain', 'Piano'];
const SOUND_OPTIONS = ['Pluie', 'Vent', 'Aucun'];

const musicKeyMap: Record<string, 'fantasy' | 'lofi' | 'rain' | 'piano'> = {
  Fantasy: 'fantasy',
  'Lo-fi': 'lofi',
  Rain: 'rain',
  Piano: 'piano',
};

const soundKeyMap: Record<string, 'rain' | 'wind'> = {
  Pluie: 'rain',
  Vent: 'wind',
};

export default function ParametresAffichageScreen() {
  const router = useRouter();

  const [brightness, setBrightness] = useState(70);
  const [theme, setTheme] = useState<'sombre' | 'clair'>('clair');
  const [fontSize, setFontSize] = useState(16);
  const [pageAnimation, setPageAnimation] = useState<'swipe' | 'scroll'>('swipe');
  const [musicOn, setMusicOn] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [doNotDisturb, setDoNotDisturb] = useState(false);

  const [musicIndex, setMusicIndex] = useState(0);
  const [soundIndex, setSoundIndex] = useState(0);

  const musicChoice = MUSIC_OPTIONS[musicIndex];
  const soundChoice = SOUND_OPTIONS[soundIndex];

  const cycleMusic = () => {
    setMusicIndex((prev) => (prev + 1) % MUSIC_OPTIONS.length);
  };

  const cycleSound = () => {
    setSoundIndex((prev) => (prev + 1) % SOUND_OPTIONS.length);
  };

  const increaseBrightness = () => setBrightness((prev) => Math.min(prev + 10, 100));
  const decreaseBrightness = () => setBrightness((prev) => Math.max(prev - 10, 0));

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 28));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 10));

  const buttonText = useMemo(() => 'Valider', []);

  const handleSave = () => {
    Alert.alert(
      'Paramètres enregistrés',
      `Luminosité : ${brightness}%\nThème : ${theme}\nPolice : ${fontSize}px\nAnimation : ${pageAnimation}\nMusique : ${musicOn ? musicChoice : 'OFF'}\nEffets sonores : ${soundOn ? soundChoice : 'OFF'}\nNe pas déranger : ${doNotDisturb ? 'ON' : 'OFF'}`
    );
    router.back();
  };
  useEffect(() => {
    if (musicOn) {
      playBackgroundSound(musicKeyMap[musicChoice], true);
    } else {
      stopBackgroundSound();
    }
  
    return () => {
      stopBackgroundSound();
    };
  }, [musicOn, musicChoice]);
  

  useEffect(() => {
    if (soundOn && soundChoice !== 'Aucun') {
      playEffectSound(soundKeyMap[soundChoice as 'Pluie' | 'Vent']);
    } else {
      stopEffectSound();
    }
  
    return () => {
      stopEffectSound();
    };
  }, [soundOn, soundChoice]);
  return (
    <LinearGradient
      colors={['#F6EFE7', '#F2D8B0', '#F3C67B']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="dark" translucent />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.page}
      >
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#C064AF" />
        </Pressable>

        <Text style={styles.title}>Paramètres d’Affichage</Text>

        <Text style={styles.sectionLabel}>Luminosité</Text>
        <View style={styles.controlRow}>
          <Pressable style={styles.roundBtn} onPress={decreaseBrightness}>
            <Text style={styles.roundBtnText}>−</Text>
          </Pressable>

          <View style={styles.sliderTrack}>
            <View style={[styles.sliderFill, { width: `${brightness}%` }]} />
          </View>

          <Pressable style={styles.roundBtn} onPress={increaseBrightness}>
            <Text style={styles.roundBtnText}>+</Text>
          </Pressable>
        </View>
        <Text style={styles.smallValue}>{brightness}%</Text>

        <Text style={styles.sectionLabel}>Thèmes de l’écran</Text>
        <View style={styles.themeRow}>
          <Pressable
            style={[
              styles.themeBtn,
              theme === 'sombre' ? styles.themeBtnInactive : styles.themeBtnActive,
            ]}
            onPress={() => setTheme('sombre')}
          >
            <Text
              style={[
                styles.themeBtnText,
                theme === 'sombre' ? styles.themeBtnTextInactive : styles.themeBtnTextActive,
              ]}
            >
              Sombre
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.themeBtn,
              theme === 'clair' ? styles.themeBtnActive : styles.themeBtnInactive,
            ]}
            onPress={() => setTheme('clair')}
          >
            <Text
              style={[
                styles.themeBtnText,
                theme === 'clair' ? styles.themeBtnTextActive : styles.themeBtnTextInactive,
              ]}
            >
              Clair
            </Text>
          </Pressable>
        </View>

        <Text style={styles.sectionLabel}>Taille de police</Text>
        <View style={styles.controlRow}>
          <Pressable style={styles.roundBtn} onPress={decreaseFont}>
            <Text style={styles.roundBtnText}>−</Text>
          </Pressable>

          <View style={styles.fontPreviewBox}>
            <Text style={[styles.fontPreviewText, { fontSize }]}>Aa</Text>
          </View>

          <Pressable style={styles.roundBtn} onPress={increaseFont}>
            <Text style={styles.roundBtnText}>+</Text>
          </Pressable>
        </View>
        <Text style={styles.smallValue}>{fontSize}px</Text>

        <Text style={styles.sectionLabel}>Animation de page</Text>
        <View style={styles.segmentRow}>
          <Pressable
            style={[
              styles.segmentBtn,
              pageAnimation === 'swipe' && styles.segmentBtnActive,
            ]}
            onPress={() => setPageAnimation('swipe')}
          >
            <Text
              style={[
                styles.segmentText,
                pageAnimation === 'swipe' && styles.segmentTextActive,
              ]}
            >
              Swipe
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.segmentBtn,
              pageAnimation === 'scroll' && styles.segmentBtnActive,
            ]}
            onPress={() => setPageAnimation('scroll')}
          >
            <Text
              style={[
                styles.segmentText,
                pageAnimation === 'scroll' && styles.segmentTextActive,
              ]}
            >
              Scroll
            </Text>
          </Pressable>
        </View>

        <Text style={styles.sectionLabel}>Musiques</Text>
        <View style={styles.optionRow}>
          <View style={styles.toggleRow}>
            <Text style={styles.offOn}>OFF</Text>
            <Switch
              value={musicOn}
              onValueChange={setMusicOn}
              trackColor={{ false: '#D59BCB', true: '#C064AF' }}
              thumbColor="#F6EFE7"
            />
            <Text style={styles.offOn}>ON</Text>
          </View>

          <Pressable style={styles.dropdownBtn} onPress={cycleMusic}>
            <Text style={styles.dropdownText}>{musicChoice}</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFF8F1" />
          </Pressable>
        </View>

        <Text style={styles.sectionLabel}>Effets sonores</Text>
        <View style={styles.optionRow}>
          <View style={styles.toggleRow}>
            <Text style={styles.offOn}>OFF</Text>
            <Switch
              value={soundOn}
              onValueChange={setSoundOn}
              trackColor={{ false: '#D59BCB', true: '#C064AF' }}
              thumbColor="#F6EFE7"
            />
            <Text style={styles.offOn}>ON</Text>
          </View>

          <Pressable style={styles.dropdownBtn} onPress={cycleSound}>
            <Text style={styles.dropdownText}>{soundChoice}</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFF8F1" />
          </Pressable>
        </View>

        <Text style={styles.sectionLabel}>Ne pas déranger</Text>
        <View style={styles.toggleRowOnly}>
          <Text style={styles.offOn}>OFF</Text>
          <Switch
            value={doNotDisturb}
            onValueChange={setDoNotDisturb}
            trackColor={{ false: '#D59BCB', true: '#C064AF' }}
            thumbColor="#F6EFE7"
          />
          <Text style={styles.offOn}>ON</Text>
        </View>

        <Pressable style={styles.validateBtn} onPress={handleSave}>
          <Text style={styles.validateText}>{buttonText}</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 34,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    color: '#2A1527',
    fontFamily: 'GillSans-Bold',
    marginBottom: 18,
  },
  sectionLabel: {
    fontSize: 18,
    color: '#C064AF',
    fontFamily: 'GillSans-Bold',
    marginTop: 10,
    marginBottom: 10,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roundBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: '#C064AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundBtnText: {
    color: '#FFF8F1',
    fontSize: 22,
    fontFamily: 'GillSans-Bold',
    lineHeight: 24,
  },
  sliderTrack: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#E6B3D7',
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#C064AF',
  },
  smallValue: {
    marginTop: 8,
    color: '#C064AF',
    fontFamily: 'GillSans-Bold',
    fontSize: 13,
  },
  themeRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 6,
  },
  themeBtn: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeBtnActive: {
    backgroundColor: '#C064AF',
  },
  themeBtnInactive: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#C064AF',
  },
  themeBtnText: {
    fontSize: 16,
    fontFamily: 'GillSans-Bold',
  },
  themeBtnTextActive: {
    color: '#FFF8F1',
  },
  themeBtnTextInactive: {
    color: '#C064AF',
  },
  fontPreviewBox: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontPreviewText: {
    color: '#2A1527',
    fontFamily: 'GillSans-Bold',
  },
  segmentRow: {
    flexDirection: 'row',
    gap: 12,
  },
  segmentBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C064AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentBtnActive: {
    backgroundColor: '#C064AF',
  },
  segmentText: {
    color: '#C064AF',
    fontFamily: 'GillSans-Bold',
    fontSize: 15,
  },
  segmentTextActive: {
    color: '#FFF8F1',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 4,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleRowOnly: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  offOn: {
    color: '#C064AF',
    fontFamily: 'GillSans',
    fontSize: 14,
  },
  dropdownBtn: {
    minWidth: 120,
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#C064AF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  dropdownText: {
    color: '#FFF8F1',
    fontFamily: 'GillSans-Bold',
    fontSize: 14,
  },
  validateBtn: {
    marginTop: 28,
    backgroundColor: '#C064AF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  validateText: {
    color: '#FFF8F1',
    fontSize: 18,
    fontFamily: 'GillSans',
  },
});