import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
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
    title: 'Pride and Prejudice',
    coverUrl: 'https://media.groupe.gallimard.fr/couvHD/J05298.jpg',
  },
  {
    id: '2',
    title: 'Le portrait de Dorian Gray',
    coverUrl: 'https://images.epagine.fr/799/9782073061799_1_75.jpg',
    //badge: 'NOUVEAUTÉ',
  },
  {
    id: '3',
    title: 'Les quatre filles du docteur March',
    coverUrl:
      'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/80_9782010023668_1_75.jpg',
  },

  {
    id: '4',
    title: 'Alice au pays des merveilles',
    coverUrl: 'https://m.media-amazon.com/images/I/91yLiYO7jtL.jpg',
  },
  /*{
    id: '5',
    title: 'Le Signe des Quatre',
    coverUrl:
      'https://m.media-amazon.com/images/I/61tPZAl8lTL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: '6',
    title: 'Frankenstein',
    coverUrl:
      'https://www.editions-delcourt.fr/sites/default/files/product/9782413010654.jpg',
  },*/
  {
    id: '5',
    title: 'Hauts de Hurelevant',
    coverUrl:
      'https://img.livraddict.com/covers/699/699427//couv10570987.jpg',
  },
];

const BOOKS_FOR_YOU: Book[] = [
  {
    id: 'fy1',
    title: 'Raison et sentiments',
    coverUrl:
      'https://media.groupe.gallimard.fr/couvHD/J05298.jpg',
  },
  {
    id: 'fy2',
    title: 'Les quatre filles du docteur March',
    coverUrl:
      'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/80_9782010023668_1_75.jpg',
  },
  {
    id: 'fy3',
    title: 'Le portrait de Dorian Gray',
    coverUrl: 'https://images.epagine.fr/799/9782073061799_1_75.jpg',
  },
  {
    id: 'fy4',
    title: 'Le Signe des Quatre',
    coverUrl:
      'https://m.media-amazon.com/images/I/61tPZAl8lTL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 'fy5',
    title: 'Alice au pays des merveilles',
    coverUrl: 'https://m.media-amazon.com/images/I/91yLiYO7jtL.jpg',
  },
];

const BOOKS_MOMENT: Book[] = [
  {
    id: 'm1',
    title: '1984',
    coverUrl: 'https://cdn1.booknode.com/book_cover/72/1984-72084-264-432.webp',
    badge: 'POPULAIRE',
  },
  {
    id: 'm2',
    title: 'Frankenstein',
    coverUrl:
      'https://www.editions-delcourt.fr/sites/default/files/product/9782413010654.jpg',
  },
  {
    id: 'm3',
    title: 'Les quatre filles du docteur March',
    coverUrl:
      'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/80_9782010023668_1_75.jpg',
  },
  {
    id: 'm4',
    title: 'raison et sentiments',
    coverUrl:
      'https://media.groupe.gallimard.fr/couvHD/J05298.jpg',
  },
];

const BOOKS_FRIENDS: Book[] = [
  {
    id: 'fr1',
    title: 'Les quatre filles du docteur March',
    coverUrl:
      'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/80_9782010023668_1_75.jpg',
  },
  {
    id: 'fr2',
    title: 'Raison et sentiments',
    coverUrl:
      'https://media.groupe.gallimard.fr/couvHD/J05298.jpg',
  },
  {
    id: 'fr3',
    title: 'Le portrait de Dorian Gray',
    coverUrl: 'https://images.epagine.fr/799/9782073061799_1_75.jpg',
  },
  {
    id: 'fr4',
    title: '1984',
    coverUrl: 'https://cdn1.booknode.com/book_cover/72/1984-72084-264-432.webp',
  },
];

const BOOKS_FANTASY: Book[] = [
  {
    id: 'f1',
    title: 'Frankenstein',
    coverUrl:
      'https://www.editions-delcourt.fr/sites/default/files/product/9782413010654.jpg',
  },
  {
    id: 'f2',
    title: 'Le Signe des Quatre',
    coverUrl:
      'https://m.media-amazon.com/images/I/61tPZAl8lTL._AC_UF1000,1000_QL80_.jpg',
  },
];

const BOOKS_THRILLER: Book[] = [
  {
    id: 't1',
    title: '1984',
    coverUrl: 'https://cdn1.booknode.com/book_cover/72/1984-72084-264-432.webp',
  },
  {
    id: 't2',
    title: 'Frankenstein',
    coverUrl:
      'https://www.editions-delcourt.fr/sites/default/files/product/9782413010654.jpg',
  },
  {
    id: 't3',
    title: 'Le Signe des Quatre',
    coverUrl:
      'https://m.media-amazon.com/images/I/61tPZAl8lTL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 't4',
    title: 'Et tombent les têtes',
    coverUrl:
      'https://media.hachette.fr/imgArticle/LGFLIVREDEPOCHE/2025/9782253940173-001-X.jpeg?source=web&v=01960388199d5179a0316f4bed7357a5',
  },
];

const BOOKS_ROMANCE: Book[] = [
  {
    id: 'r1',
    title: 'Raison et sentiments',
    coverUrl:
      'https://media.groupe.gallimard.fr/couvHD/J05298.jpg',
  },
  {
    id: 'r2',
    title: 'Roméo et Juliette',
    coverUrl:
      'https://images.epagine.fr/094/9782264081094_1_75.jpg',
  },
  {
    id: 'r3',
    title: 'Jamais plus',
    coverUrl:
      'https://m.media-amazon.com/images/I/81tFVqLBpRL.jpg',
    //badge: 'NOUVEAUTÉ',
  },
  {
    id: 'r4',
    title: 'Les quatre filles du docteur March',
    coverUrl:
      'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/80_9782010023668_1_75.jpg',
  },
  {
    id: 'r5',
    title: 'Le portrait de Dorian Gray',
    coverUrl: 'https://images.epagine.fr/799/9782073061799_1_75.jpg',
  },
  {
    id: 'r6',
    title: 'Alice au pays des merveilles',
    coverUrl: 'https://m.media-amazon.com/images/I/91yLiYO7jtL.jpg',
  },
];

const BOOKS_CLASSICS: Book[] = [
  {
    id: 'c1',
    title: 'Les quatre filles du docteur March',
    coverUrl:
      'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/80_9782010023668_1_75.jpg',
  },
  {
    id: 'c2',
    title: 'Raison et sentiments',
    coverUrl:
      'https://media.groupe.gallimard.fr/couvHD/J05298.jpg',
  },
  {
    id: 'c3',
    title: 'Le portrait de Dorian Gray',
    coverUrl: 'https://images.epagine.fr/799/9782073061799_1_75.jpg',
  },
  {
    id: 'c4',
    title: 'Alice au pays des merveilles',
    coverUrl: 'https://m.media-amazon.com/images/I/91yLiYO7jtL.jpg',
  },
  {
    id: 'c5',
    title: 'Conte de fées',
    coverUrl:
      'https://m.media-amazon.com/images/I/714rEAlmZLL.jpg',
    //badge: 'NOUVEAUTÉ',
  },
];

const BOOKS_HORROR: Book[] = [
  {
    id: 'h1',
    title: 'Frankenstein',
    coverUrl:
      'https://www.editions-delcourt.fr/sites/default/files/product/9782413010654.jpg',
  },
  {
    id: 'h2',
    title: 'Le Signe des Quatre',
    coverUrl:
      'https://m.media-amazon.com/images/I/61tPZAl8lTL._AC_UF1000,1000_QL80_.jpg',
  },
];

const BOOKS_DYSTOPIA: Book[] = [
  {
    id: 'd1',
    title: '1984',
    coverUrl: 'https://cdn1.booknode.com/book_cover/72/1984-72084-264-432.webp',
  },
];

const { width: screenW } = Dimensions.get('window');

const HERO_ITEM_WIDTH = Math.floor(screenW * 0.55);
const HERO_ITEM_HEIGHT = Math.floor(HERO_ITEM_WIDTH * 1.4);
const HERO_SPACING = 18;

export default function HomeScreen() {
  const router = useRouter();
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

  const openBook = (item: Book) => {
    if (item.id === '1') {
      router.push({
        pathname: '/book/[id]',
        params: { id: '3' },
      });
      return;
    }

    if (item.id === 'm2') {
      router.push({
        pathname: '/book/[id]',
        params: { id: '4' },
      });
      return;
    }
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
          <Pressable
  style={[styles.smallCard, { width: smallW, height: smallH }]}
  onPress={() => openBook(item)}
>
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
        keyExtractor={(item) => item.key}
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
                     <Pressable
  style={[styles.heroCard, { height: HERO_ITEM_HEIGHT }]}
  onPress={() => openBook(item)}
>
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

            <View style={styles.softSection}>
              <View style={styles.rowTitle}>
                <Text style={styles.sectionTitle}>Pour vous</Text>
                <Pressable>
                  <Text style={styles.seeMore}>Voir tout</Text>
                </Pressable>
              </View>
              {renderBookRow(BOOKS_FOR_YOU)}
            </View>

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
                    <Pressable
  style={[styles.momentCard, { width: momentItemW, height: momentItemH }]}
  onPress={() => openBook(item)}
>
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
                    </Pressable>
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
              <Text style={styles.sectionTitle}>Classiques</Text>
              {renderBookRow(BOOKS_CLASSICS)}
            </View>

            <View style={styles.softSection}>
              <Text style={styles.sectionTitle}>Horreur</Text>
              {renderBookRow(BOOKS_HORROR)}
            </View>

            <View style={styles.softSection}>
              <Text style={styles.sectionTitle}>Dystopie</Text>
              {renderBookRow(BOOKS_DYSTOPIA)}
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

  softSection: {
    marginTop: 14,
    paddingVertical: 6,
  },

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