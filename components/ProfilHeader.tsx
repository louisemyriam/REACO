import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Settings } from 'lucide-react-native';

interface ProfileHeaderProps {
  avatarUrl?: string;
  fullName: string;
  username: string;
  bio?: string;
  onEditPress: () => void;
}

export function ProfileHeader({
  avatarUrl,
  fullName,
  username,
  bio,
  onEditPress,
}: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.avatarContainer}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {fullName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
          <Settings size={20} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.fullName}>{fullName}</Text>
        <Text style={styles.username}>@{username}</Text>
        {bio && <Text style={styles.bio}>{bio}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2E7D6F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  info: {
    gap: 4,
  },
  fullName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  username: {
    fontSize: 14,
    color: '#6B7280',
  },
  bio: {
    fontSize: 15,
    color: '#374151',
    marginTop: 8,
    lineHeight: 22,
  },
});
