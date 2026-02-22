import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Parametres() {
  const router = useRouter();

  const [isPublic, setIsPublic] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back-outline"
          size={24}
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Paramètres</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* SECTION PROFIL */}
        <Text style={styles.sectionTitle}>Profil</Text>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="person-circle-outline" size={22} />
          <Text style={styles.rowText}>Modifier la photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="create-outline" size={22} />
          <Text style={styles.rowText}>Modifier nom et bio</Text>
        </TouchableOpacity>

        {/* SECTION CONFIDENTIALITÉ */}
        <Text style={styles.sectionTitle}>Confidentialité</Text>

        <View style={styles.rowBetween}>
          <Text style={styles.rowText}>Profil public</Text>
          <Switch value={isPublic} onValueChange={setIsPublic} />
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.rowText}>Afficher mes statistiques</Text>
          <Switch value={showStats} onValueChange={setShowStats} />
        </View>

        {/* SECTION NOTIFICATIONS */}
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.rowBetween}>
          <Text style={styles.rowText}>Notifications push</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        {/* SECTION COMPTE */}
        <Text style={styles.sectionTitle}>Compte</Text>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="lock-closed-outline" size={22} />
          <Text style={styles.rowText}>Changer le mot de passe</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.row, styles.logoutRow]}>
          <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          <Text style={[styles.rowText, { color: '#EF4444' }]}>
            Se déconnecter
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 24,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
  },
  rowText: {
    fontSize: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
  },
  logoutRow: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
});