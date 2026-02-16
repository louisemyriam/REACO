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
    padding: 18,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 22,

    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',

    shadowColor: '#291425',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
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
    fontWeight: '900',
    color: '#291425',
  },

  statLabel: {
    fontSize: 12,
    color: 'rgba(41,20,37,0.65)',
    marginTop: 4,
    fontWeight: '600',
  },

  divider: {
    width: 1,
    backgroundColor: 'rgba(41,20,37,0.10)',
  },

  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#FBB040', // main brand color
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    gap: 8,

    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },

  shareText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#291425',
  },
});
