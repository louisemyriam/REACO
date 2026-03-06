import React, { useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

type Book = {
  id: string;
  title: string;
  coverUrl: string;
  badge?: string;
};

const BOOKS_NEW: Book[] = [
  {
    id: '1',
    title: 'Some Girls do',
    coverUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvPOe6v3wWmdEJXlcM--WdxKn9OlGA1Ue2A&s',
  },
  {
    id: '2',
    title: 'La femme de ménage',
    coverUrl: 'https://m.media-amazon.com/images/I/613H6840ArL.jpg',
  },
  {
    id: '3',
    title: 'The Shining',
    coverUrl:
      'https://preview.redd.it/new-king-editions-v0-khd2lqh0mcld1.jpg?width=640&crop=smart&auto=webp&s=c87f91735c791bf93465dd0a378455da1f611221',
    badge: 'NOUVEAUTÉ',
  },
  {
    id: '4',
    title: 'It Ends With Us',
    coverUrl:
      'https://m.media-amazon.com/images/I/91CqNElQaKL._AC_UF1000,1000_QL80_.jpg',
  },
];

const BOOKS_FOR_YOU: Book[] = [
  {
    id: '5',
    title: 'La femme de ménage voit tout',
    coverUrl:
      'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/25_9782290415634_1_75.jpg',
  },
  {
    id: '6',
    title: 'Reminders of him',
    coverUrl:
      'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/3_9782755670790_1_75.jpg',
  },
  {
    id: '7',
    title: 'La librairie morisaki',
    coverUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTucWZWAzV9HBtl4h18XCa4iCw9xHCLGSSS6g&s',
  },
];

const BOOKS_MOMENT: Book[] = [
  {
    id: 'm1',
    title: 'Conte de fées',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1642954550l/60177373.jpg',
    badge: 'NOUVEAUTÉ',
  },
  {
    id: 'm2',
    title: 'La librairie des chats noirs',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1689174608l/182484156.jpg',
  },
  {
    id: 'm3',
    title: 'Méfie-toi',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1564472250l/51460410.jpg',
  },
];

const BOOKS_FRIENDS: Book[] = [
  {
    id: '11',
    title: 'Et tombent les têtes',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1698004214l/199709804.jpg',
  },
  {
    id: '12',
    title: 'Légitime démence',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691515262l/195910083.jpg',
  },
  {
    id: '13',
    title: 'Méfie-toi',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1564472250l/51460410.jpg',
    badge: 'NOUVEAUTÉ',
  },
];

const BOOKS_FANTASY: Book[] = [
  {
    id: '8',
    title: 'Harry Potter',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474154022l/3.jpg',
  },
  {
    id: '9',
    title: 'Anne of Green Gables',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1600871089l/8127.jpg',
  },
  {
    id: '10',
    title: 'Blue is a darkness…',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1675643000l/75557739.jpg',
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');

  const screenW = Dimensions.get('window').width;

  // --- Sizes proches maquette ---
  const heroItemW = Math.floor(screenW * 0.55); // gros livre (pas énorme)
  const heroItemH = Math.floor(heroItemW * 1.45);
  const heroSideSpace = Math.floor((screenW - heroItemW) / 2);

  const smallW = 105;
  const smallH = Math.floor(smallW * 1.45);

  // Livres du moment (carrousel + flèches)
  const momentItemW = Math.floor(screenW * 0.78);
  const momentItemH = Math.floor(momentItemW * 0.42);
  const momentSideSpace = Math.floor((screenW - momentItemW) / 2);

  const momentRef = useRef<FlatList<Book>>(null);
  const [momentIndex, setMomentIndex] = useState(0);

  const filterBooks = (arr: Book[]) => {
    const s = search.trim().toLowerCase();
    if (!s) return arr;
    return arr.filter((b) => b.title.toLowerCase().includes(s));
  };

  const newFiltered = useMemo(() => filterBooks(BOOKS_NEW), [search]);
  const forYouFiltered = useMemo(() => filterBooks(BOOKS_FOR_YOU), [search]);
  const friendsFiltered = useMemo(() => filterBooks(BOOKS_FRIENDS), [search]);
  const fantasyFiltered = useMemo(() => filterBooks(BOOKS_FANTASY), [search]);

  const onMomentScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / momentItemW);
    setMomentIndex(Math.max(0, Math.min(idx, BOOKS_MOMENT.length - 1)));
  };

  const goMoment = (dir: -1 | 1) => {
    const next = Math.max(0, Math.min(momentIndex + dir, BOOKS_MOMENT.length - 1));
    setMomentIndex(next);
    momentRef.current?.scrollToIndex({ index: next, animated: true });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={[{ key: 'dummy' }]}
        keyExtractor={(i) => i.key}
        renderItem={() => null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.page}
        ListHeaderComponent={
          <View>
            {/* Header + mascotte */}
            <View style={styles.headerRow}>
              <Image
                source={require('../../assets/images/ridzy_temps_de_lecture_mascotte.png')}
                style={styles.mascotte}
                contentFit="contain"
              />
              <Text style={styles.bigTitle}>BIENVENUE</Text>
            </View>

            {/* Search */}
            <View style={styles.searchBox}>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Rechercher"
                placeholderTextColor="rgba(41,20,37,0.45)"
                style={styles.searchInput}
              />
              <Ionicons name="search" size={18} color="rgba(41,20,37,0.60)" />
            </View>

            {/* NOUVEAUTÉS (paging, un gros livre au centre) */}
            <Text style={styles.sectionTitle}>Nouveautés</Text>
            <FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={newFiltered}
              keyExtractor={(item) => item.id}
              snapToInterval={heroItemW}
              decelerationRate="fast"
              contentContainerStyle={{ paddingHorizontal: heroSideSpace }}
              renderItem={({ item }) => (
                <View style={{ width: heroItemW }}>
                  <Pressable style={[styles.heroCard, { width: heroItemW, height: heroItemH }]}>
                    <Image
                      source={{ uri: item.coverUrl }}
                      style={StyleSheet.absoluteFillObject}
                      contentFit="cover"
                    />
                    {item.badge ? (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    ) : null}
                  </Pressable>
                </View>
              )}
            />

            {/* POUR VOUS (petits livres scroll) */}
            <View style={styles.rowTitle}>
              <Text style={styles.sectionTitle}>Pour vous</Text>
              <Pressable>
                <Text style={styles.seeMore}>Voir tout</Text>
              </Pressable>
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={forYouFiltered}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
              renderItem={({ item }) => (
                <Pressable style={[styles.smallCard, { width: smallW, height: smallH }]}>
                  <Image source={{ uri: item.coverUrl }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
                </Pressable>
              )}
            />

            {/* LIVRES DU MOMENT : 3 cartes + flèches dessous */}
            <Text style={styles.sectionTitle}>Livres du moment !</Text>

            <FlatList
              ref={momentRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={BOOKS_MOMENT}
              keyExtractor={(item) => item.id}
              snapToInterval={momentItemW}
              decelerationRate="fast"
              onMomentumScrollEnd={onMomentScrollEnd}
              contentContainerStyle={{ paddingHorizontal: momentSideSpace }}
              renderItem={({ item }) => (
                <View style={{ width: momentItemW }}>
                  <View style={[styles.momentCard, { width: momentItemW, height: momentItemH }]}>
                    <View style={{ flex: 1, paddingRight: 12 }}>
                      <Text style={styles.momentTitle}>{item.title.toUpperCase()}</Text>
                      <Text style={styles.momentText}>Découvre {item.title}</Text>
                    </View>

                    <View style={styles.momentCover}>
                      <Image source={{ uri: item.coverUrl }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
                      {item.badge ? (
                        <View style={styles.badgeRed}>
                          <Text style={styles.badgeRedText}>{item.badge}</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              )}
            />

            <View style={styles.arrowsRow}>
              <Pressable style={styles.arrowBtn} onPress={() => goMoment(-1)}>
                <Ionicons name="chevron-back" size={18} color="#291425" />
              </Pressable>
              <Pressable style={styles.arrowBtn} onPress={() => goMoment(1)}>
                <Ionicons name="chevron-forward" size={18} color="#291425" />
              </Pressable>
            </View>

            {/* VOS AMIS AIMENT */}
            <Text style={styles.sectionTitle}>Vos amis aiment</Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={friendsFiltered}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
              renderItem={({ item }) => (
                <Pressable style={[styles.smallCard, { width: smallW, height: smallH }]}>
                  <Image source={{ uri: item.coverUrl }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
                  {item.badge ? (
                    <View style={styles.badgeMini}>
                      <Text style={styles.badgeMiniText}>{item.badge}</Text>
                    </View>
                  ) : null}
                </Pressable>
              )}
            />

            {/* GENRE (ex: Fantasy) */}
            <Text style={styles.sectionTitle}>Fantasy</Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={fantasyFiltered}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
              contentContainerStyle={{ paddingBottom: 110 }}
              renderItem={({ item }) => (
                <View style={{ width: smallW }}>
                  <Pressable style={[styles.smallCard, { width: smallW, height: smallH }]}>
                    <Image source={{ uri: item.coverUrl }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
                  </Pressable>
                  <Text style={styles.bookCaption} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              )}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FEF1EA' },
  page: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 20 },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    marginBottom: 10,
  },
  mascotte: {
    width: 58,
    height: 58,
  },
  bigTitle: {
    fontSize: 40,
    fontWeight: '900',
    fontFamily: 'GillSans-Bold',
    color: '#291425',
    letterSpacing: 1,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(252,194,113,0.25)',
    borderRadius: 14,
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
    fontWeight: '800',
  },

  sectionTitle: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '900',
    color: '#291425',
  },

  rowTitle: {
    marginTop: 8,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeMore: { color: '#BD61A6', fontWeight: '900' },

  heroCard: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },

  smallCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },

  badge: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    backgroundColor: 'rgba(255,255,255,0.90)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  badgeText: { fontWeight: '900', color: '#291425', fontSize: 12 },

  // Livres du moment
  momentCard: {
    borderRadius: 18,
    padding: 14,
    backgroundColor: 'rgba(252,176,64,0.20)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  momentTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#291425',
    marginBottom: 6,
  },
  momentText: {
    fontSize: 13,
    color: 'rgba(41,20,37,0.70)',
    fontWeight: '700',
    lineHeight: 18,
  },
  momentCover: {
    width: 92,
    height: 128,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  badgeRed: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    backgroundColor: '#E53935',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  badgeRedText: { color: '#FFFFFF', fontWeight: '900', fontSize: 10 },

  arrowsRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  arrowBtn: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeMini: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    backgroundColor: 'rgba(255,255,255,0.90)',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  badgeMiniText: { fontWeight: '900', color: '#291425', fontSize: 10 },

  bookCaption: {
    marginTop: 8,
    fontSize: 12,
    color: '#291425',
    fontWeight: '900',
  },
});