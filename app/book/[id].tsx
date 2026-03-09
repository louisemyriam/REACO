import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

export default function BookDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    coverUrl: string;
    progress: string;
    description: string;
  }>();

  const title = params.title ?? 'Livre';
  const coverUrl = params.coverUrl ?? '';
  const progress = Number(params.progress ?? 0);
  const description =
    params.description ?? 'Aucune description disponible pour ce livre.';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#E8A23A" />
        </Pressable>

        <View style={styles.coverWrap}>
          <Image
            source={{ uri: coverUrl }}
            style={styles.cover}
            contentFit="cover"
          />
        </View>

        <View style={styles.progressBlock}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>

        <View style={styles.buttonsWrap}>
          <Pressable
            style={styles.modeBtn}
            onPress={() => router.push('/parametres-affichage')}
          >
            <Text style={styles.modeBtnText}>Lecture Mode bulle</Text>
          </Pressable>

          <Pressable
            style={styles.modeBtn}
            onPress={() => router.push('/pomodoro')}
          >
            <Text style={styles.modeBtnText}>Lecture Mode focus</Text>
          </Pressable>

          <Pressable
  style={styles.modeBtn}
  onPress={() =>
    router.push({
      pathname: '/reader/classic',
      params: { id: params.id },
    })
  }
>
  <Text style={styles.modeBtnText}>Lecture Classique</Text>
</Pressable>
        </View>

        <View style={styles.descBlock}>
          <Text style={styles.descTitle}>Description</Text>
          <Text style={styles.descText}>{description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4E1CB',
  },

  page: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 40,
  },

  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 6,
  },

  coverWrap: {
    alignItems: 'center',
    marginTop: 4,
  },

  cover: {
    width: 310,
    height: 510,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
  },

  progressBlock: {
    marginTop: 14,
    alignItems: 'center',
  },

  progressTrack: {
    width: '82%',
    height: 10,
    borderRadius: 999,
    backgroundColor: '#E8B7D9',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#C96AB2',
  },

  progressText: {
    marginTop: 8,
    fontSize: 16,
    color: '#C96AB2',
    fontFamily: 'GillSans',
  },

  buttonsWrap: {
    marginTop: 18,
    gap: 14,
  },

  modeBtn: {
    backgroundColor: '#F3AB3B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  modeBtnText: {
    color: '#FFF7EE',
    fontSize: 17,
    fontFamily: 'GillSans',
  },

  descBlock: {
    marginTop: 34,
  },

  descTitle: {
    fontSize: 22,
    color: '#291425',
    fontFamily: 'GillSans-Bold',
    marginBottom: 14,
  },

  descText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#291425',
    fontFamily: 'GillSans',
  },
});