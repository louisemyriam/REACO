/*import { useLocalSearchParams, useRouter } from 'expo-router';
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
import { BOOKS_BY_ID } from '../bookData';

export default function ReadingDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const book = id ? BOOKS_BY_ID[id] : undefined;

  const title = book?.title ?? 'Livre';
  const coverUrl = book?.coverUrl ?? '';
  const progress = Number(book?.progress ?? 0);
  const description =
    book?.description ?? 'Aucune description disponible pour ce livre.';

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
            onPress={() =>
              router.push({
                pathname: '/parametres-affichage',
                params: { id, mode: 'bubble' },
              })
            }
          >
            <Text style={styles.modeBtnText}>Lecture Mode bulle</Text>
          </Pressable>

          <Pressable
            style={styles.modeBtn}
            onPress={() =>
              router.push({
                pathname: '/pomodoro',
                params: { id, mode: 'focus' },
              })
            }
          >
            <Text style={styles.modeBtnText}>Lecture Mode focus</Text>
          </Pressable>

          <Pressable
            style={styles.modeBtn}
            onPress={() =>
              router.push({
                pathname: '/reader/classic',
                params: { id },
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
});  */



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

type ReadingBookFallback = {
  title: string;
  coverUrl: string;
  description: string;
  progress: number;
};



const READING_BOOKS_BY_ID: Record<string, ReadingBookFallback> = {
  '1': {
    title: 'Roméo et Juliette',
    coverUrl:
      'https://images.epagine.fr/094/9782264081094_1_75.jpg',
    description:
      "L’histoire tragique de deux amants issus de familles ennemies, dont l’amour impossible est devenu l’un des plus grands classiques de la littérature.",
    progress: 23,
  },
  '2': {
    title: 'Dracula',
    coverUrl:
      'https://products-images.di-static.com/image/bram-stoker-dracula/9781435129733-475x500-1.jpg',
    description:
      "Un roman gothique emblématique où mystère, tension et horreur se mêlent autour de l’inquiétant comte Dracula.",
    progress: 61,
  },
};

export default function BookDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    title?: string;
    coverUrl?: string;
    progress?: string;
    description?: string;
  }>();

  const isScannedBook = String(params.id ?? '').startsWith('scan-');

  const fallback = params.id ? READING_BOOKS_BY_ID[params.id] : undefined;

  const title = params.title ?? fallback?.title ?? 'Livre';
  const coverUrl = params.coverUrl ?? fallback?.coverUrl ?? '';
  const progress = Number(params.progress ?? fallback?.progress ?? 0);
  const description =
    params.description ??
    fallback?.description ??
    'Aucune description disponible pour ce livre.';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.backBtn} onPress={() => router.push('/(tabs)/bibliotheque')}>
          <Ionicons name="chevron-back" size={28} color="#E8A23A" />
        </Pressable>

        <View style={styles.coverWrap}>
          <Image
            source={{ uri: coverUrl }}
            style={styles.cover}
            contentFit="cover"
          />
        </View>
        {isScannedBook ? (
  <View style={styles.paperBadge}>
    <Text style={styles.paperBadgeText}>Format papier</Text>
  </View>
) : null}

        <View style={styles.progressBlock}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>

        <View style={styles.buttonsWrap}>
  <Pressable
    style={[styles.modeBtn, isScannedBook && styles.modeBtnDisabled]}
    onPress={() => {
      if (isScannedBook) return;
      router.push({
        pathname: '/parametres-affichage',
        params: {
          id: params.id,
          title,
          coverUrl,
          progress: String(progress),
          description,
        },
      });
    }}
  >
    <Text
      style={[
        styles.modeBtnText,
        isScannedBook && styles.modeBtnTextDisabled,
      ]}
    >
      Lecture Mode bulle
    </Text>
  </Pressable>

  <Pressable
    style={styles.modeBtn}
    onPress={() =>
      router.push({
        pathname: '/pomodoro',
        params: {
          id: params.id,
          title,
          coverUrl,
          progress: String(progress),
          description,
        },
      })
    }
  >
    <Text style={styles.modeBtnText}>Lecture Mode focus</Text>
  </Pressable>

  <Pressable
    style={[styles.modeBtn, isScannedBook && styles.modeBtnDisabled]}
    onPress={() => {
      if (isScannedBook) return;
      router.push({
        pathname: '/reader/classic',
        params: {
          id: params.id,
          title,
          coverUrl,
          progress: String(progress),
          description,
        },
      });
    }}
  >
    <Text
      style={[
        styles.modeBtnText,
        isScannedBook && styles.modeBtnTextDisabled,
      ]}
    >
      Lecture Classique
    </Text>
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
    fontFamily: 'GillSans-Bold',
    //fontWeight:'700',
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
  paperBadge: {
    alignSelf: 'center',
    marginTop: 12,
    backgroundColor: '#EFD6A5',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  
  paperBadgeText: {
    color: '#A36A00',
    fontSize: 13,
    fontFamily: 'GillSans-Bold',
  },
  
  modeBtnDisabled: {
    backgroundColor: '#E7D5BE',
  },
  
  modeBtnTextDisabled: {
    color: 'rgba(41,20,37,0.45)',
  },
});