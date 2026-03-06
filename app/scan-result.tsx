import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLibraryStore } from './store/libraryStore';

export default function ScanResultScreen() {
  const router = useRouter();
  const { isbn } = useLocalSearchParams<{ isbn?: string }>();

  const addLecture = useLibraryStore((s) => s.addLecture);

  const handleValidate = () => {
    if (!isbn) return;

    // For now: placeholder book
    addLecture({
      id: Date.now().toString(),
      title: `Livre scanné (ISBN ${isbn})`,
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/91CqNElQaKL._AC_UF1000,1000_QL80_.jpg',
      isbn,
    });

    router.back(); // go back to scanner
    router.back(); // go back to bibliotheque
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page scan</Text>
      <Text style={styles.text}>ISBN détecté : {isbn}</Text>

      <Pressable style={styles.btn} onPress={handleValidate}>
        <Text style={styles.btnText}>Valider</Text>
      </Pressable>

      <Pressable style={[styles.btn, styles.btnGhost]} onPress={() => router.back()}>
        <Text style={[styles.btnText, { color: '#291425' }]}>Retour</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, justifyContent: 'center', backgroundColor: '#FEF1EA' },
  title: { fontSize: 22, fontWeight: '900', color: '#291425', marginBottom: 12 },
  text: { fontSize: 14, fontWeight: '700', color: 'rgba(41,20,37,0.7)', marginBottom: 18 },
  btn: { backgroundColor: '#FBB040', paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginBottom: 10 },
  btnGhost: { backgroundColor: 'rgba(255,255,255,0.7)', borderWidth: 1, borderColor: 'rgba(41,20,37,0.08)' },
  btnText: { fontWeight: '900', color: '#FEF1EA' },
});
