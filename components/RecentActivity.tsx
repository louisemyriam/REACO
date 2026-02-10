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
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  list: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
    gap: 4,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  activitySubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
