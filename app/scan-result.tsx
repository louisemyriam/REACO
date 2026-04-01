import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useLibraryStore } from './store/libraryStore';

type ScannedBook = {
  isbn: string;
  title: string;
  coverUrl: string;
  description: string;
};

const SCANNED_BOOKS: Record<string, ScannedBook> = {
  '9782070408504': {
    isbn: '9782070408504',
    title: 'Livre scanné 1',
    coverUrl: 'https://images.epagine.fr/504/9782070408504_1_75.jpg',
    description: 'Livre ajouté via scan ISBN.',
  },
  '9782070662562': {
    isbn: '9782070662562',
    title: 'La face cachée de Margo',
    coverUrl:
      'https://static.fnac-static.com/multimedia/PE/Images/FR/NR/b7/5d/5a/5922231/1507-1/tsp20251105085918/La-face-cachee-de-Margo.jpg',
    description: 'Livre ajouté via scan ISBN.',
  },
  '9782221256788': {
    isbn: '9782221256788',
    title: 'Livre scanné 3',
    coverUrl: 'https://m.media-amazon.com/images/I/615KMkp0UkL.jpg',
    description: 'Livre ajouté via scan ISBN.',
  },
  '9782755636079': {
    isbn: '9782755636079',
    title: 'Livre scanné 4',
    coverUrl:
      'https://resize-parismatch.lanmedia.fr/r/375,,forcex/img/var/pm/public/media/image/2022/03/11/13/10_COUV_thespringgril-bis.jpg?VersionId=V_u98UJX8DeSUjJjS9myfFDqTX1DBVy_',
    description: 'Livre ajouté via scan ISBN.',
  },
};

export default function ScanResultScreen() {
  const router = useRouter();
  const { isbn } = useLocalSearchParams<{ isbn?: string }>();

  const addLecture = useLibraryStore((s) => s.addLecture);
  const addWishlist = useLibraryStore((s) => s.addWishlist);

  const normalizedIsbn = (isbn ?? '').replace(/\s+/g, '').trim();
  const scannedBook = SCANNED_BOOKS[normalizedIsbn];
  const isFound = !!scannedBook;

  const handleValidate = () => {
    if (!scannedBook) {
      router.replace('/(tabs)/bibliotheque');
      return;
    }

    addLecture({
      id: `scan-${scannedBook.isbn}`,
      title: scannedBook.title,
      coverUrl: scannedBook.coverUrl,
      isbn: scannedBook.isbn,
      description: scannedBook.description,
      progress: 0,
    });

    router.replace('/(tabs)/bibliotheque');
  };

  const handleAddToWishlist = () => {
    if (!scannedBook) return;

    addWishlist({
      id: `wish-scan-${scannedBook.isbn}`,
      title: scannedBook.title,
      coverUrl: scannedBook.coverUrl,
      isbn: scannedBook.isbn,
      description: scannedBook.description,
      progress: 0,
    });

    router.replace('/(tabs)/bibliotheque');
  };

  const handleRetour = () => {
    router.replace('/(tabs)/bibliotheque');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.page}>
        <Text style={styles.headerTitle}>Page scan 2</Text>

        <Pressable style={styles.backBtn} onPress={handleRetour}>
          <Ionicons name="chevron-back" size={24} color="#E7A53A" />
        </Pressable>

        {isFound ? (
          <>
            <View style={styles.coverWrap}>
              <Image
                source={{ uri: scannedBook.coverUrl }}
                style={styles.cover}
                contentFit="cover"
              />
            </View>

            <Text style={styles.isbnLabel}>ISBN détecté</Text>
            <Text style={styles.isbnText}>{normalizedIsbn}</Text>

            <Pressable style={styles.secondaryBtn} onPress={handleAddToWishlist}>
              <Text style={styles.secondaryBtnText}>Ajouter à une liste</Text>
            </Pressable>

            <Pressable style={styles.primaryBtn} onPress={handleValidate}>
              <Text style={styles.primaryBtnText}>Valider</Text>
            </Pressable>
          </>
        ) : (
          <>
            <View style={styles.notFoundBox}>
              <Text style={styles.notFoundTitle}>Livre introuvable</Text>
              <Text style={styles.isbnLabel}>ISBN détecté</Text>
              <Text style={styles.isbnText}>{normalizedIsbn || 'Aucun ISBN détecté'}</Text>
            </View>

            <Pressable style={styles.primaryBtn} onPress={handleRetour}>
              <Text style={styles.primaryBtnText}>Retour</Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5EADF',
  },
  page: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: '#F5EADF',
  },
  headerTitle: {
    fontSize: 18,
    color: 'rgba(41,20,37,0.7)',
    marginBottom: 10,
    fontFamily: 'GillSans',
  },
  backBtn: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  coverWrap: {
    alignItems: 'center',
    marginBottom: 14,
  },
  cover: {
    width: 170,
    height: 275,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  isbnLabel: {
    textAlign: 'center',
    color: 'rgba(41,20,37,0.6)',
    fontSize: 13,
    fontFamily: 'GillSans',
    marginBottom: 4,
  },
  isbnText: {
    textAlign: 'center',
    color: '#291425',
    fontSize: 14,
    fontFamily: 'GillSans-Bold',
    marginBottom: 16,
  },
  secondaryBtn: {
    backgroundColor: '#F2D7A6',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryBtnText: {
    color: '#E7A53A',
    fontSize: 15,
    fontFamily: 'GillSans',
  },
  primaryBtn: {
    backgroundColor: '#FBB040',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'GillSans-Bold',
  },
  notFoundBox: {
    marginTop: 60,
    padding: 18,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
    marginBottom: 20,
  },
  notFoundTitle: {
    textAlign: 'center',
    color: '#291425',
    fontSize: 18,
    fontFamily: 'GillSans-Bold',
    marginBottom: 14,
  },
});