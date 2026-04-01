import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { BOOKS_BY_ID } from '../bookData';

export default function BookStoreDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    title?: string;
    coverUrl?: string;
    description?: string;
    isPurchased?: string;
  }>();

  const bookFromMap = params.id ? BOOKS_BY_ID[params.id] : undefined;

  const book = {
    id: params.id ?? bookFromMap?.id ?? '',
    title: params.title ?? bookFromMap?.title ?? 'Livre',
    coverUrl: params.coverUrl ?? bookFromMap?.coverUrl ?? '',
    description:
      params.description ??
      bookFromMap?.description ??
      'Aucune description disponible pour ce livre.',
    isPurchased:
      params.isPurchased === 'true'
        ? true
        : params.isPurchased === 'false'
        ? false
        : (bookFromMap?.isPurchased ?? false),
    similarBooks: bookFromMap?.similarBooks ?? [],
  };

  const similarBooks = (book.similarBooks ?? [])
    .map((bookId) => BOOKS_BY_ID[bookId])
    .filter(Boolean);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.page}
      >
        <Pressable style={styles.backBtn} onPress={() => router.push('/bibliotheque')}>
          <Ionicons name="chevron-back" size={24} color="#E8A23A" />
        </Pressable>

        <View style={styles.coverWrap}>
          <Image
            source={{ uri: book.coverUrl }}
            style={styles.cover}
            contentFit="cover"
          />
        </View>

        <View style={styles.actionsWrap}>
          <Pressable
            style={styles.buyBtn}
            onPress={() => {
              if (book.isPurchased) {
                router.push({
                  pathname: '/reading/[id]',
                  params: { id: book.id },
                });
              }
            }}
          >
            <Text style={styles.buyBtnText}>
              {book.isPurchased ? 'Lire' : 'Acheter'}
            </Text>
          </Pressable>

          <Pressable style={styles.wishlistBtn}>
            <Text style={styles.wishlistBtnText}>Liste de souhaits</Text>
          </Pressable>
        </View>

        <View style={styles.descBlock}>
          <Text style={styles.descTitle}>Description</Text>
          <Text style={styles.descText}>{book.description}</Text>
        </View>

        {similarBooks.length > 0 ? (
          <View style={styles.similarBlock}>
            <Text style={styles.similarTitle}>Livres similaires …</Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={similarBooks}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.similarItem}
                  onPress={() =>
                    router.push({
                      pathname: '/book/[id]',
                      params: { id: item.id },
                    })
                  }
                >
                  <View style={styles.similarCoverWrap}>
                    <Image
                      source={{ uri: item.coverUrl }}
                      style={styles.similarCover}
                      contentFit="cover"
                    />
                  </View>
                  <Text style={styles.similarCaption} numberOfLines={2}>
                    {item.title}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4E1CB',
  },
  page: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 40,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    marginBottom: 8,
  },
  coverWrap: {
    alignItems: 'center',
  },
  cover: {
    width: 250,
    height: 360,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  actionsWrap: {
    marginTop: 14,
    gap: 10,
  },
  buyBtn: {
    backgroundColor: '#F3AB3B',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buyBtnText: {
    color: '#FFF7EE',
    fontSize: 15,
    fontFamily: 'GillSans',
  },
  wishlistBtn: {
    backgroundColor: '#EFC98E',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  wishlistBtnText: {
    color: '#FFF7EE',
    fontSize: 15,
    fontFamily: 'GillSans',
  },
  descBlock: {
    marginTop: 20,
  },
  descTitle: {
    fontSize: 26,
    color: '#291425',
    fontFamily: 'GillSans-Bold',
    marginBottom: 8,
  },
  descText: {
    color: '#291425',
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'GillSans',
  },
  similarBlock: {
    marginTop: 28,
  },
  similarTitle: {
    fontSize: 26,
    color: '#291425',
    fontFamily: 'GillSans-Bold',
    marginBottom: 12,
  },
  similarItem: {
    width: 86,
  },
  similarCoverWrap: {
    width: 86,
    height: 128,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  similarCover: {
    width: '100%',
    height: '100%',
  },
  similarCaption: {
    marginTop: 6,
    fontSize: 11,
    color: '#291425',
    fontFamily: 'GillSans',
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#291425',
    fontSize: 18,
  },
});