import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Animated,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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

const BOOKS_THRILLER: Book[] = [
  {
    id: 't1',
    title: 'Et tombent les têtes',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1698004214l/199709804.jpg',
  },
  {
    id: 't2',
    title: 'Légitime démence',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691515262l/195910083.jpg',
  },
  {
    id: 't3',
    title: 'Méfie-toi',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1564472250l/51460410.jpg',
  },
];

const BOOKS_ROMANCE: Book[] = [
  {
    id: 'r1',
    title: 'It Ends With Us',
    coverUrl:
      'https://m.media-amazon.com/images/I/91CqNElQaKL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 'r2',
    title: 'Reminders of him',
    coverUrl:
      'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/3_9782755670790_1_75.jpg',
  },
  {
    id: 'r3',
    title: 'Some Girls do',
    coverUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvPOe6v3wWmdEJXlcM--WdxKn9OlGA1Ue2A&s',
  },
];

const BOOKS_COZY: Book[] = [
  {
    id: 'c1',
    title: 'La librairie morisaki',
    coverUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTucWZWAzV9HBtl4h18XCa4iCw9xHCLGSSS6g&s',
  },
  {
    id: 'c2',
    title: 'Anne of Green Gables',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1600871089l/8127.jpg',
  },
  {
    id: 'c3',
    title: 'La librairie des chats noirs',
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1689174608l/182484156.jpg',
  },
];

const { width: screenW } = Dimensions.get('window');

const HERO_ITEM_WIDTH = Math.floor(screenW * 0.55);
const HERO_ITEM_HEIGHT = Math.floor(HERO_ITEM_WIDTH * 1.4);
const HERO_SPACING = 18;

export default function HomeScreen() {
  const smallW = 105;
  const smallH = Math.floor(smallW * 1.45);

  const momentItemW = Math.floor(screenW * 0.78);
  const momentItemH = Math.floor(momentItemW * 0.42);
  const momentGap = 12;
  const momentSideSpace = Math.floor((screenW - momentItemW) / 2);

  const momentRef = useRef<FlatList<Book>>(null);
  const [momentIndex, setMomentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const onMomentScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / (momentItemW + momentGap));
    setMomentIndex(Math.max(0, Math.min(idx, BOOKS_MOMENT.length - 1)));
  };

  const goMoment = (dir: -1 | 1) => {
    const next = Math.max(0, Math.min(momentIndex + dir, BOOKS_MOMENT.length - 1));
    setMomentIndex(next);
    momentRef.current?.scrollToOffset({
      offset: next * (momentItemW + momentGap),
      animated: true,
    });
  };

  const renderBookRow = (books: Book[]) => (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={books}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      renderItem={({ item }) => (
        <View style={{ width: smallW }}>
          <Pressable style={[styles.smallCard, { width: smallW, height: smallH }]}>
            <Image
              source={{ uri: item.coverUrl }}
              style={StyleSheet.absoluteFillObject}
              contentFit="cover"
            />
            {item.badge ? (
              <View style={styles.badgeMini}>
                <Text style={styles.badgeMiniText}>{item.badge}</Text>
              </View>
            ) : null}
          </Pressable>
          <Text style={styles.bookCaption} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={['#FEF6EF', '#FEC271']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <FlatList
        data={[{ key: 'dummy' }]}
        keyExtractor={(i) => i.key}
        renderItem={() => null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.page}
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <Image
                source={require('../../assets/images/ridzy_temps_de_lecture_mascotte.png')}
                style={styles.mascotte}
                contentFit="contain"
              />
              <Text style={styles.bigTitle}>BIENVENUE</Text>
            </View>

            {/* NOUVEAUTÉS : petit compartiment discret */}
            <View style={styles.softSection}>
              <Text style={styles.sectionTitle}>Nouveautés</Text>

              <Animated.FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={BOOKS_NEW}
                keyExtractor={(item) => item.id}
                snapToInterval={HERO_ITEM_WIDTH + HERO_SPACING}
                decelerationRate="fast"
                bounces={false}
                contentContainerStyle={{
                  paddingHorizontal: (screenW - HERO_ITEM_WIDTH) / 2,
                }}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                  const inputRange = [
                    (index - 1) * (HERO_ITEM_WIDTH + HERO_SPACING),
                    index * (HERO_ITEM_WIDTH + HERO_SPACING),
                    (index + 1) * (HERO_ITEM_WIDTH + HERO_SPACING),
                  ];

                  const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.82, 1, 0.82],
                    extrapolate: 'clamp',
                  });

                  const translateY = scrollX.interpolate({
                    inputRange,
                    outputRange: [18, 0, 18],
                    extrapolate: 'clamp',
                  });

                  const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.6, 1, 0.6],
                    extrapolate: 'clamp',
                  });

                  return (
                    <Animated.View
                      style={{
                        width: HERO_ITEM_WIDTH,
                        marginRight: HERO_SPACING,
                        transform: [{ scale }, { translateY }],
                        opacity,
                      }}
                    >
                      <Pressable style={[styles.heroCard, { height: HERO_ITEM_HEIGHT }]}>
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
                    </Animated.View>
                  );
                }}
              />
            </View>

            {/* POUR VOUS : petit compartiment discret */}
            <View style={styles.softSection}>
              <View style={styles.rowTitle}>
                <Text style={styles.sectionTitle}>Pour vous</Text>
                <Pressable>
                  <Text style={styles.seeMore}>Voir tout</Text>
                </Pressable>
              </View>
              {renderBookRow(BOOKS_FOR_YOU)}
            </View>

            {/* LIVRES DU MOMENT : gros compartiment visible */}
            <View style={styles.bigMomentSection}>
              <Text style={styles.sectionTitle}>Livres du moment !</Text>

              <FlatList
                ref={momentRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={BOOKS_MOMENT}
                keyExtractor={(item) => item.id}
                decelerationRate="fast"
                snapToInterval={momentItemW + momentGap}
                snapToAlignment="center"
                bounces={false}
                onMomentumScrollEnd={onMomentScrollEnd}
                contentContainerStyle={{ paddingHorizontal: momentSideSpace }}
                ItemSeparatorComponent={() => <View style={{ width: momentGap }} />}
                getItemLayout={(_, index) => ({
                  length: momentItemW + momentGap,
                  offset: (momentItemW + momentGap) * index,
                  index,
                })}
                renderItem={({ item }) => (
                  <View style={{ width: momentItemW }}>
                    <View style={[styles.momentCard, { width: momentItemW, height: momentItemH }]}>
                      <View style={{ flex: 1, paddingRight: 12 }}>
                        <Text style={styles.momentTitle}>{item.title.toUpperCase()}</Text>
                        <Text style={styles.momentText}>Découvre {item.title}</Text>
                      </View>

                      <View style={styles.momentCover}>
                        <Image
                          source={{ uri: item.coverUrl }}
                          style={StyleSheet.absoluteFillObject}
                          contentFit="cover"
                        />
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
            </View>

            {/* BAS : petits compartiments très doux */}
            <View style={styles.softSection}>
              <Text style={styles.sectionTitle}>Vos amis aiment</Text>
              {renderBookRow(BOOKS_FRIENDS)}
            </View>

            <View style={styles.softSection}>
              <Text style={styles.sectionTitle}>Fantasy</Text>
              {renderBookRow(BOOKS_FANTASY)}
            </View>

            <View style={styles.softSection}>
              <Text style={styles.sectionTitle}>Thriller</Text>
              {renderBookRow(BOOKS_THRILLER)}
            </View>

            <View style={styles.softSection}>
              <Text style={styles.sectionTitle}>Romance</Text>
              {renderBookRow(BOOKS_ROMANCE)}
            </View>

            <View style={styles.softSection}>
              <Text style={styles.sectionTitle}>Cozy</Text>
              {renderBookRow(BOOKS_COZY)}
            </View>

            <View style={{ height: 120 }} />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FEF6EF' },
  page: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 20,
  },

  headerRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
    minHeight: 84,
  },
  mascotte: {
    position: 'absolute',
    left: 0,
    top: -4,
    width: 72,
    height: 72,
  },
  bigTitle: {
    fontSize: 40,
    fontFamily: 'GillSans-Bold',
    color: '#291425',
    letterSpacing: 1,
    textAlign: 'center',
  },

  // petits compartiments discrets
  softSection: {
    marginTop: 14,
    paddingVertical: 6,
  },

  // gros compartiment visible pour livres du moment
  bigMomentSection: {
    marginTop: 16,
    padding: 14,
    borderRadius: 22,
    backgroundColor: 'rgba(254,246,239,0.38)',
  },

  sectionTitle: {
    marginBottom: 10,
    fontSize: 16,
    color: '#291425',
    fontFamily: 'GillSans-Bold',
  },

  rowTitle: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeMore: {
    color: '#BD61A6',
    fontFamily: 'GillSans-Bold',
    fontSize: 13,
  },

  heroCard: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },

  smallCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },

  badge: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  badgeText: {
    color: '#291425',
    fontSize: 12,
    fontFamily: 'GillSans-Bold',
  },

  momentCard: {
    borderRadius: 18,
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  momentTitle: {
    fontSize: 14,
    color: '#291425',
    marginBottom: 6,
    fontFamily: 'GillSans-Bold',
  },
  momentText: {
    fontSize: 13,
    color: 'rgba(41,20,37,0.70)',
    lineHeight: 18,
    fontFamily: 'GillSans',
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
  badgeRedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'GillSans-Bold',
  },

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
    backgroundColor: 'rgba(255,255,255,0.78)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeMini: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  badgeMiniText: {
    color: '#291425',
    fontSize: 10,
    fontFamily: 'GillSans-Bold',
  },

  bookCaption: {
    marginTop: 8,
    fontSize: 12,
    color: '#291425',
    fontFamily: 'GillSans',
  },
});