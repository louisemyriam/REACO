import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type Tab = 'feed' | 'club' | 'event';

type Post = {
  id: string;
  user: string;
  content: string;
  imageUrl?: string;
  liked: boolean;
  likes: number;
};

type Creator = {
  pseudo: string;
  avatarUrl: string;
};

type ClubRoom = {
  id: string;
  name: string;
  desc: string;
};

type BookClub = {
  id: string;
  title: string;
  coverUrl: string;
  members: number;
  activity: string;
  genres: string[];
  creator: Creator;
  rooms: ClubRoom[];
};

const START_POSTS: Post[] = [
  {
    id: '1',
    user: 'Erik000002',
    content:
      "Quelqu’un a compris pourquoi dans Les 200 guerriers le général n’a pas battu en retraite ?",
    liked: false,
    likes: 7,
  },
  {
    id: '2',
    user: 'Rainbow26',
    content: 'On en parle du dernier chapitre de Powerfull ?',
    imageUrl:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop',
    liked: true,
    likes: 24,
  },
];

const CLUBS: BookClub[] = [
  {
    id: 'c1',
    title: 'Powerful tome I',
    coverUrl:
      'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1200',
    members: 128,
    activity: 'Actif aujourd’hui',
    genres: ['Cozy', 'Feel-good', 'Romance'],
    creator: {
      pseudo: 'mimi_reads',
      avatarUrl:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    rooms: [
      { id: 'r1', name: 'Lobby', desc: 'Discussions générales' },
      { id: 'r2', name: 'Intros', desc: 'Présente-toi au club' },
      { id: 'r3', name: 'Recommandations', desc: 'Les recos du moment' },
    ],
  },
  {
    id: 'c2',
    title: 'Bridgerton 3 & 4',
    coverUrl:
      'https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=1200',
    members: 342,
    activity: 'Très actif',
    genres: ['Romance', 'Drama'],
    creator: {
      pseudo: 'noir_queen',
      avatarUrl:
        'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    rooms: [
      { id: 'r1', name: 'Lobby', desc: 'On discute' },
      { id: 'r2', name: 'Spoilers', desc: 'Zone spoilers' },
      { id: 'r3', name: 'Lectures', desc: 'Avancement' },
    ],
  },
];

// Event mock (tu mettras tes vraies données après)
const EVENT = {
  title: 'Challenge de Mars 2026',
  remaining: '2 jours restants',
  desc: 'LISEZ 5 ROMANS DE ROMANCE\nGagne une musique exclusive et 50 points !',
  progressLabelLeft: 'Progression',
  progressLabelRight: '3/5 livres lus',
  progressPct: 0.6,
};

export default function FilActualiteScreen() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<Tab>('club');

  // FEED
  const [text, setText] = useState('');
  const [posts, setPosts] = useState<Post[]>(START_POSTS);

  // CLUB
  const [selectedClub, setSelectedClub] = useState<BookClub | null>(null);
  const [joinedClubIds, setJoinedClubIds] = useState<Record<string, boolean>>({});

  const filteredPosts = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return posts;
    return posts.filter((p) =>
      (p.user + ' ' + p.content).toLowerCase().includes(s)
    );
  }, [posts, search]);

  const filteredClubs = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return CLUBS;
    return CLUBS.filter((c) =>
      (c.title + ' ' + c.genres.join(' ')).toLowerCase().includes(s)
    );
  }, [search]);

  const publish = () => {
    const value = text.trim();
    if (!value) return;

    const newPost: Post = {
      id: String(Date.now()),
      user: 'Vous',
      content: value,
      liked: false,
      likes: 0,
    };

    setPosts((prev) => [newPost, ...prev]);
    setText('');
  };

  const togglePostLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const nextLiked = !p.liked;
        return {
          ...p,
          liked: nextLiked,
          likes: nextLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
        };
      })
    );
  };

  const joinClub = (clubId: string) => {
    setJoinedClubIds((prev) => ({ ...prev, [clubId]: true }));
  };

  const data = tab === 'feed' ? filteredPosts : tab === 'club' ? filteredClubs : [];

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={['#FEF1EA', '#FEC271']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={styles.listContent}
          data={data as any}
          keyExtractor={(item: any) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          ListHeaderComponent={
            <View>
              {/* Search */}
              <View style={styles.searchBox}>
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Rechercher"
                  placeholderTextColor="rgba(41,20,37,0.45)"
                  style={styles.searchInput}
                />
                <Ionicons name="search" size={18} color="rgba(41,20,37,0.6)" />
              </View>

              {/* Tabs + Mascotte row */}
              <View style={styles.headerRow}>
                <View style={styles.verticalTabs}>
                  <Pressable
                    onPress={() => setTab('feed')}
                    style={[
                      styles.vTab,
                      tab === 'feed' ? styles.vTabActive : styles.vTabInactive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.vTabText,
                        tab === 'feed' ? styles.vTabTextActive : styles.vTabTextInactive,
                      ]}
                    >
                      Feed
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setTab('club')}
                    style={[
                      styles.vTab,
                      tab === 'club' ? styles.vTabActive : styles.vTabInactive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.vTabText,
                        tab === 'club' ? styles.vTabTextActive : styles.vTabTextInactive,
                      ]}
                    >
                      Club
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setTab('event')}
                    style={[
                      styles.vTab,
                      tab === 'event' ? styles.vTabActive : styles.vTabInactive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.vTabText,
                        tab === 'event' ? styles.vTabTextActive : styles.vTabTextInactive,
                      ]}
                    >
                      Event
                    </Text>
                  </Pressable>
                </View>

                {/* Mascotte (placeholder) */}
                <View style={styles.mascotWrap}>

                  <Image
  source={require('../../assets/images/ridzy_feed_mascotte.png')}
  style={styles.mascot}
  contentFit="contain"
/>
                </View>
              </View>

              {/* Composer only on feed */}
              {tab === 'feed' ? (
                <View style={styles.composer}>
                  <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Partagez vos réflexions sur votre lecture..."
                    placeholderTextColor="rgba(41,20,37,0.45)"
                    multiline
                    style={styles.composerInput}
                  />

                  <View style={styles.composerBottom}>
                    <Pressable style={styles.mediaBtn}>
                      <Ionicons name="image-outline" size={22} color="#FBB040" />
                    </Pressable>

                    <Pressable onPress={publish} style={styles.publishBtn}>
                      <Text style={styles.publishText}>Publier</Text>
                    </Pressable>
                  </View>
                </View>
              ) : null}

              {/* EVENT header card */}
              {tab === 'event' ? (
                <View style={styles.eventCard}>
                  <View style={styles.eventTopRow}>
                    <Text style={styles.eventTitle}>{EVENT.title}</Text>
                    <View style={styles.eventPill}>
                      <Text style={styles.eventPillText}>{EVENT.remaining}</Text>
                    </View>
                  </View>

                  <Text style={styles.eventDesc}>{EVENT.desc}</Text>

                  <View style={styles.eventProgRow}>
                    <Text style={styles.eventProgLabel}>{EVENT.progressLabelLeft}</Text>
                    <Text style={styles.eventProgRight}>{EVENT.progressLabelRight}</Text>
                  </View>

                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${Math.round(EVENT.progressPct * 100)}%` }]} />
                  </View>
                </View>
              ) : null}
            </View>
          }
          ListEmptyComponent={
            tab === 'event' ? (
              <View style={{ height: 12 }} />
            ) : (
              <View style={styles.empty}>
                <Text style={styles.emptyTitle}>
                  {tab === 'feed' ? 'Aucun post' : 'Aucun club'}
                </Text>
                <Text style={styles.emptyText}>
                  {tab === 'feed'
                    ? 'Essayez une autre recherche ou publiez un message.'
                    : 'Essayez une autre recherche.'}
                </Text>
              </View>
            )
          }
          renderItem={({ item }: any) => {
            if (tab === 'feed') {
              const p = item as Post;
              return (
                <View style={styles.postCard}>
                  <View style={styles.postHeaderRow}>
                    <View style={styles.postAvatar} />
                    <Text style={styles.user}>{p.user}</Text>
                  </View>

                  <Text style={styles.content}>{p.content}</Text>

                  {p.imageUrl ? (
                    <View style={styles.postImage}>
                      <Image
                        source={{ uri: p.imageUrl }}
                        style={StyleSheet.absoluteFillObject}
                        contentFit="cover"
                      />
                    </View>
                  ) : null}

                  <View style={styles.actions}>
                    <Pressable
                      onPress={() => togglePostLike(p.id)}
                      style={styles.actionBtn}
                    >
                      <Ionicons
                        name={p.liked ? 'heart' : 'heart-outline'}
                        size={18}
                        color={p.liked ? '#BD61A6' : 'rgba(41,20,37,0.65)'}
                      />
                    </Pressable>

                    <Pressable style={styles.actionBtn}>
                      <Ionicons
                        name="chatbubble-outline"
                        size={18}
                        color="rgba(41,20,37,0.65)"
                      />
                    </Pressable>

                    <Pressable style={styles.actionBtn}>
                      <Ionicons
                        name="paper-plane-outline"
                        size={18}
                        color="rgba(41,20,37,0.65)"
                      />
                    </Pressable>
                  </View>
                </View>
              );
            }

            if (tab === 'club') {
              const c = item as BookClub;
              return (
                <Pressable
                  style={styles.clubCard}
                  onPress={() => setSelectedClub(c)}
                >
                  <View style={styles.clubCover}>
                    <Image
                      source={{ uri: c.coverUrl }}
                      style={StyleSheet.absoluteFillObject}
                      contentFit="cover"
                    />
                  </View>
                </Pressable>
              );
            }

            return null;
          }}
        />

        {/* CLUB MODAL */}
        <Modal
          visible={!!selectedClub}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedClub(null)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Pressable style={styles.modalClose} onPress={() => setSelectedClub(null)}>
                <Ionicons name="close" size={18} color="rgba(41,20,37,0.75)" />
              </Pressable>

              {selectedClub ? (
                <>
                  <View style={styles.modalCover}>
                    <Image
                      source={{ uri: selectedClub.coverUrl }}
                      style={StyleSheet.absoluteFillObject}
                      contentFit="cover"
                    />
                  </View>

                  <Text style={styles.modalTitle}>{selectedClub.title}</Text>

                  <View style={styles.modalTopRow}>
                    <View style={styles.creatorRow}>
                      <Image source={{ uri: selectedClub.creator.avatarUrl }} style={styles.avatarSmall} />
                      <Text style={styles.creatorText}>@{selectedClub.creator.pseudo}</Text>
                    </View>

                    <View style={styles.joinRow}>
                      <Pressable
                        onPress={() => joinClub(selectedClub.id)}
                        style={[
                          styles.joinBtn,
                          joinedClubIds[selectedClub.id] ? styles.joinBtnDone : null,
                        ]}
                      >
                        <Text style={styles.joinText}>
                          {joinedClubIds[selectedClub.id] ? 'Membre' : 'Join'}
                        </Text>
                      </Pressable>

                      <View style={styles.membersPillSmall}>
                        <Ionicons name="people" size={14} color="rgba(41,20,37,0.7)" />
                        <Text style={styles.membersText}>{selectedClub.members}</Text>
                      </View>
                    </View>
                  </View>

                  <Text style={styles.modalMeta}>{selectedClub.activity}</Text>

                  <View style={styles.genreRow}>
                    {selectedClub.genres.map((g) => (
                      <View key={g} style={styles.genrePill}>
                        <Text style={styles.genreText}>{g}</Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.roomsTitle}>Chat rooms</Text>

                  <View style={{ gap: 10 }}>
                    {selectedClub.rooms.map((r) => (
                      <Pressable key={r.id} style={styles.roomItem}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.roomName}>#{r.name}</Text>
                          <Text style={styles.roomDesc}>{r.desc}</Text>
                        </View>
                        <Ionicons
                          name="chevron-forward"
                          size={16}
                          color="rgba(41,20,37,0.45)"
                        />
                      </Pressable>
                    ))}
                  </View>
                </>
              ) : null}
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FEF1EA' },
  listContent: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 22 },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'GillSans',
    color: '#291425',
    marginRight: 10,
  },

  headerRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  verticalTabs: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

 vTab: {
  width: 42,
  height: 92,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
},
  vTabActive: {
    backgroundColor: '#FBB040',
    borderColor: 'rgba(41,20,37,0.10)',
  },
  vTabInactive: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderColor: 'rgba(41,20,37,0.10)',
  },
  vTabText: {
    fontWeight: '900',
    fontSize: 14,
    transform: [{ rotate: '-90deg' }],
  },
  vvTabTextActive: { color: '#FFFFFF' },
  vTabTextInactive: { color: '#FBB040' },

  mascotWrap: {
    width: 120,
    height: 90,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  mascot: {
    width: 120,
    height: 90,
  },

  // FEED composer
  composer: {
    marginTop: 14,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  composerInput: {
    minHeight: 70,
    textAlignVertical: 'top',
    fontSize: 14,
    fontWeight: '700',
    color: '#291425',
  },
  composerBottom: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mediaBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishBtn: {
    backgroundColor: '#FBB040',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  publishText: { fontSize: 13, fontWeight: '900', color: '#FEF1EA' },

  // EVENT
  eventCard: {
    marginTop: 14,
    backgroundColor: 'rgba(255,255,255,0.45)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 3,
    borderColor: '#3B82F6',
  },
  eventTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  eventTitle: { fontSize: 20, fontWeight: '900', color: '#FEF1EA', width: '70%' },
  eventPill: {
    backgroundColor: 'rgba(255,255,255,0.35)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
  },
  eventPillText: { fontWeight: '900', color: '#FEF1EA' },
  eventDesc: {
    marginTop: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.95)',
    lineHeight: 18,
  },
  eventProgRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventProgLabel: { fontWeight: '900', color: '#FEF1EA' },
  eventProgRight: { fontWeight: '900', color: '#FEF1EA' },
  progressTrack: {
    marginTop: 8,
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.35)',
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#FEF1EA' },

  // FEED cards
  postCard: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  postHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  postAvatar: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: 'rgba(189,97,166,0.22)',
  },
  user: {
    fontSize: 14,
    fontWeight: '900',
    color: '#291425',
  },
  content: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '700',
    color: '#291425',
    lineHeight: 20,
  },
  postImage: {
    marginTop: 12,
    width: '100%',
    height: 210,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF4EC',
  },
  actions: { flexDirection: 'row', gap: 14, alignItems: 'center', marginTop: 12 },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },

  // CLUB cards
  clubCard: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  clubCover: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF4EC',
  },

  empty: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
    marginTop: 10,
  },
  emptyTitle: { fontSize: 14, fontWeight: '900', color: '#291425', marginBottom: 6 },
  emptyText: { fontSize: 13, fontWeight: '700', color: 'rgba(41,20,37,0.65)', lineHeight: 18 },

  // CLUB modal (identique à ton style)
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(41,20,37,0.45)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFF4EC',
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  modalClose: {
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },
  modalCover: {
    width: '100%',
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  modalTitle: { marginTop: 12, fontSize: 18, fontWeight: '900', color: '#291425' },
  modalTopRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  creatorRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatarSmall: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFFFFF' },
  creatorText: { fontSize: 13, fontWeight: '800', color: 'rgba(41,20,37,0.75)' },
  joinRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  joinBtn: { backgroundColor: '#FBB040', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14 },
  joinBtnDone: { backgroundColor: '#BD61A6' },
  joinText: { fontSize: 13, fontWeight: '900', color: '#291425' },
  membersPillSmall: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },
  membersText: { fontSize: 12, fontWeight: '800', color: 'rgba(41,20,37,0.70)' },
  modalMeta: { marginTop: 10, fontSize: 13, fontWeight: '700', color: 'rgba(41,20,37,0.65)' },
  genreRow: { marginTop: 8, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  genrePill: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  genreText: { fontSize: 12, fontWeight: '700', color: 'rgba(41,20,37,0.70)' },
  roomsTitle: { marginTop: 14, marginBottom: 10, fontSize: 14, fontWeight: '900', color: '#291425' },
  roomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  roomName: { fontSize: 13, fontWeight: '900', color: '#291425' },
  roomDesc: { marginTop: 2, fontSize: 12, color: 'rgba(41,20,37,0.60)' },
});