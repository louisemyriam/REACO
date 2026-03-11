import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Objectif() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.background}>

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
          <Text style={styles.title}>Temps de lecture</Text>
          <Text style={styles.subtitle}>
            Lire 20 minutes par jour pendant 30 jours
          </Text>
        </View>

        <View>
          <Text style={styles.title}>
            <Ionicons size={24} name="square-outline" /> Valider l'objectif
          </Text>
        </View>

      </View>
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
  background: {
    flex: 1,
    backgroundColor: '#FCB040',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
});