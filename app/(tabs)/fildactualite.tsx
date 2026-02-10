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

export default function FilActualiteScreen() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'feed' | 'club'>('feed');

  const [text, setText] = useState('');
  const [posts, setPosts] = useState<Post[]>(START_POSTS);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return posts;
    return posts.filter((p) =>
      (p.user + ' ' + p.content).toLowerCase().includes(s)
    );
  }, [posts, search]);

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

  const toggleLike = (id: string) => {
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

  // IMPORTANT: now FlatList is the main scroll,
  // and the header (search + tabs + composer) is inside ListHeaderComponent.
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={styles.listContent}
          data={tab === 'feed' ? filtered : []}
          keyExtractor={(item) => item.id}
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

              {/* Composer */}
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

              {/* If club is selected, show a message (and no posts) */}
              {tab === 'club' ? (
                <View style={styles.empty}>
                  <Text style={styles.emptyTitle}>Club</Text>
                  <Text style={styles.emptyText}>
                    On branchera la logique Club plus tard. L’UI est prête.
                  </Text>
                </View>
              ) : null}
            </View>
          }
          ListEmptyComponent={
            tab === 'feed' ? (
              <View style={styles.empty}>
                <Text style={styles.emptyTitle}>Aucun post</Text>
                <Text style={styles.emptyText}>
                  Essayez une autre recherche ou publiez un message.
                </Text>
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.user}>{item.user}</Text>
              <Text style={styles.content}>{item.content}</Text>

              {item.imageUrl ? (
                <View style={styles.postImage}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={StyleSheet.absoluteFillObject}
                    contentFit="cover"
                  />
                </View>
              ) : null}

              <View style={styles.actions}>
                <Pressable
                  onPress={() => toggleLike(item.id)}
                  style={styles.actionBtn}
                >
                  <Ionicons
                    name={item.liked ? 'heart' : 'heart-outline'}
                    size={18}
                    color={item.liked ? '#BD61A6' : 'rgba(41,20,37,0.65)'}
                  />
                  <Text style={styles.actionText}>{item.likes}</Text>
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
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFF4EC',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
  },

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

  segmentRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
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
  segmentText: {
    fontSize: 13,
    fontWeight: '800',
  },
  segmentTextActive: {
    color: '#291425',
  },
  segmentTextInactive: {
    color: 'rgba(41,20,37,0.65)',
  },

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
  publishText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#291425',
  },

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

  actions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
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
  emptyText: {
    fontSize: 13,
    color: 'rgba(41,20,37,0.65)',
    lineHeight: 18,
  },
});
