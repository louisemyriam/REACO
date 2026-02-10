import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Users, UserPlus, Share2 } from 'lucide-react-native';

interface SocialStatsProps {
  followersCount: number;
  followingCount: number;
  clubsCount: number;
  onSharePress: () => void;
}

export function SocialStats({
  followersCount,
  followingCount,
  clubsCount,
  onSharePress,
}: SocialStatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{followersCount}</Text>
          <Text style={styles.statLabel}>abonnés</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{followingCount}</Text>
          <Text style={styles.statLabel}>abonnements</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{clubsCount}</Text>
          <Text style={styles.statLabel}>clubs</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={onSharePress}>
        <Share2 size={18} color="#2E7D6F" strokeWidth={2} />
        <Text style={styles.shareText}>Partager mon profil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F9F7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  shareText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#bd61A6',
  },
});
