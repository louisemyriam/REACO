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
    backgroundColor: '#FFF4EC', // same as app background
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  avatarContainer: {
    alignItems: 'center',
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'rgba(41,20,37,0.10)',
  },

  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(189,97,166,0.25)', // soft purple
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },

  avatarText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#291425',
  },

  editButton: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,

    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',

    shadowColor: '#291425',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  info: {
    gap: 2,
  },

  fullName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#291425',
  },

  username: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(41,20,37,0.55)',
  },

  bio: {
    fontSize: 14,
    color: 'rgba(41,20,37,0.75)',
    marginTop: 6,
    lineHeight: 20,
  },
});

