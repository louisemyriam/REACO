import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';

type GenreItem = {
  id: string;
  label: string;
  coverUrl: string;
};

const GENRES: GenreItem[] = [
  {
    id: 'policier',
    label: 'Policier',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1689174608l/182484156.jpg',
  },
  {
    id: 'fantaisie',
    label: 'Fantaisie',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1468162656l/30688435.jpg',
  },
  {
    id: 'romance',
    label: 'Romance',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1484903841l/33574138.jpg',
  },
  {
    id: 'fiction',
    label: 'Fiction',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1591128476l/53138192.jpg',
  },
  {
    id: 'historique',
    label: 'Historique',
    coverUrl: 'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/3_9782755670790_1_75.jpg',
  },
  {
    id: 'comedie',
    label: 'Comédie',
    coverUrl: 'https://everychildareader.net/wp-content/uploads/2021/07/Charlesbridge_Above-All-Else.jpg',
  },
  {
    id: 'feelgood',
    label: 'Feel Good',
    coverUrl: 'https://m.media-amazon.com/images/I/613H6840ArL.jpg',
  },
  {
    id: 'thriller',
    label: 'Thriller',
    coverUrl: 'https://preview.redd.it/new-king-editions-v0-khd2lqh0mcld1.jpg?width=640&crop=smart&auto=webp&s=c87f91735c791bf93465dd0a378455da1f611221',
  },
  {
    id: 'polar',
    label: 'Polar',
    coverUrl: 'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/25_9782290415634_1_75.jpg',
  },
  {
    id: 'truecrime',
    label: 'True Crime',
    coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTucWZWAzV9HBtl4h18XCa4iCw9xHCLGSSS6g&s',
  },
  {
    id: 'dystopie',
    label: 'Distopie',
    coverUrl: 'https://m.media-amazon.com/images/I/91CqNElQaKL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 'chicklit',
    label: 'Chick-lit',
    coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvPOe6v3wWmdEJXlcM--WdxKn9OlGA1Ue2A&s',
  },
];

export default function GenresScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // if you want EXACTLY 3, change to: selected.length === 3
  const canContinue = selected.length > 0;

  // responsive sizes
  const screenW = Dimensions.get('window').width;
  const gap = 14;
  const padding = 20;
  const itemW = Math.floor((screenW - padding * 2 - gap * 2) / 3); // 3 columns
  const coverH = Math.floor(itemW * 1.35);

  return (
    <LinearGradient
      colors={['#F7EDE6', '#F3D5B5']} 
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <View style={styles.container}>
  
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Text style={styles.question}>
          Quels genres{'\n'}littéraires{'\n'}aimerais-tu lire ?
        </Text>

        <Text style={styles.subtitle}>Sélectionne {selected.length}/3 genres :</Text>

        <FlatList
          data={GENRES}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={{ gap }}
          contentContainerStyle={{ gap, paddingTop: 14, paddingBottom: 14 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isOn = selected.includes(item.id);

            return (
              <Pressable onPress={() => toggle(item.id)} style={{ width: itemW }}>
                <View
                  style={[
                    styles.coverWrap,
                    { height: coverH },
                    isOn ? styles.coverOn : styles.coverOff,
                  ]}
                >
                  <Image source={{ uri: item.coverUrl }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
                  {isOn ? <View style={styles.selectedOverlay} /> : null}
                </View>

                <Text style={styles.genreLabel} numberOfLines={1}>
                  {item.label}
                </Text>
              </Pressable>
            );
          }}
        />

        <Pressable
          disabled={!canContinue}
          onPress={() => router.push('/(preferences)/frequence')}
          style={[styles.cta, canContinue ? styles.ctaOn : styles.ctaOff]}
        >
          <Text style={styles.ctaText}>Continuer</Text>
        </Pressable>
    
      </View>
    </SafeAreaView>
  </LinearGradient>
);

}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF4EC' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 18 },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  backText: {
    fontSize: 34,
    lineHeight: 34,
    color: '#FEC271',
    fontWeight: '900',
  },

  question: {
    fontSize: 34,
   // fontWeight: '900',
    fontFamily: 'GillSans-Bold',
    color: '#291425',
    lineHeight: 38,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#5B65AE',
    fontWeight: '700',
  },

  coverWrap: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  coverOff: {
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },
  coverOn: {
    borderWidth: 3,
    borderColor: '#5B65AE',
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(91,101,174,0.12)',
  },

  genreLabel: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '900',
    color: '#291425',
  },

  cta: {
    marginTop: 'auto',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 1,
  },
  ctaOn: { backgroundColor: '#5B65AE', borderColor: 'rgba(41,20,37,0.10)' },
  ctaOff: { backgroundColor: 'rgba(91,101,174,0.35)', borderColor: 'rgba(41,20,37,0.06)' },
  ctaText: { color: '#FFF4EC', fontWeight: '900', fontSize: 20 },
});
