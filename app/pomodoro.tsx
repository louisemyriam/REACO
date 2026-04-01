import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
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
import { useEffect } from 'react';
import { playEffectSound, stopEffectSound } from './audioManager';

const ALARM_OPTIONS = ['Cloche', 'Bip doux', 'Gong'];
const TICK_OPTIONS = ['Rapide', 'Lent', 'Aucun'];
const TIMER_MODES = ['Timer', 'Stopwatch'];
const alarmKeyMap: Record<string, 'bell' | 'gong'> = {
  Cloche: 'bell',
  'Bip doux': 'bell',
  Gong: 'gong',
};

const tickKeyMap: Record<string, 'rain' | 'wind'> = {
  Rapide: 'rain',
  Lent: 'wind',
};

export default function PomodoroScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const isScannedBook = String(params.id ?? '').startsWith('scan-');

  const [alarmVolume, setAlarmVolume] = useState(50);
  const [tickVolume, setTickVolume] = useState(50);

  const [alarmIndex, setAlarmIndex] = useState(0);
  const [tickIndex, setTickIndex] = useState(0);
  const [timerModeIndex, setTimerModeIndex] = useState(0);

  const [cycles, setCycles] = useState(4);
  const [readingTime, setReadingTime] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);

  const [bubbleMode, setBubbleMode] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);

  const alarmChoice = ALARM_OPTIONS[alarmIndex];
  const tickChoice = TICK_OPTIONS[tickIndex];
  const timerMode = TIMER_MODES[timerModeIndex];

const handleLaunch = () => {
  if (isScannedBook) {
    router.push({
      pathname: '/temps-lecture',
      params: {
        id: params?.id,
        readingTime: String(readingTime),
        shortBreak: String(shortBreak),
        longBreak: String(longBreak),
        cycles: String(cycles),
        alarmChoice,
        tickChoice,
      },
    });
    return;
  }

  Alert.alert(
    'Pomodoro prêt',
    `Mode : ${timerMode}\nCycles : ${cycles}\nLecture : ${readingTime} min\nPause courte : ${shortBreak} min\nPause longue : ${longBreak} min\nAlarme : ${alarmChoice}\nTick tack : ${tickChoice}\nMode bulle : ${bubbleMode ? 'ON' : 'OFF'}\nBluetooth : ${bluetooth ? 'ON' : 'OFF'}`
  );
};

  const changeValue = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    delta: number,
    min: number,
    max: number
  ) => {
    setter((prev) => Math.max(min, Math.min(prev + delta, max)));
  };
  useEffect(() => {
    if (alarmChoice) {
      playEffectSound(alarmKeyMap[alarmChoice as 'Cloche' | 'Bip doux' | 'Gong']);
    }
  
    return () => {
      stopEffectSound();
    };
  }, [alarmChoice]);
  
  useEffect(() => {
    if (tickChoice !== 'Aucun') {
      playEffectSound(tickKeyMap[tickChoice as 'Rapide' | 'Lent']);
    } else {
      stopEffectSound();
    }
  
    return () => {
      stopEffectSound();
    };
  }, [tickChoice]);

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

        <Text style={styles.title}>Pomodoro</Text>
        <Text style={styles.subtitle}>Gère ton temps de lecture</Text>

        <View style={styles.sliderSection}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Son de l’alarme</Text>
            <Pressable
              style={styles.dropdownBtn}
              onPress={() => setAlarmIndex((prev) => (prev + 1) % ALARM_OPTIONS.length)}
            >
              <Text style={styles.dropdownText}>{alarmChoice}</Text>
              <Ionicons name="chevron-forward" size={16} color="#FFF8F1" />
            </Pressable>
          </View>

          <View style={styles.controlRow}>
            <Pressable
              style={styles.smallRoundBtn}
              onPress={() => changeValue(setAlarmVolume, -10, 0, 100)}
            >
              <Text style={styles.smallRoundBtnText}>−</Text>
            </Pressable>

            <View style={styles.sliderTrackOrange}>
              <View style={[styles.sliderFillOrange, { width: `${alarmVolume}%` }]} />
            </View>

            <Pressable
              style={styles.smallRoundBtn}
              onPress={() => changeValue(setAlarmVolume, 10, 0, 100)}
            >
              <Text style={styles.smallRoundBtnText}>+</Text>
            </Pressable>
          </View>

          <Text style={styles.sliderValue}>{alarmVolume}</Text>
        </View>

        <View style={styles.sliderSection}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Son Tick tack</Text>
            <Pressable
              style={styles.dropdownBtn}
              onPress={() => setTickIndex((prev) => (prev + 1) % TICK_OPTIONS.length)}
            >
              <Text style={styles.dropdownText}>{tickChoice}</Text>
              <Ionicons name="chevron-forward" size={16} color="#FFF8F1" />
            </Pressable>
          </View>

          <View style={styles.controlRow}>
            <Pressable
              style={styles.smallRoundBtn}
              onPress={() => changeValue(setTickVolume, -10, 0, 100)}
            >
              <Text style={styles.smallRoundBtnText}>−</Text>
            </Pressable>

            <View style={styles.sliderTrackOrange}>
              <View style={[styles.sliderFillOrange, { width: `${tickVolume}%` }]} />
            </View>

            <Pressable
              style={styles.smallRoundBtn}
              onPress={() => changeValue(setTickVolume, 10, 0, 100)}
            >
              <Text style={styles.smallRoundBtnText}>+</Text>
            </Pressable>
          </View>

          <Text style={styles.sliderValue}>{tickVolume}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.modeRow}>
          <Text style={styles.label}>Mode minuteur</Text>

          <View style={styles.selectorWrap}>
            <Pressable
              style={styles.arrowSmall}
              onPress={() =>
                setTimerModeIndex((prev) =>
                  prev === 0 ? TIMER_MODES.length - 1 : prev - 1
                )
              }
            >
              <Ionicons name="chevron-back" size={20} color="#E7A53A" />
            </Pressable>

            <Text style={styles.selectorText}>{timerMode}</Text>

            <Pressable
              style={styles.arrowSmall}
              onPress={() =>
                setTimerModeIndex((prev) => (prev + 1) % TIMER_MODES.length)
              }
            >
              <Ionicons name="chevron-forward" size={20} color="#E7A53A" />
            </Pressable>
          </View>
        </View>

        <View style={styles.modeRow}>
          <Text style={styles.label}>Nombre de cycle</Text>

          <View style={styles.selectorWrap}>
            <Pressable
              style={styles.arrowSmall}
              onPress={() => changeValue(setCycles, -1, 1, 12)}
            >
              <Ionicons name="chevron-back" size={20} color="#E7A53A" />
            </Pressable>

            <Text style={styles.selectorText}>{cycles}</Text>

            <Pressable
              style={styles.arrowSmall}
              onPress={() => changeValue(setCycles, 1, 1, 12)}
            >
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
          <View style={styles.timeControl}>
            <Pressable
              style={styles.miniAdjust}
              onPress={() => changeValue(setReadingTime, -5, 5, 120)}
            >
              <Text style={styles.miniAdjustText}>−</Text>
            </Pressable>
            <View style={styles.timeBox}>
              <Text style={styles.timeBoxText}>{readingTime}</Text>
            </View>
            <Pressable
              style={styles.miniAdjust}
              onPress={() => changeValue(setReadingTime, 5, 5, 120)}
            >
              <Text style={styles.miniAdjustText}>+</Text>
            </Pressable>
          </View>

          <View style={styles.timeControl}>
            <Pressable
              style={styles.miniAdjust}
              onPress={() => changeValue(setShortBreak, -1, 1, 60)}
            >
              <Text style={styles.miniAdjustText}>−</Text>
            </Pressable>
            <View style={styles.timeBox}>
              <Text style={styles.timeBoxText}>{shortBreak}</Text>
            </View>
            <Pressable
              style={styles.miniAdjust}
              onPress={() => changeValue(setShortBreak, 1, 1, 60)}
            >
              <Text style={styles.miniAdjustText}>+</Text>
            </Pressable>
          </View>

          <View style={styles.timeControl}>
            <Pressable
              style={styles.miniAdjust}
              onPress={() => changeValue(setLongBreak, -1, 1, 90)}
            >
              <Text style={styles.miniAdjustText}>−</Text>
            </Pressable>
            <View style={styles.timeBox}>
              <Text style={styles.timeBoxText}>{longBreak}</Text>
            </View>
            <Pressable
              style={styles.miniAdjust}
              onPress={() => changeValue(setLongBreak, 1, 1, 90)}
            >
              <Text style={styles.miniAdjustText}>+</Text>
            </Pressable>
          </View>
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

        <Pressable style={styles.launchBtn} onPress={handleLaunch}>
          <Text style={styles.launchText}>Lancer</Text>
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
    paddingHorizontal: 18,
    paddingTop: 56,
    paddingBottom: 34,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
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
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  smallRoundBtn: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: '#F3A936',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallRoundBtnText: {
    color: '#FFF8F1',
    fontSize: 20,
    fontFamily: 'GillSans-Bold',
    lineHeight: 22,
  },
  dropdownBtn: {
    minWidth: 110,
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
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#F7D08C',
    overflow: 'hidden',
  },
  sliderFillOrange: {
    height: '100%',
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
    minWidth: 70,
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
  timeControl: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  miniAdjust: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#E7A53A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniAdjustText: {
    color: '#FFF8F1',
    fontFamily: 'GillSans-Bold',
    fontSize: 18,
    lineHeight: 20,
  },
  timeBox: {
    width: '100%',
    height: 38,
    borderRadius: 6,
    backgroundColor: '#C064AF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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