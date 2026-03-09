import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ParametresAffichageScreen() {
  const router = useRouter();

  const [brightness] = useState(70);
  const [theme, setTheme] = useState<'sombre' | 'clair'>('clair');
  const [fontSize, setFontSize] = useState(12);
  const [pageAnimation, setPageAnimation] = useState<'swipe' | 'scroll'>('swipe');
  const [musicOn, setMusicOn] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [doNotDisturb, setDoNotDisturb] = useState(false);

  const [musicChoice] = useState('Fantasy');
  const [soundChoice] = useState('Feu de bois');

  const buttonText = useMemo(() => 'Valider', []);
  const brightnessPercent = `${brightness}%`;

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={['#F7F0E8', '#F3C67B']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.page}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#C064AF" />
          </Pressable>

          <Text style={styles.title}>Paramètres d’Affichage</Text>

          <Text style={styles.sectionLabel}>Luminosité</Text>
          <View style={styles.sliderRow}>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${brightness}%` }]} />
              <Pressable
                style={[styles.sliderThumb, { left: `${brightness}%` }]}
                onPress={() => {}}
              />
            </View>
          </View>
          <Text style={styles.smallValue}>{brightnessPercent}</Text>

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
          <View style={styles.fontSliderWrap}>
            <View style={styles.fontTrack} />
            <Pressable
              style={[styles.fontDot, styles.fontDotActive, { left: 0 }]}
              onPress={() => setFontSize(12)}
            />
            <Pressable
              style={[styles.fontDot, { left: '33%' }]}
              onPress={() => setFontSize(16)}
            />
            <Pressable
              style={[styles.fontDot, { left: '66%' }]}
              onPress={() => setFontSize(20)}
            />
            <Pressable
              style={[styles.fontDot, { right: 0 }]}
              onPress={() => setFontSize(24)}
            />
          </View>
          <Text style={styles.smallValue}>{fontSize}px</Text>

          <Text style={styles.sectionLabel}>Annimation de page</Text>
          <View style={styles.inlineSwitchRow}>
            <Text style={styles.inlineLabel}>SWIPE</Text>
            <Switch
              value={pageAnimation === 'scroll'}
              onValueChange={(v) => setPageAnimation(v ? 'scroll' : 'swipe')}
              trackColor={{ false: '#C064AF', true: '#C064AF' }}
              thumbColor="#F6EFE7"
            />
            <Text style={styles.inlineLabel}>SCROLL</Text>
          </View>

          <Text style={styles.sectionLabel}>Musiques</Text>
          <View style={styles.optionRow}>
            <View style={styles.toggleRow}>
              <Text style={styles.offOn}>OFF</Text>
              <Switch
                value={musicOn}
                onValueChange={setMusicOn}
                trackColor={{ false: '#C064AF', true: '#C064AF' }}
                thumbColor="#F6EFE7"
              />
              <Text style={styles.offOn}>ON</Text>
            </View>

            <Pressable style={styles.dropdownBtn}>
              <Text style={styles.dropdownText}>{musicChoice}</Text>
              <Ionicons name="chevron-down" size={16} color="#FFF8F1" />
            </Pressable>
          </View>

          <Text style={styles.sectionLabel}>Effets sonores</Text>
          <View style={styles.optionRow}>
            <View style={styles.toggleRow}>
              <Text style={styles.offOn}>OFF</Text>
              <Switch
                value={soundOn}
                onValueChange={setSoundOn}
                trackColor={{ false: '#C064AF', true: '#C064AF' }}
                thumbColor="#F6EFE7"
              />
              <Text style={styles.offOn}>ON</Text>
            </View>

            <Pressable style={styles.dropdownBtn}>
              <Text style={styles.dropdownText}>{soundChoice}</Text>
              <Ionicons name="chevron-down" size={16} color="#FFF8F1" />
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

          <Pressable style={styles.validateBtn} onPress={() => router.back()}>
            <Text style={styles.validateText}>{buttonText}</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F0E8',
  },

  gradient: {
    flex: 1,
  },

  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 26,
  },

  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 4,
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

  sliderRow: {
    marginTop: 4,
  },

  sliderTrack: {
    width: '100%',
    height: 6,
    borderRadius: 999,
    backgroundColor: '#C064AF',
    position: 'relative',
  },

  sliderFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#C064AF',
  },

  sliderThumb: {
    position: 'absolute',
    top: -8,
    marginLeft: -10,
    width: 22,
    height: 22,
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

  fontSliderWrap: {
    height: 28,
    justifyContent: 'center',
    position: 'relative',
    marginTop: 6,
  },

  fontTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#C064AF',
  },

  fontDot: {
    position: 'absolute',
    width: 10,
    height: 18,
    borderRadius: 8,
    backgroundColor: '#C064AF',
    marginTop: 5,
  },

  fontDotActive: {
    width: 22,
    height: 22,
    borderRadius: 999,
    marginTop: 2,
  },

  inlineSwitchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },

  inlineLabel: {
    color: '#C064AF',
    fontFamily: 'GillSans',
    fontSize: 14,
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
    minWidth: 104,
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 6,
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
    marginTop: 'auto',
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