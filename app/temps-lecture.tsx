import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  return `00:${mm}:${ss}`;
}

export default function TempsLectureScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    readingTime?: string;
    shortBreak?: string;
    longBreak?: string;
    cycles?: string;
  }>();

  const readingMinutes = Number(params.readingTime ?? 25);
  const shortBreak = Number(params.shortBreak ?? 5);
  const longBreak = Number(params.longBreak ?? 15);
  const cycles = Number(params.cycles ?? 4);

  const initialSeconds = useMemo(() => readingMinutes * 60, [readingMinutes]);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStop = () => {
    setIsRunning(false);
    router.back();
  };

  const handleRestart = () => {
    setSecondsLeft(initialSeconds);
    setIsRunning(true);
  };

  const handlePrevious = () => {
    setSecondsLeft((prev) => Math.min(prev + 60, initialSeconds));
  };

  const handleNext = () => {
    setSecondsLeft((prev) => Math.max(prev - 60, 0));
  };

  const handlePlus = () => {
    Alert.alert(
      'Session Pomodoro',
      `Lecture : ${readingMinutes} min\nPause courte : ${shortBreak} min\nPause longue : ${longBreak} min\nCycles : ${cycles}`
    );
  };

  return (
    <LinearGradient
      colors={['#F6EFE7', '#F2D8B0', '#F3C67B']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.page}>
        <View style={styles.topRow}>
          <Pressable style={styles.iconBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#C064AF" />
          </Pressable>

          <Pressable style={styles.plusBtn} onPress={handlePlus}>
            <Ionicons name="add" size={28} color="#F3AB3B" />
          </Pressable>
        </View>

        <Text style={styles.title}>c’est le moment{"\n"}de lire !</Text>

        <Image
          source={require('../assets/images/ridzy_temps_de_lecture_mascotte.png')}
          style={styles.mascotte}
          contentFit="contain"
        />

        <Text style={styles.timer}>{formatTime(secondsLeft)}</Text>

        <View style={styles.controlsRow}>
          <Pressable style={styles.controlBtn} onPress={handlePrevious}>
            <Ionicons name="play-skip-back-outline" size={30} color="#C064AF" />
          </Pressable>

          <Pressable
            style={styles.controlBtn}
            onPress={() => setIsRunning((prev) => !prev)}
          >
            <Ionicons
              name={isRunning ? 'pause' : 'play'}
              size={28}
              color="#C064AF"
            />
          </Pressable>

          <Pressable style={styles.controlBtn} onPress={handleNext}>
            <Ionicons name="play-skip-forward-outline" size={30} color="#C064AF" />
          </Pressable>
        </View>

        <Pressable style={styles.stopBtn} onPress={handleStop}>
          <Text style={styles.stopBtnText}>Arrêter</Text>
        </Pressable>

        <Pressable style={styles.restartBtn} onPress={handleRestart}>
          <Text style={styles.restartBtnText}>Recommencer</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 30,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  plusBtn: {
    width: 42,
    height: 42,
    borderWidth: 1,
    borderColor: '#F1D9A4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 70,
    textAlign: 'center',
    fontSize: 26,
    lineHeight: 32,
    color: '#291425',
    fontFamily: 'GillSans-Bold',
  },
  mascotte: {
    width: 260,
    height: 260,
    alignSelf: 'center',
    marginTop: 26,
  },
  timer: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 32,
    color: '#291425',
    fontFamily: 'GillSans-Bold',
    letterSpacing: 1,
  },
  controlsRow: {
    marginTop: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28,
  },
  controlBtn: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopBtn: {
    alignSelf: 'center',
    marginTop: 28,
    backgroundColor: '#C064AF',
    borderRadius: 8,
    minWidth: 145,
    paddingVertical: 12,
    alignItems: 'center',
  },
  stopBtnText: {
    color: '#FFF8F1',
    fontSize: 17,
    fontFamily: 'GillSans-Bold',
  },
  restartBtn: {
    alignSelf: 'center',
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 8,
    minWidth: 145,
    paddingVertical: 10,
    alignItems: 'center',
  },
  restartBtnText: {
    color: '#291425',
    fontSize: 15,
    fontFamily: 'GillSans',
  },
});