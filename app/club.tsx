import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type ClubItem = {
  id: string;
  title: string;
  coverUrl: string;
  liked: boolean;
  saved: boolean;
};

const START_CLUB: ClubItem[] = [
  {
    id: '1',
    title: 'Powerful tome 1',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1484903841l/33574138.jpg',
    liked: false,
    saved: false,
  },
  {
    id: '2',
    title: 'Bridgerton 3 & 4',
    coverUrl:
      'https://m.media-amazon.com/images/I/81JzBv9g7+L._AC_UF1000,1000_QL80_.jpg',
    liked: true,
    saved: false,
  },
];

export default function ClubScreen() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<ClubItem[]>(START_CLUB);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return items;
    return items.filter((x) => x.title.toLowerCase().includes(s));
  }, [items, search]);

  const toggleLike = (id: string) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, liked: !x.liked } : x))
    );
  };

  const toggleSave = (id: string) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, saved: !x.saved } : x))
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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

            {/* Segmented buttons (Fil / Club) */}
            <View style={styles.segmentRow}>
              <Pressable
                onPress={() => router.back()}
                style={[styles.segmentBtn, styles.segmentInactive]}
              >
                <Text style={[styles.segmentText, styles.segmentTextInactive]}>
                  Fil d’actu
                </Text>
              </Pressable>

              <Pressable
                style={[styles.segmentBtn, styles.segmentActive]}
              >
                <Text style={[styles.segmentText, styles.segmentTextActive]}>
                  Club
                </Text>
              </Pressable>
            </View>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>

            <View style={styles.coverWrap}>
              <Image
                source={{ uri: item.coverUrl }}
                style={StyleSheet.absoluteFillObject}
                contentFit="cover"
              />
            </View>

            <View style={styles.actions}>
              <Pressable onPress={() => toggleSave(item.id)} style={styles.iconBtn}>
                <Ionicons
                  name={item.saved ? 'bookmark' : 'bookmark-outline'}
                  size={20}
                  color="rgba(41,20,37,0.65)"
                />
              </Pressable>

              <Pressable onPress={() => toggleLike(item.id)} style={styles.iconBtn}>
                <Ionicons
                  name={item.liked ? 'heart' : 'heart-outline'}
                  size={20}
                  color={item.liked ? '#BD61A6' : 'rgba(41,20,37,0.65)'}
                />
              </Pressable>

              <Pressable style={styles.iconBtn}>
                <Ionicons
                  name="chatbubble-outline"
                  size={20}
                  color="rgba(41,20,37,0.65)"
                />
              </Pressable>

              <Pressable style={styles.iconBtn}>
                <Ionicons
                  name="paper-plane-outline"
                  size={20}
                  color="rgba(41,20,37,0.65)"
                />
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Aucun club trouvé</Text>
            <Text style={styles.emptyText}>Essayez une autre recherche.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF4EC' },
  listContent: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 20 },

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
  segmentText: { fontSize: 13, fontFamily: 'GillSans', fontWeight: '800' },
  segmentTextActive: { color: '#291425' },
  segmentTextInactive: { color: 'rgba(41,20,37,0.65)' },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  cardTitle: {
    fontSize: 13,
    fontFamily: 'GillSans-SemiBold',
    //fontWeight: '900',
    color: '#291425',
    marginBottom: 10,
  },
  coverWrap: {
    width: '100%',
    height: 260,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#FFF4EC',
  },

  actions: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  iconBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,244,236,0.90)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.06)',
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
    fontFamily: 'GillSans-Bold',
    //fontWeight: '900',
    color: '#291425',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13,
    color: 'rgba(41,20,37,0.65)',
    lineHeight: 18,
  },
});
