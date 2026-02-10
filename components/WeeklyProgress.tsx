import { View, Text, StyleSheet } from 'react-native';
import { Circle } from 'lucide-react-native';

interface WeeklyProgressProps {
  weeklyStats: {
    day: string;
    minutes: number;
    hasRead: boolean;
  }[];
}

export function WeeklyProgress({ weeklyStats }: WeeklyProgressProps) {
  const maxMinutes = Math.max(...weeklyStats.map((stat) => stat.minutes), 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cette semaine</Text>
      <View style={styles.chartContainer}>
        {weeklyStats.map((stat, index) => {
          const height = (stat.minutes / maxMinutes) * 100;
          return (
            <View key={index} style={styles.dayColumn}>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${height}%`,
                      backgroundColor: stat.hasRead ? '#bd61A6' : '#E5E7EB',
                    },
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{stat.day}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <Circle size={8} color="#2E7D6F" fill="#2E7D6F" />
          <Text style={styles.legendText}>Lecture effectuée</Text>
        </View>
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
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    marginBottom: 12,
  },
  dayColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barContainer: {
    flex: 1,
    width: '70%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  legend: {
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
});
