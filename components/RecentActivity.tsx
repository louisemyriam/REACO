import { View, Text, StyleSheet } from 'react-native';
import { BookOpen, CheckCircle2, Award } from 'lucide-react-native';

interface Activity {
  id: string;
  type: 'started' | 'completed' | 'achievement';
  title: string;
  subtitle?: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return null;
  }

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'started':
        return <BookOpen size={20} color="#2E7D6F" strokeWidth={2} />;
      case 'completed':
        return <CheckCircle2 size={20} color="#10B981" strokeWidth={2} />;
      case 'achievement':
        return <Award size={20} color="#F59E0B" strokeWidth={2} />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activités récentes</Text>
      <View style={styles.list}>
        {activities.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={styles.iconContainer}>
              {getActivityIcon(activity.type)}
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              {activity.subtitle && (
                <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
              )}
              <Text style={styles.activityTime}>{activity.timestamp}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
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

  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#291425',
    marginBottom: 14,
  },

  list: {
    gap: 14,
  },

  activityItem: {
    flexDirection: 'row',
    gap: 12,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,244,236,0.90)', // warm
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activityContent: {
    flex: 1,
    gap: 2,
  },

  activityTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#291425',
  },

  activitySubtitle: {
    fontSize: 13,
    color: 'rgba(41,20,37,0.70)',
  },

  activityTime: {
    fontSize: 12,
    color: 'rgba(41,20,37,0.50)',
    marginTop: 2,
  },
});
