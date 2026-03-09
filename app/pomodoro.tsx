import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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

export default function PomodoroScreen() {
  const router = useRouter();

  const [alarmValue] = useState(50);
  const [tickValue] = useState(50);
  const [modeMinuteur] = useState('Timer');
  const [cycles, setCycles] = useState(4);

  const [readingTime] = useState(25);
  const [shortBreak] = useState(5);
  const [longBreak] = useState(15);

  const [bubbleMode, setBubbleMode] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);

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

          <Text style={styles.title}>Pomodoro</Text>
          <Text style={styles.subtitle}>Gère ton temps de lecture</Text>

          <View style={styles.sliderSection}>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Son de l’alarme</Text>
              <Pressable style={styles.dropdownBtn}>
                <Text style={styles.dropdownText}>Cloche</Text>
                <Ionicons name="chevron-down" size={16} color="#FFF8F1" />
              </Pressable>
            </View>

            <View style={styles.sliderTrackOrange}>
              <View style={[styles.sliderFillOrange, { width: `${alarmValue}%` }]} />
              <View style={[styles.sliderThumbOrange, { left: `${alarmValue}%` }]} />
            </View>
            <Text style={styles.sliderValue}>{alarmValue}</Text>
          </View>

          <View style={styles.sliderSection}>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Son Tick tack</Text>
              <Pressable style={styles.dropdownBtn}>
                <Text style={styles.dropdownText}>Rapide</Text>
                <Ionicons name="chevron-down" size={16} color="#FFF8F1" />
              </Pressable>
            </View>

            <View style={styles.sliderTrackOrange}>
              <View style={[styles.sliderFillOrange, { width: `${tickValue}%` }]} />
              <View style={[styles.sliderThumbOrange, { left: `${tickValue}%` }]} />
            </View>
            <Text style={styles.sliderValue}>{tickValue}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.modeRow}>
            <Text style={styles.label}>Mode minuteur</Text>

            <View style={styles.selectorWrap}>
              <Pressable style={styles.arrowSmall}>
                <Ionicons name="chevron-back" size={20} color="#E7A53A" />
              </Pressable>

              <Text style={styles.selectorText}>{modeMinuteur}</Text>

              <Pressable style={styles.arrowSmall}>
                <Ionicons name="chevron-forward" size={20} color="#E7A53A" />
              </Pressable>
            </View>
          </View>

          <View style={styles.modeRow}>
            <Text style={styles.label}>Nombre de cycle</Text>

            <View style={styles.selectorWrap}>
              <Pressable
                style={styles.arrowSmall}
                onPress={() => setCycles((v) => Math.max(1, v - 1))}
              >
                <Ionicons name="chevron-back" size={20} color="#E7A53A" />
              </Pressable>

              <Text style={styles.selectorText}>{cycles}</Text>

              <Pressable style={styles.arrowSmall} onPress={() => setCycles((v) => v + 1)}>
                <Ionicons name="chevron-forward" size={20} color="#E7A53A" />
              </Pressable>
            </View>
          </View>

          <View style={styles.timeLabelsRow}>
            <Text style={styles.timeLabel}>Temps de lecture</Text>
            <Text style={styles.timeLabel}>Pause courte</Text>
            <Text style={styles.timeLabel}>Longue pause</Text>
          </View>

          <View style={styles.timeInputsRow}>
            <Pressable style={styles.timeBox}>
              <Text style={styles.timeBoxText}>{readingTime}</Text>
              <Ionicons name="chevron-expand" size={16} color="#FFF8F1" />
            </Pressable>

            <Pressable style={styles.timeBox}>
              <Text style={styles.timeBoxText}>{shortBreak}</Text>
              <Ionicons name="chevron-expand" size={16} color="#FFF8F1" />
            </Pressable>

            <Pressable style={styles.timeBox}>
              <Text style={styles.timeBoxText}>{longBreak}</Text>
              <Ionicons name="chevron-expand" size={16} color="#FFF8F1" />
            </Pressable>
          </View>

          <View style={styles.separator} />

          <View style={styles.toggleLine}>
            <Text style={styles.label}>Mode Bulle</Text>
            <Switch
              value={bubbleMode}
              onValueChange={setBubbleMode}
              trackColor={{ false: '#D59BCB', true: '#C064AF' }}
              thumbColor="#F6EFE7"
            />
          </View>

          <View style={styles.toggleLine}>
            <Text style={styles.label}>Bluetooth</Text>
            <Switch
              value={bluetooth}
              onValueChange={setBluetooth}
              trackColor={{ false: '#D59BCB', true: '#C064AF' }}
              thumbColor="#F6EFE7"
            />
          </View>

          <Pressable style={styles.launchBtn}>
            <Text style={styles.launchText}>Lancer</Text>
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
    fontSize: 26,
    color: '#2A1527',
    fontFamily: 'GillSans-Bold',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    color: '#2A1527',
    fontFamily: 'GillSans',
    marginBottom: 22,
  },

  sliderSection: {
    marginBottom: 18,
  },

  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 10,
  },

  label: {
    fontSize: 18,
    color: '#2A1527',
    fontFamily: 'GillSans',
  },

  dropdownBtn: {
    minWidth: 102,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#C064AF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  dropdownText: {
    color: '#FFF8F1',
    fontSize: 14,
    fontFamily: 'GillSans-Bold',
  },

  sliderTrackOrange: {
    width: '100%',
    height: 6,
    borderRadius: 999,
    backgroundColor: '#F3A936',
    position: 'relative',
  },

  sliderFillOrange: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#F3A936',
  },

  sliderThumbOrange: {
    position: 'absolute',
    top: -8,
    marginLeft: -11,
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: '#F3A936',
  },

  sliderValue: {
    marginTop: 6,
    textAlign: 'center',
    color: '#2A1527',
    fontSize: 16,
    fontFamily: 'GillSans',
  },

  separator: {
    height: 2,
    backgroundColor: '#EABB6A',
    marginVertical: 18,
    borderRadius: 999,
  },

  modeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },

  selectorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  arrowSmall: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#F0CF90',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectorText: {
    minWidth: 52,
    textAlign: 'center',
    color: '#2A1527',
    fontSize: 16,
    fontFamily: 'GillSans',
  },

  timeLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 8,
    gap: 10,
  },

  timeLabel: {
    flex: 1,
    textAlign: 'center',
    color: '#2A1527',
    fontSize: 13,
    fontFamily: 'GillSans',
  },

  timeInputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  timeBox: {
    flex: 1,
    height: 38,
    borderRadius: 6,
    backgroundColor: '#C064AF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  timeBoxText: {
    color: '#FFF8F1',
    fontSize: 18,
    fontFamily: 'GillSans-Bold',
  },

  toggleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  launchBtn: {
    marginTop: 26,
    alignSelf: 'center',
    minWidth: 150,
    backgroundColor: '#C064AF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 28,
    alignItems: 'center',
  },

  launchText: {
    color: '#FFF8F1',
    fontSize: 18,
    fontFamily: 'GillSans',
  },
});