import { useRouter } from 'expo-router';
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
import { useLibraryStore } from '../store/libraryStore';

type Book = {
  id: string;
  title: string;
  coverUrl: string;
  progress?: number;
  description?: string;
};

const LECTURES: Book[] = [
  {
    id: '1',
    title: 'Roméo et Juliette',
    coverUrl:
      'https://images.epagine.fr/094/9782264081094_1_75.jpg',
    progress: 23,
    description:
      "L’histoire tragique de deux amants issus de familles ennemies, dont l’amour impossible est devenu l’un des plus grands classiques de la littérature.",
  },
  {
    id: '2',
    title: 'Dracula',
    coverUrl:
      'https://products-images.di-static.com/image/bram-stoker-dracula/9781435129733-475x500-1.jpg',
    progress: 61,
    description:
      "Un roman gothique emblématique où mystère, tension et horreur se mêlent autour de l’inquiétant comte Dracula.",
  },
];

const WISHLIST: Book[] = [
  {
    id: 'w1',
    title: 'Les Misérables',
    coverUrl:
      'https://m.media-amazon.com/images/I/71lxLN4vorL.jpg',
    progress: 0,
    description:
      "Une fresque monumentale sur la misère, la justice, la rédemption et la condition humaine dans la France du XIXe siècle.",
  },
  {
    id: 'w2',
    title: 'Pride and Prejudice',
    coverUrl:
      'https://editions-hauteville.fr/media/cache/book/17/9782820519917.jpg',
    progress: 0,
    description:
      "Une romance classique pleine d’esprit sur les apparences, les jugements hâtifs et l’évolution des sentiments.",
  },
  {
    id: 'w3',
    title: 'Little Women',
    coverUrl:
      'https://fr.shopping.rakuten.com/photo/little-women-louisa-may-alcott-1034341377_ML.jpg',
    progress: 0,
    description:
      "Le récit tendre et marquant de quatre sœurs qui grandissent, rêvent et apprennent à trouver leur place dans le monde.",
  },
  {
    id: 'w4',
    title: 'Jane Eyre',
    coverUrl:
      'https://images.epagine.fr/799/9782073061799_1_75.jpg',
    progress: 0,
    description:
      "Le parcours intense d’une jeune femme indépendante, entre épreuves, secrets et quête de dignité.",
  },
];

export default function BibliothequeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { lectures, wishlist } = useLibraryStore();

  const lecturesAll = useMemo(() => {
    const merged = [...lectures, ...LECTURES];
    return merged.filter(
      (book, index, self) => index === self.findIndex((b) => b.id === book.id)
    );
  }, [lectures]);

  const wishlistAll = useMemo(() => {
    const merged = [...wishlist, ...WISHLIST];
    const unique = merged.filter(
      (book, index, self) => index === self.findIndex((b) => b.id === book.id)
    );
    return unique.slice(0, 4);
  }, [wishlist]);

  const screenW = Dimensions.get('window').width;
  const gap = 12;
  const padding = 18;

  const gridItemW = Math.floor((screenW - padding * 2 - gap) / 2);
  const gridItemH = Math.floor(gridItemW * 1.05);

  const wishW = gridItemW;
  const wishH = Math.floor(wishW * 1.05);

  const lecturesFiltered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return lecturesAll;
    return lecturesAll.filter((b) => b.title.toLowerCase().includes(s));
  }, [search, lecturesAll]);

  const wishlistFiltered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return wishlistAll;
    return wishlistAll.filter((b) => b.title.toLowerCase().includes(s));
  }, [search, wishlistAll]);

  const openBook = (item: Book) => {
    router.push({
      pathname: '/reading/[id]',
      params: {
        id: item.id,
        title: item.title,
        coverUrl: item.coverUrl,
        progress: String(item.progress ?? 0),
        description: item.description ?? '',
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={lecturesFiltered}
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
                placeholderTextColor="rgba(41,20,37,0.45)"
                style={styles.searchInput}
              />
              <Ionicons name="search" size={18} color="rgba(41,20,37,0.55)" />
            </View>

            <Pressable style={styles.filtersRow} onPress={() => setFiltersOpen(true)}>
              <Ionicons name="funnel-outline" size={16} color="#BD61A6" />
              <Text style={styles.filtersText}>Filtres</Text>
            </Pressable>

            <Text style={styles.h1}>Ajoutez vos livres</Text>

            <Pressable style={styles.scanBox} onPress={() => router.push('/scanner-screen')}>
              <View style={styles.scanCornerTL} />
              <View style={styles.scanCornerTR} />
              <View style={styles.scanCornerBL} />
              <View style={styles.scanCornerBR} />

              <View style={styles.scanIconWrap}>
                <Ionicons name="camera-outline" size={22} color="#FBB040" />
              </View>
            </Pressable>

            <Text style={styles.sectionTitle}>Vos lectures</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ width: gridItemW, marginBottom: 12 }}>
            <Pressable
              style={[styles.bookCard, { height: gridItemH }]}
              onPress={() => openBook(item)}
            >
              <Image
                source={{ uri: item.coverUrl }}
                style={StyleSheet.absoluteFillObject}
                contentFit="cover"
              />
            </Pressable>
          </View>
        )}
        ListFooterComponent={
          <View style={{ paddingTop: 8 }}>
            <Text style={[styles.sectionTitle, { marginTop: 6 }]}>Liste de souhaits</Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={wishlistFiltered}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
              renderItem={({ item }) => (
                <View style={{ width: wishW }}>
                  <Pressable
                    style={[styles.bookCard, { width: wishW, height: wishH }]}
                    onPress={() => openBook(item)}
                  >
                    <Image
                      source={{ uri: item.coverUrl }}
                      style={StyleSheet.absoluteFillObject}
                      contentFit="cover"
                    />
                  </Pressable>
                </View>
              )}
            />

            <View style={{ height: 110 }} />
          </View>
        }
      />

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
                <Text style={styles.modalChipText}>Liste de souhaits</Text>
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
    fontFamily: 'GillSans',
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
    fontSize: 24,
    fontWeight: '900',
    color: '#291425',
  },

  bookCard: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },

  bookTitle: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '800',
    color: '#291425',
  },

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