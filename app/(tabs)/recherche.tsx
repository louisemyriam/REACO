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

const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Pride and Prejudice',
    coverUrl:
      'https://m.media-amazon.com/images/I/818mKxj9pAL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: '2',
    title: 'Little Women',
    coverUrl:
      'https://fr.shopping.rakuten.com/photo/little-women-louisa-may-alcott-1034341377_ML.jpg',
  },
  {
    id: '3',
    title: 'Jane Eyre',
    coverUrl: 'https://images.epagine.fr/799/9782073061799_1_75.jpg',
  },
  {
    id: '4',
    title: 'Wuthering Heights',
    coverUrl: 'https://m.media-amazon.com/images/I/91yLiYO7jtL.jpg',
  },
  {
    id: '5',
    title: 'The Picture of Dorian Gray',
    coverUrl:
      'https://m.media-amazon.com/images/I/81vCurF2jDL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: '6',
    title: 'Frankenstein',
    coverUrl:
      'https://m.media-amazon.com/images/I/81D0ziLvzwL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: '7',
    title: '1984',
    coverUrl:
      'https://cdn1.booknode.com/book_cover/72/1984-72084-264-432.webp',
  },
];

export default function RechercheScreen() {
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const screenW = Dimensions.get('window').width;
  const gap = 12;
  const padding = 18;
  const gridItemW = Math.floor((screenW - padding * 2 - gap) / 2);
  const gridItemH = Math.floor(gridItemW * 1.4);

  const filteredBooks = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return [];
    return BOOKS.filter((b) => b.title.toLowerCase().includes(s));
  }, [search]);

  const isSearching = search.trim().length > 0;

  return (
    <SafeAreaView style={styles.safe}>
      {!isSearching ? (
        <View style={styles.emptyContainer}>
          <View style={styles.searchBox}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Rechercher"
              placeholderTextColor="#E7A53A"
              style={styles.searchInput}
            />
            <Ionicons name="search" size={22} color="#E7A53A" />
          </View>

          <Image
            source={require('../../assets/images/ridzy_recherche_mascotte.png')}
            style={styles.mascotte}
            contentFit="contain"
          />

          <Text style={styles.emptyText}>
            Qu’est-ce qu’on cherche aujourd’hui ?
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={filteredBooks}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ gap }}
            contentContainerStyle={styles.page}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View>
                <View style={styles.searchBox}>
                  <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Rechercher"
                    placeholderTextColor="#E7A53A"
                    style={styles.searchInput}
                  />
                  <Ionicons name="search" size={22} color="#E7A53A" />
                </View>

                <Pressable
                  style={styles.filtersRow}
                  onPress={() => setFiltersOpen(true)}
                >
                  <Ionicons name="funnel-outline" size={16} color="#BD61A6" />
                  <Text style={styles.filtersText}>Filtres</Text>
                </Pressable>
              </View>
            }
            renderItem={({ item }) => (
              <View style={{ width: gridItemW, marginBottom: 14 }}>
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
            ListEmptyComponent={
              <View style={styles.noResultBox}>
                <Text style={styles.noResultText}>Aucun résultat</Text>
              </View>
            }
          />

          <Modal visible={filtersOpen} transparent animationType="fade">
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setFiltersOpen(false)}
            >
              <Pressable style={styles.modalCard} onPress={() => {}}>
                <Text style={styles.modalTitle}>Filtres</Text>

                <View style={{ gap: 10, marginTop: 10 }}>
                  <Pressable style={styles.modalChip}>
                    <Text style={styles.modalChipText}>Romance</Text>
                  </Pressable>
                  <Pressable style={styles.modalChip}>
                    <Text style={styles.modalChipText}>Thriller</Text>
                  </Pressable>
                  <Pressable style={styles.modalChip}>
                    <Text style={styles.modalChipText}>Fantasy</Text>
                  </Pressable>
                  <Pressable style={styles.modalChip}>
                    <Text style={styles.modalChipText}>Classiques</Text>
                  </Pressable>
                  <Pressable style={styles.modalChip}>
                    <Text style={styles.modalChipText}>Horreur</Text>
                  </Pressable>
                  <Pressable style={styles.modalChip}>
                    <Text style={styles.modalChipText}>Dystopie</Text>
                  </Pressable>
                </View>

                <Pressable
                  style={styles.modalClose}
                  onPress={() => setFiltersOpen(false)}
                >
                  <Text style={styles.modalCloseText}>Fermer</Text>
                </Pressable>
              </Pressable>
            </Pressable>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FEF6EF',
  },

  page: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 120,
  },

  emptyContainer: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 28,
    alignItems: 'center',
    backgroundColor: '#FEF6EF',
  },

  searchBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(252,194,113,0.22)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(231,165,58,0.18)',
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#291425',
    marginRight: 10,
    fontFamily: 'GillSans',
  },

  mascotte: {
    width: 220,
    height: 220,
    marginTop: 110,
    marginBottom: 20,
  },

  emptyText: {
    fontSize: 18,
    color: '#291425',
    fontFamily: 'GillSans',
    textAlign: 'center',
  },

  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
    marginBottom: 14,
  },

  filtersText: {
    color: '#BD61A6',
    fontSize: 16,
    fontFamily: 'GillSans-Bold',
  },

  bookCard: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  bookTitle: {
    marginTop: 8,
    fontSize: 12,
    color: '#291425',
    fontFamily: 'GillSans',
  },

  noResultBox: {
    marginTop: 20,
    alignItems: 'center',
  },

  noResultText: {
    color: '#291425',
    fontSize: 16,
    fontFamily: 'GillSans',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    padding: 16,
  },

  modalCard: {
    backgroundColor: '#FEF6EF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },

  modalTitle: {
    fontSize: 16,
    color: '#291425',
    fontFamily: 'GillSans-Bold',
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
    color: '#291425',
    fontFamily: 'GillSans-Bold',
  },

  modalClose: {
    marginTop: 14,
    backgroundColor: '#BD61A6',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  modalCloseText: {
    color: '#FEF6EF',
    fontFamily: 'GillSans-Bold',
  },
});