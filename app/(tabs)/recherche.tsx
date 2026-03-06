import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
  Dimensions,
  Modal,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

type Book = {
  id: string;
  title: string;
  coverUrl: string;
};

const LECTURES: Book[] = [
  {
    id: '1',
    title: 'Légitime démence',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691515262l/195910083.jpg',
  },
  {
    id: '2',
    title: 'La librairie des chats noirs',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1689174608l/182484156.jpg',
  },
  {
    id: '3',
    title: 'Faux-semblants',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1600871089l/8127.jpg',
  },
  {
    id: '4',
    title: 'Méfie-toi',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1564472250l/51460410.jpg',
  },
];

const WISHLIST: Book[] = [
  {
    id: 'w1',
    title: 'La femme de ménage voit tout',
    coverUrl:
      'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/25_9782290415634_1_75.jpg',
  },
  {
    id: 'w2',
    title: 'Conte de fées',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1642954550l/60177373.jpg',
  },
  {
    id: 'w3',
    title: 'It Ends With Us',
    coverUrl:
      'https://m.media-amazon.com/images/I/91CqNElQaKL._AC_UF1000,1000_QL80_.jpg',
  },
];

export default function BibliothequeScreen() {
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const screenW = Dimensions.get('window').width;
  const gap = 12;
  const padding = 18;

  const gridItemW = Math.floor((screenW - padding * 2 - gap) / 2);
  const gridItemH = Math.floor(gridItemW * 1.35);

  const wishW = 120;
  const wishH = Math.floor(wishW * 1.45);

  const lecturesFiltered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return LECTURES;
    return LECTURES.filter((b) => b.title.toLowerCase().includes(s));
  }, [search]);

  const wishlistFiltered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return WISHLIST;
    return WISHLIST.filter((b) => b.title.toLowerCase().includes(s));
  }, [search]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Main vertical scroll */}
      <FlatList
        data={lecturesFiltered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap }}
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
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
              <Ionicons name="search" size={18} color="rgba(41,20,37,0.55)" />
            </View>

            {/* Filters row */}
            <Pressable style={styles.filtersRow} onPress={() => setFiltersOpen(true)}>
              <Ionicons name="funnel-outline" size={16} color="#BD61A6" />
              <Text style={styles.filtersText}>Filtres</Text>
            </Pressable>

            {/* Section: Vos lectures */}
            <Text style={styles.sectionTitle}>Vos lectures</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ width: gridItemW, marginBottom: 12 }}>
            <Pressable style={[styles.bookCard, { height: gridItemH }]}>
              <Image
                source={{ uri: item.coverUrl }}
                style={StyleSheet.absoluteFillObject}
                contentFit="cover"
              />
            </Pressable>
            <Text style={styles.bookTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        )}
        ListFooterComponent={
          <View>
            {/* Wishlist */}
            <Text style={[styles.sectionTitle, { marginTop: 14 }]}>Wishlist</Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={wishlistFiltered}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
              renderItem={({ item }) => (
                <View style={{ width: wishW }}>
                  <Pressable style={[styles.bookCard, { width: wishW, height: wishH }]}>
                    <Image
                      source={{ uri: item.coverUrl }}
                      style={StyleSheet.absoluteFillObject}
                      contentFit="cover"
                    />
                  </Pressable>
                  <Text style={styles.bookTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              )}
            />

            <View style={{ height: 24 }} />
          </View>
        }
      />

      {/* Filters modal (simple placeholder) */}
      <Modal visible={filtersOpen} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setFiltersOpen(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Filtres</Text>

            <View style={{ gap: 10, marginTop: 10 }}>
              <Pressable style={styles.modalChip}>
                <Text style={styles.modalChipText}>En cours</Text>
              </Pressable>
              <Pressable style={styles.modalChip}>
                <Text style={styles.modalChipText}>Terminés</Text>
              </Pressable>
              <Pressable style={styles.modalChip}>
                <Text style={styles.modalChipText}>Wishlist</Text>
              </Pressable>
            </View>

            <Pressable style={styles.modalClose} onPress={() => setFiltersOpen(false)}>
              <Text style={styles.modalCloseText}>Fermer</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FEF1EA' },

  page: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 16,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(252,194,113,0.25)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#291425',
    marginRight: 10,
  },

  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  filtersText: {
    fontWeight: '800',
    color: '#BD61A6',
  },

  h1: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: '900',
    color: '#291425',
  },

  scanBox: {
    marginTop: 12,
    width: 110,
    height: 110,
    borderRadius: 18,
    backgroundColor: 'rgba(252,194,113,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(252,194,113,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  // corners like scan frame
  scanCornerTL: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 24,
    height: 24,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: '#FBB040',
    borderRadius: 6,
  },
  scanCornerTR: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: '#FBB040',
    borderRadius: 6,
  },
  scanCornerBL: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    width: 24,
    height: 24,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#FBB040',
    borderRadius: 6,
  },
  scanCornerBR: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#FBB040',
    borderRadius: 6,
  },

  scanIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },

  sectionTitle: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '900',
    color: '#291425',
  },

  bookCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },

  bookTitle: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '800',
    color: '#291425',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#FEF1EA',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#291425',
  },
  modalChip: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  modalChipText: {
    fontWeight: '900',
    color: '#291425',
  },
  modalClose: {
    marginTop: 14,
    backgroundColor: '#BD61A6',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#FEF1EA',
    fontWeight: '900',
  },
});
