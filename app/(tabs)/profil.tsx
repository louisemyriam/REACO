import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Href, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';

type Book = { id: string; title: string; coverUrl: string; badge?: string };
type Post = { id: string; author: string; text: string; imageUrl: string };

export default function ProfilScreen() {
  const router = useRouter();
  const screenW = Dimensions.get('window').width;

  // Fake user (cohérent)
  const [user] = useState({
    fullName: 'Léa',
    username: 'Lea1234',
    avatarUrl:
      'https://i.imgur.com/8Q1Z5Zk.png', // mets ton image ou laisse vide
    followers: 20,
    following: 32,
    lectures: 5,
    plumes: 25,
  });

  // Streak / série
  const [streak] = useState({
    days: 12,
    freezeLeftText: 'Gèle tes flammes pendant 1 ou 2 jours',
    option1: { label: '1 jour', cost: 25 },
    option2: { label: '2 jours', cost: 55 },
  });

  const booksRead: Book[] = useMemo(
    () => [
      {
        id: 'b1',
        title: 'Légitime démence',
        coverUrl:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691515262l/195910083.jpg',
      },
      {
        id: 'b2',
        title: 'Méfie-toi',
        coverUrl:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1564472250l/51460410.jpg',
        badge: 'NOUVEAUTÉ',
      },
      {
        id: 'b3',
        title: 'Et tombent les têtes',
        coverUrl:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1698004214l/199709804.jpg',
      },
      {
        id: 'b4',
        title: 'Conte de fées',
        coverUrl:
          'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1642954550l/60177373.jpg',
        badge: 'NOUVEAUTÉ',
      },
    ],
    []
  );

  const posts: Post[] = useMemo(
    () => [
      {
        id: 'p1',
        author: user.username,
        text: 'Vous conseillez quoi comme bouquins pour cet hiver ?',
        imageUrl:
          'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80&auto=format&fit=crop',
      },
      {
        id: 'p2',
        author: user.username,
        text: 'Je viens de finir un thriller… incroyable.',
        imageUrl:
          'https://images.unsplash.com/photo-1455885666463-299283a18c03?w=1200&q=80&auto=format&fit=crop',
      },
    ],
    [user.username]
  );

  const goalCards = useMemo(() => [1, 2], []);

  const coverW = Math.floor((screenW - 18 * 2 - 12 * 2) / 3);
  const coverH = Math.floor(coverW * 1.45);

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#FEF1EA', '#FEC271']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top-right icons (1 seul settings) */}
      <View style={styles.topIcons}>
        <Pressable style={styles.iconBtn} onPress={() => router.push('/dashboard' as Href)}>
          <Ionicons name="bar-chart-outline" size={22} color="#BD61A6" />
        </Pressable>

        <Pressable style={styles.iconBtn} onPress={() => router.push('/parametres' as Href)}>
    <Ionicons name="settings-outline" size={22} color="#BD61A6" />
  </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header profile row */}
        <View style={styles.profileRow}>
          <View style={styles.avatarWrap}>
            {user.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarLetter}>{user.fullName?.[0] ?? 'U'}</Text>
              </View>
            )}
          </View>

          <View style={{ flex: 1 }}>
            <View style={styles.nameRow}>
              <Text style={styles.username}>{user.username}</Text>
              <View style={{ flex: 1 }} />

              <View style={styles.plumesPill}>
                <Text style={styles.plumesText}>{user.plumes}</Text>
                <Ionicons name="feather-outline" size={14} color="#BD61A6" />
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statNum}>{user.followers}</Text>
                <Text style={styles.statLabel}>Abonnés</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNum}>{user.following}</Text>
                <Text style={styles.statLabel}>Abonnements</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNum}>{user.lectures}</Text>
                <Text style={styles.statLabel}>Lecture</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Streak card */}
        <View style={styles.streakCard}>
          <View style={styles.streakTop}>
            <View style={styles.calendarIcon}>
              <Ionicons name="calendar-outline" size={18} color="#BD61A6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.streakTitle}>Série de lecture</Text>
              <Text style={styles.streakSub}>Continuez comme ça !</Text>
            </View>
          </View>

          <View style={styles.streakBoxesRow}>
            {Array.from({ length: 6 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.streakBox,
                  i === 2 ? styles.streakBoxActive : null,
                ]}
              >
                {i === 2 ? (
                  <>
                    <Text style={styles.streakDays}>{streak.days}</Text>
                    <Text style={styles.streakDaysLabel}>jours</Text>
                  </>
                ) : null}
              </View>
            ))}
          </View>

          <Text style={styles.freezeHint}>{streak.freezeLeftText}</Text>

          <View style={styles.freezeBtns}>
            <Pressable style={styles.freezeBtn}>
              <Text style={styles.freezeBtnText}>
                {streak.option1.label} {streak.option1.cost}
              </Text>
              <Ionicons name="feather-outline" size={14} color="#BD61A6" />
            </Pressable>

            <Pressable style={styles.freezeBtn}>
              <Text style={styles.freezeBtnText}>
                {streak.option2.label} {streak.option2.cost}
              </Text>
              <Ionicons name="feather-outline" size={14} color="#BD61A6" />
            </Pressable>
          </View>
        </View>

        {/* Livres lus */}
        <Text style={styles.sectionTitle}>Livres lus</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
          {booksRead.map((b) => (
            <View key={b.id} style={{ width: coverW }}>
              <Pressable style={[styles.coverCard, { width: coverW, height: coverH }]}>
                <Image source={{ uri: b.coverUrl }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
                {b.badge ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{b.badge}</Text>
                  </View>
                ) : null}
              </Pressable>
            </View>
          ))}
        </ScrollView>

        {/* Objectifs */}
        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Créer tes objectifs</Text>

        <View style={styles.goalsGrid}>
          {goalCards.map((n) => (
            <Pressable
              key={n}
              style={styles.goalCard}
              onPress={() => router.push('/objectif' as Href)}
            />
          ))}

          <Pressable style={[styles.goalCard, styles.goalAdd]} onPress={() => router.push('/creerobjectif' as Href)}>
            <Ionicons name="add" size={28} color="rgba(41,20,37,0.55)" />
          </Pressable>
        </View>

        {/* mini progress bar like mock */}
        <View style={styles.goalProgressBarWrap}>
          <View style={[styles.goalProgressBarFill, { width: '23%' }]} />
        </View>
        <Text style={styles.goalPercent}>23%</Text>

        {/* Posts */}
        <View style={styles.postsHeader}>
          <Text style={styles.sectionTitle}>Posts</Text>
          <Pressable>
            <Text style={styles.seeAll}>Voir tout</Text>
          </Pressable>
        </View>

        {posts.map((p) => (
          <View key={p.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAvatarMini} />
              <View style={{ flex: 1 }}>
                <Text style={styles.postAuthor}>{p.author}</Text>
                <Text style={styles.postText}>{p.text}</Text>
              </View>
            </View>

            <View style={styles.postImageWrap}>
              <Image source={{ uri: p.imageUrl }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
            </View>
          </View>
        ))}

        {/* Floating + */}
        <Pressable style={styles.fab}>
          <Ionicons name="add" size={24} color="#FEF1EA" />
        </Pressable>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FEF1EA' },

  topIcons: {
    position: 'absolute',
    right: 14,
    top: 52,
    zIndex: 10,
    flexDirection: 'row',
  },
  iconBtn: {
    width: 38,
    height: 38,
    //borderRadius: 12,
    //backgroundColor: 'rgba(255,255,255,0.70)',
   // borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    paddingTop: 100,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },

  // Profile header
  profileRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  avatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(189,97,166,0.20)',
    borderWidth: 2,
    borderColor: 'rgba(189,97,166,0.35)',
  },
  avatarFallback: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  avatarLetter: { fontWeight: '900', color: '#291425', fontSize: 22, fontFamily: 'GillSans'},

  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  username: { fontWeight: '900', color: '#291425', fontSize: 18, fontFamily: 'GillSans'},
  smallIconInline: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  plumesPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.70)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },
  plumesText: { fontWeight: '900', color: '#291425' },

  statsRow: { flexDirection: 'row', gap: 18, marginTop: 10 },
  stat: {},
  statNum: { fontWeight: '900', color: '#BD61A6', fontSize: 14 },
  statLabel: { fontWeight: '800', color: 'rgba(41,20,37,0.55)', fontSize: 12 },

  // Streak
  streakCard: {
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
    borderRadius: 16,
    padding: 14,
  },
  streakTop: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  calendarIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: 'rgba(252,176,64,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakTitle: { fontWeight: '900', color: '#291425', fontSize: 14 },
  streakSub: { fontWeight: '800', color: 'rgba(41,20,37,0.55)', marginTop: 2, fontSize: 12 },

  streakBoxesRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  streakBox: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: 'rgba(252,176,64,0.25)',
  },
  streakBoxActive: {
    backgroundColor: 'rgba(252,176,64,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakDays: { fontWeight: '900', color: '#291425', fontSize: 18, lineHeight: 20 },
  streakDaysLabel: { fontWeight: '900', color: '#291425', fontSize: 11 },

  freezeHint: {
    marginTop: 12,
    fontWeight: '800',
    color: 'rgba(41,20,37,0.55)',
    fontSize: 12,
  },
  freezeBtns: { flexDirection: 'row', gap: 10, marginTop: 10 },
  freezeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(189,97,166,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },
  freezeBtnText: { fontWeight: '900', color: '#291425', fontSize: 12 },

  // Sections
  sectionTitle: { marginTop: 16, marginBottom: 10, fontWeight: '900', color: '#291425', fontSize: 16 },

  coverCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },
  badge: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    backgroundColor: '#E53935',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  badgeText: { color: '#fff', fontWeight: '900', fontSize: 10 },

  // Goals
  goalsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  goalCard: {
    flex: 1,
    height: 90,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },
  goalAdd: { justifyContent: 'center', alignItems: 'center' },

  goalProgressBarWrap: {
    height: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(189,97,166,0.18)',
    overflow: 'hidden',
    marginTop: 10,
  },
  goalProgressBarFill: { height: '100%', backgroundColor: '#BD61A6' },
  goalPercent: { marginTop: 6, fontWeight: '900', color: 'rgba(41,20,37,0.55)' },

  // Posts
  postsHeader: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAll: { fontWeight: '900', color: '#BD61A6' },

  postCard: {
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
    overflow: 'hidden',
  },
  postHeader: { flexDirection: 'row', gap: 10, padding: 12 },
  postAvatarMini: {
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: 'rgba(189,97,166,0.22)',
  },
  postAuthor: { fontWeight: '900', color: '#291425' },
  postText: { marginTop: 4, fontWeight: '700', color: 'rgba(41,20,37,0.70)', fontSize: 12 },
  postImageWrap: { height: 180, backgroundColor: '#fff' },

  // Floating button
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#BD61A6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
});