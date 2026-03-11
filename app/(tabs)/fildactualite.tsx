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
    user: 'Eric02',
    content:
      "Quelqu’un a compris pourquoi dans Les 200 derniers, le général n’a pas battu en retraite ?",
    liked: false,
    likes: 7,
  },
  {
    id: '2',
    user: 'Rainbow26',
    content: 'On en parle du dernier chapitre de Powerfull ??',
    imageUrl:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop',
    liked: true,
    likes: 24,
  },
];

const CLUBS: BookClub[] = [
  {
    id: 'c1',
    title: 'Soft Book Club',
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
      { id: 'r3', name: 'Recommandations', desc: 'Les livres doux du moment' },
    ],
  },
  {
    id: 'c2',
    title: 'Les folles du Dark',
    coverUrl:
      'https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=1200',
    members: 342,
    activity: 'Très actif',
    genres: ['Dark romance', 'Thriller', 'Spicy'],
    creator: {
      pseudo: 'noir_queen',
      avatarUrl:
        'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    rooms: [
      { id: 'r1', name: 'Lobby', desc: 'On discute sans filtre' },
      { id: 'r2', name: 'Warnings', desc: 'TW / limites / règles' },
      { id: 'r3', name: 'Lectures du mois', desc: 'Choix & votes' },
    ],
  },
  {
    id: 'c3',
    title: 'Le Cosy Bookclub',
    coverUrl:
      'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1200',
    members: 205,
    activity: 'Actif cette semaine',
    genres: ['Cozy mystery', 'Slice of life', 'Classiques'],
    creator: {
      pseudo: 'tea.and.pages',
      avatarUrl:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    rooms: [
      { id: 'r1', name: 'Lobby', desc: 'Thé, plaids, chapitres' },
      { id: 'r2', name: 'Spoilers', desc: 'Zone spoilers' },
      { id: 'r3', name: 'Cosy recos', desc: 'Idées lectures cocoon' },
    ],
  },
  {
    id: 'c4',
    title: 'Colleen Hoover',
    coverUrl:
      'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1200',
    members: 511,
    activity: 'Actif maintenant',
    genres: ['Romance', 'Drama', 'New Adult'],
    creator: {
      pseudo: 'coho_addict',
      avatarUrl:
        'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    rooms: [
      { id: 'r1', name: 'Lobby', desc: 'Tout CoHo' },
      { id: 'r2', name: 'Lectures en cours', desc: 'Avancement par chapitre' },
      { id: 'r3', name: 'Hot takes', desc: 'Débats & opinions' },
    ],
  },
  {
    id: 'c5',
    title: 'Love & Drama',
    coverUrl:
      'https://images.pexels.com/photos/1301585/pexels-photo-1301585.jpeg?auto=compress&cs=tinysrgb&w=1200',
    members: 274,
    activity: 'Actif aujourd’hui',
    genres: ['Romance', 'Drama', 'Enemies to lovers'],
    creator: {
      pseudo: 'drama_reader',
      avatarUrl:
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    rooms: [
      { id: 'r1', name: 'Lobby', desc: 'Bienvenue' },
      { id: 'r2', name: 'Intros', desc: 'Présente-toi' },
      { id: 'r3', name: 'Recos', desc: 'Les meilleurs dramas' },
      { id: 'r4', name: 'Spoilers', desc: 'Zone spoilers' },
    ],
  },
];

export default function FilActualiteScreen() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'feed' | 'club'>('feed');

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

  const data = tab === 'feed' ? filteredPosts : filteredClubs;

  return (
    <SafeAreaView style={styles.safe}>
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
                  placeholderTextColor="rgba(41,20,37,0.55)"
                  style={styles.searchInput}
                />
                <Ionicons name="search" size={18} color="rgba(41,20,37,0.6)" />
              </View>

              {/* Segmented buttons */}
              <View style={styles.segmentRow}>
                <Pressable
                  onPress={() => setTab('feed')}
                  style={[
                    styles.segmentBtn,
                    tab === 'feed' ? styles.segmentActive : styles.segmentInactive,
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      tab === 'feed'
                        ? styles.segmentTextActive
                        : styles.segmentTextInactive,
                    ]}
                  >
                    Fil d’actu
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setTab('club')}
                  style={[
                    styles.segmentBtn,
                    tab === 'club' ? styles.segmentActive : styles.segmentInactive,
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      tab === 'club'
                        ? styles.segmentTextActive
                        : styles.segmentTextInactive,
                    ]}
                  >
                    Club
                  </Text>
                </Pressable>
              </View>

              {/* Composer only on feed */}
              {tab === 'feed' ? (
                <View style={styles.composer}>
                  <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Partagez vos réflexions sur votre lecture..."
                    placeholderTextColor="rgba(41,20,37,0.55)"
                    multiline
                    style={styles.composerInput}
                  />
                  <Pressable onPress={publish} style={styles.publishBtn}>
                    <Text style={styles.publishText}>Publier</Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          }
          ListEmptyComponent={
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
          }
          renderItem={({ item }: any) => {
            if (tab === 'feed') {
              const p = item as Post;
              return (
                <View style={styles.postCard}>
                  <Text style={styles.user}>{p.user}</Text>
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
                      <Text style={styles.actionText}>{p.likes}</Text>
                    </Pressable>

                    <Pressable style={styles.actionBtn}>
                      <Ionicons
                        name="chatbubble-outline"
                        size={18}
                        color="rgba(41,20,37,0.65)"
                      />
                      <Text style={styles.actionText}>Commenter</Text>
                    </Pressable>

                    <Pressable style={styles.actionBtn}>
                      <Ionicons
                        name="paper-plane-outline"
                        size={18}
                        color="rgba(41,20,37,0.65)"
                      />
                      <Text style={styles.actionText}>Partager</Text>
                    </Pressable>
                  </View>
                </View>
              );
            }

            // CLUB CARD
            const c = item as BookClub;
            return (
              <Pressable
                style={styles.clubCard}
                onPress={() => setSelectedClub(c)}
              >
                {/* Cover */}
                <View style={styles.clubCover}>
                  <Image
                    source={{ uri: c.coverUrl }}
                    style={StyleSheet.absoluteFillObject}
                    contentFit="cover"
                  />
                </View>

                {/* Row: avatar + title + members */}
                <View style={styles.clubInfoRow}>
                  <Image source={{ uri: c.creator.avatarUrl }} style={styles.avatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.clubTitle} numberOfLines={1}>
                      {c.title}
                    </Text>
                    <Text style={styles.clubMeta} numberOfLines={1}>
                      @{c.creator.pseudo} • {c.activity}
                    </Text>
                  </View>

                  <View style={styles.membersPill}>
                    <Ionicons name="people" size={14} color="rgba(41,20,37,0.7)" />
                    <Text style={styles.membersText}>{c.members}</Text>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />

        {/* POPUP / MODAL */}
        <Modal
          visible={!!selectedClub}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedClub(null)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              {/* close */}
              <Pressable style={styles.modalClose} onPress={() => setSelectedClub(null)}>
                <Ionicons name="close" size={18} color="rgba(41,20,37,0.75)" />
              </Pressable>

              {selectedClub ? (
                <>
                  {/* cover */}
                  <View style={styles.modalCover}>
                    <Image
                      source={{ uri: selectedClub.coverUrl }}
                      style={StyleSheet.absoluteFillObject}
                      contentFit="cover"
                    />
                  </View>

                  {/* title */}
                  <Text style={styles.modalTitle}>{selectedClub.title}</Text>

                  {/* creator + join + members */}
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

                  {/* activity + genres */}
                  <Text style={styles.modalMeta}>
                    {selectedClub.activity}
                  </Text>

                  <View style={styles.genreRow}>
                    {selectedClub.genres.map((g) => (
                      <View key={g} style={styles.genrePill}>
                        <Text style={styles.genreText}>{g}</Text>
                      </View>
                    ))}
                  </View>

                  {/* rooms */}
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
  safe: { flex: 1, backgroundColor: '#FFF4EC' },
  listContent: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 18 },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#291425',
    marginRight: 10,
  },

  segmentRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: '#FBB040',
    borderColor: 'rgba(41,20,37,0.10)',
  },
  segmentInactive: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderColor: 'rgba(41,20,37,0.10)',
  },
  segmentText: { fontSize: 13, fontWeight: '800' },
  segmentTextActive: { color: '#291425' },
  segmentTextInactive: { color: 'rgba(41,20,37,0.65)' },

  composer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
    marginBottom: 12,
  },
  composerInput: {
    minHeight: 90,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#291425',
    lineHeight: 20,
  },
  publishBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
    backgroundColor: '#FBB040',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  publishText: { fontSize: 13, fontWeight: '900', color: '#291425' },

  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  user: {
    fontSize: 13,
    fontWeight: '900',
    color: '#291425',
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    color: '#291425',
    lineHeight: 20,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 190,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#FFF4EC',
    marginBottom: 10,
  },
  actions: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  actionBtn: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,244,236,0.90)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.06)',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(41,20,37,0.65)',
  },

  // CLUB CARD
  clubCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  clubCover: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#FFF4EC',
  },
  clubInfoRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF4EC',
  },
  clubTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#291425',
  },
  clubMeta: {
    marginTop: 2,
    fontSize: 12,
    color: 'rgba(41,20,37,0.60)',
  },
  membersPill: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,244,236,0.90)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.06)',
  },
  membersText: {
    fontSize: 12,
    fontWeight: '800',
    color: 'rgba(41,20,37,0.70)',
  },

  empty: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
    marginTop: 10,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#291425',
    marginBottom: 6,
  },
  emptyText: { fontSize: 13, color: 'rgba(41,20,37,0.65)', lineHeight: 18 },

  // MODAL
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
  modalTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '900',
    color: '#291425',
  },
  modalTopRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  creatorText: {
    fontSize: 13,
    fontWeight: '800',
    color: 'rgba(41,20,37,0.75)',
  },
  joinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  joinBtn: {
    backgroundColor: '#FBB040',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  joinBtnDone: {
    backgroundColor: '#BD61A6',
  },
  joinText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#291425',
  },
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
  modalMeta: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(41,20,37,0.65)',
  },
  genreRow: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genrePill: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  genreText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(41,20,37,0.70)',
  },
  roomsTitle: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '900',
    color: '#291425',
  },
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
  roomName: {
    fontSize: 13,
    fontWeight: '900',
    color: '#291425',
  },
  roomDesc: {
    marginTop: 2,
    fontSize: 12,
    color: 'rgba(41,20,37,0.60)',
  },
});
