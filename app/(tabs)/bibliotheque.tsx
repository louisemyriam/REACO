import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';

import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const BOOKS = [
  {
    id: '1',
    title: 'Some Girls do',
    coverUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvPOe6v3wWmdEJXlcM--WdxKn9OlGA1Ue2A&s',
  },
  {
    id: '2',
    title: 'La femme de ménage',
    coverUrl:
      'https://m.media-amazon.com/images/I/613H6840ArL.jpg',
  },
  {
    id: '3',
    title: 'The Shining',
    coverUrl:
      'https://preview.redd.it/new-king-editions-v0-khd2lqh0mcld1.jpg?width=640&crop=smart&auto=webp&s=c87f91735c791bf93465dd0a378455da1f611221',
  },
  {
    id: '4',
    title: 'It Ends With Us ',
    coverUrl:
      'https://m.media-amazon.com/images/I/91CqNElQaKL._AC_UF1000,1000_QL80_.jpg',
  },
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
  {
    id: '8',
    title: 'Above all else',
    coverUrl:
      'https://everychildareader.net/wp-content/uploads/2021/07/Charlesbridge_Above-All-Else.jpg',
  },

];


export default function CatalogueScreen() {
  const [search, setSearch] = useState('');

  const screenW = Dimensions.get('window').width;
  const gap = 12;
  const gridItemW = Math.floor((screenW - 40 - gap) / 2); // padding 20 left + 20 right
  const gridItemH = Math.floor(gridItemW * 1.45);

  const horizontalW = 120;
  const horizontalH = Math.floor(horizontalW * 1.45);

  const newFiltered = BOOKS.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

 

  return (
    <SafeAreaView style={styles.safe}>
      {/* Main scroll is THIS FlatList */}
      <FlatList
  data={newFiltered}
  keyExtractor={(item) => item.id}
  numColumns={3}
  columnWrapperStyle={{ gap: 12 }}
  contentContainerStyle={styles.listContent}
  showsVerticalScrollIndicator={false}
  ListHeaderComponent={
    <View>
      <Text style={styles.title}>Bibliotheque</Text>

      <Pressable style={styles.buttonFiltre}>
        <Text style={styles.buttonText}>Filtre</Text>
      </Pressable>

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
    </View>
  }
  renderItem={({ item }) => (
    <View style={{ marginBottom: 12 }}>
      <Pressable style={[styles.bookCard, { width: horizontalW, height: horizontalH }]}>
        <Image
          source={{ uri: item.coverUrl }}
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
        />
      </Pressable>
    </View>
  )}
/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFF4EC',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#291425',
    marginBottom: 12,
  },
  buttonFiltre:{
    backgroundColor: '#FBB040',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },

  buttonText: {
  color: '#291425',
  fontWeight: '300',
  fontSize: 16,
},  
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
  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '800',
    color: '#291425',
  },
  bookCard: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },
});
