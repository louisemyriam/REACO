import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function Objectif() {
  const router = useRouter();
  const [progress] = useState(0.65);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg',
        }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.header}>

        

  <Ionicons
    size={24}
    name="arrow-back-outline"
    color="#FEF6EF"
    onPress={() => router.back()}
  />


  <View style={styles.titleContainer}>
    <Ionicons size={24} name="star-outline" color="#FEF6EF" />
    <Text style={styles.headerTitle}>Mon Objectif</Text>
  </View>

  <Ionicons size={24} name="pencil-outline" color="#FEF6EF" />
</View>
        <View style={styles.overlay}>
        <View style={styles.progressContainer}>
    <View style={styles.progressBackground}>
      <View
        style={[
          styles.progressFill,
          { width: `${progress * 100}%` },
        ]}
      />
    </View>
    <Text style={styles.progressText}>
      {Math.round(progress * 100)}%
    </Text>
  </View>
          <Text style={styles.title}> Temps de lecture </Text>
          <Text style={styles.subtitle}>
            Lire 20 minutes par jour pendant 30 jours
          </Text>
        </View>

        <View><Text style={styles.title}> <Ionicons size={24} name="square-outline"/> Valider l'objectif </Text></View>
        <View><Text style={styles.title}> Supprimer l'objectif </Text></View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  header: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 50,
    fontWeight: '700',
    fontFamily: 'GillSans',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.45)', // assombrit l'image
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 16,
  },
  progressBackground: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FEF6EF',
    borderRadius: 4,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});