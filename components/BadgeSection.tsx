import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface Badge {
  id: string;
  icon: string;
  name: string;
  description: string;
}

interface BadgesSectionProps {
  badges: Badge[];
}

export function BadgesSection({ badges }: BadgesSectionProps) {
  if (badges.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Badges</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {badges.map((badge) => (
          <View key={badge.id} style={styles.badgeCard}>
            <Text style={styles.badgeIcon}>{badge.icon}</Text>
            <Text style={styles.badgeName}>{badge.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#291425', // same dark text as rest of app
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },

  badgeCard: {
    width: 100,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 18, // same rounded style as books
    alignItems: 'center',

    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)', // soft border instead of grey

    // subtle soft shadow (like your cards)
    shadowColor: '#291425',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  badgeIcon: {
    fontSize: 28,
    marginBottom: 6,
  },

  badgeName: {
    fontSize: 12,
    color: 'rgba(41,20,37,0.7)', // same muted text as app
    textAlign: 'center',
    fontWeight: '600',
  },
});

