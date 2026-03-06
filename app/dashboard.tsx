import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type DayStat = { day: string; minutes: number };

export default function Dashboard() {
  const router = useRouter();

  const week: DayStat[] = useMemo(
    () => [
      { day: 'Lun', minutes: 20 },
      { day: 'Mar', minutes: 35 },
      { day: 'Mer', minutes: 15 },
      { day: 'Jeu', minutes: 55 },
      { day: 'Ven', minutes: 30 },
      { day: 'Sam', minutes: 45 },
      { day: 'Dim', minutes: 28 },
    ],
    []
  );

  const max = Math.max(...week.map((d) => d.minutes), 1);

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#FEF1EA', '#FEC271']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={22} color="#BD61A6" />
        </Pressable>

        <Text style={styles.topTitle}>Dashboard</Text>

        <View style={{ width: 38 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Quick stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>12</Text>
            <Text style={styles.statLabel}>jours streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>25</Text>
            <Text style={styles.statLabel}>plumes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>5</Text>
            <Text style={styles.statLabel}>lectures</Text>
          </View>
        </View>

        {/* Weekly chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cette semaine</Text>

          <View style={styles.chartRow}>
            {week.map((d) => {
              const h = Math.max(10, Math.round((d.minutes / max) * 90));
              return (
                <View key={d.day} style={styles.barCol}>
                  <View style={[styles.bar, { height: h }]} />
                  <Text style={styles.day}>{d.day}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.legendRow}>
            <View style={styles.dot} />
            <Text style={styles.legend}>Lecture effectuée</Text>
          </View>
        </View>

        {/* Reading time */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Temps de lecture</Text>
          <Text style={styles.cardText}>Objectif : 20 min / jour</Text>

          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: '65%' }]} />
          </View>
          <Text style={styles.progressText}>65%</Text>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FEF1EA' },

  topBar: {
    paddingTop: 52,
    paddingHorizontal: 14,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.70)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '900',
    color: '#291425',
    fontSize: 18,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 18,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statNum: { fontWeight: '900', color: '#BD61A6', fontSize: 18 },
  statLabel: { marginTop: 4, fontWeight: '800', color: 'rgba(41,20,37,0.55)', fontSize: 12 },

  card: {
    marginTop: 14,
    backgroundColor: 'rgba(255,255,255,0.70)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
    borderRadius: 18,
    padding: 14,
  },
  cardTitle: { fontWeight: '900', color: '#291425', fontSize: 16 },
  cardText: { marginTop: 6, fontWeight: '800', color: 'rgba(41,20,37,0.60)', fontSize: 12 },

  chartRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
  },
  barCol: { alignItems: 'center', width: 36 },
  bar: {
    width: 32,
    borderRadius: 12,
    backgroundColor: 'rgba(189,97,166,0.75)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },
  day: { marginTop: 8, fontWeight: '800', color: 'rgba(41,20,37,0.60)', fontSize: 12 },

  legendRow: { marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 999, backgroundColor: 'rgba(44,134,98,0.9)' },
  legend: { fontWeight: '800', color: 'rgba(41,20,37,0.60)', fontSize: 12 },

  progressBg: {
    marginTop: 12,
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(189,97,166,0.18)',
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#BD61A6' },
  progressText: { marginTop: 8, fontWeight: '900', color: 'rgba(41,20,37,0.55)' },
});