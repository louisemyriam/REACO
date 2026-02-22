import { BadgesSection } from '@/components/BadgeSection';
import { BookLibrary } from '@/components/BookLibrary';
import { ProfileHeader } from '@/components/ProfilHeader';
import { RecentActivity } from '@/components/RecentActivity';
import { SocialStats } from '@/components/SocialStats';
import { WeeklyProgress } from '@/components/WeeklyProgress';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const [profile] = useState({
    id: '1',
    username: 'lecteur_zen',
    fullName: 'Marie Dubois',
    avatarUrl: '',
    bio: 'En pleine lecture de fantasy ✨',
    readingLevel: 5,
    totalReadingTime: 420,
    booksCompleted: 12,
    currentStreak: 7,
    longestStreak: 14,
    profileVisibility: 'public',
    showStats: true,
  });

  const router = useRouter();
  const handleGoalPress = () => {
    router.push('/objectif' as Href);
  };
  const handleCreateGoalPress = () => {
    router.push('/creerobjectif' as Href);
  };

  <View style={styles.goalsContainer}>
  <TouchableOpacity
    style={styles.goalCard}
    onPress={() => router.push('/objectif' as Href)}
  >
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg' }}
      style={styles.goalImage}
      imageStyle={styles.goalImageStyle}
    >
      <View style={styles.goalOverlay}>
        <Text style={styles.goalText}>📖 20 min / jour</Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.goalCard}
    onPress={() => router.push('/objectif' as Href)}
  >
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg' }}
      style={styles.goalImage}
      imageStyle={styles.goalImageStyle}
    >
      <View style={styles.goalOverlay}>
        <Text style={styles.goalText}>📚 2 livres / mois</Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>

  <View style={styles.goalContainer}>
  <TouchableOpacity style={styles.goalButton} onPress={handleCreateGoalPress}>
    <Ionicons size={24} name="add-outline" color="#FFFFFF" />
  </TouchableOpacity>
</View>

</View>

  const [badges] = useState([
    {
      id: '1',
      icon: '🔥',
      name: 'Streak 7j',
      description: '7 jours consécutifs',
    },
    {
      id: '2',
      icon: '📚',
      name: 'Lecteur',
      description: '10 livres lus',
    },
    {
      id: '3',
      icon: '🌟',
      name: 'Régularité',
      description: 'Lecture quotidienne',
    },
  ]);

  const [currentlyReading] = useState([
    {
      id: '1',
      title: 'Le Seigneur des Anneaux',
      author: 'J.R.R. Tolkien',
      coverUrl: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg',
      progress: 65,
    },
    {
      id: '2',
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      coverUrl: '',
      progress: 30,
    },
  ]);

  const [toRead] = useState([
    {
      id: '3',
      title: '1984',
      author: 'George Orwell',
      coverUrl: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg',
    },
    {
      id: '4',
      title: "L'Étranger",
      author: 'Albert Camus',
      coverUrl: '',
    },
    {
      id: '5',
      title: 'Orgueil et Préjugés',
      author: 'Jane Austen',
      coverUrl: 'https://images.pexels.com/photos/1301585/pexels-photo-1301585.jpeg',
    },
  ]);

  const [completed] = useState([
    {
      id: '6',
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      coverUrl: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg',
    },
    {
      id: '7',
      title: 'Les Misérables',
      author: 'Victor Hugo',
      coverUrl: '',
    },
  ]);

  const [weeklyStats] = useState([
    { day: 'Lun', minutes: 30, hasRead: true },
    { day: 'Mar', minutes: 45, hasRead: true },
    { day: 'Mer', minutes: 20, hasRead: true },
    { day: 'Jeu', minutes: 60, hasRead: true },
    { day: 'Ven', minutes: 40, hasRead: true },
    { day: 'Sam', minutes: 50, hasRead: true },
    { day: 'Dim', minutes: 35, hasRead: true },
  ]);

  const [activities] = useState([
    {
      id: '1',
      type: 'completed' as const,
      title: 'Livre terminé',
      subtitle: 'Le Petit Prince',
      timestamp: "Il y a 2 jours",
    },
    {
      id: '2',
      type: 'started' as const,
      title: 'Nouvelle lecture',
      subtitle: 'Le Seigneur des Anneaux',
      timestamp: "Il y a 3 jours",
    },
    {
      id: '3',
      type: 'achievement' as const,
      title: 'Badge obtenu',
      subtitle: 'Streak de 7 jours',
      timestamp: "Il y a 5 jours",
    },
  ]);

  const handleEditProfile = () => {
    Alert.alert('Modifier le profil', 'Fonctionnalité en cours de développement');
  };

  const handleShareProfile = () => {
    Alert.alert('Partager', 'Fonctionnalité de partage en cours de développement');
  };

  const motivationalMessage =
    profile.currentStreak > 0
      ? `Continue comme ça ! Plus que 1 jour pour atteindre ${profile.currentStreak + 1} jours de suite 🎉`
      : 'Lance une nouvelle session de lecture pour commencer un streak !';

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader
        avatarUrl={profile.avatarUrl}
        fullName={profile.fullName}
        username={profile.username}
        bio={profile.bio}
        onEditPress={handleEditProfile}
      />

      <SocialStats
        followersCount={142}
        followingCount={89}
        clubsCount={3}
        onSharePress={handleShareProfile}
      />
      <View style={styles.goalsRow}>
        <View style={styles.goalContainer}>
        <TouchableOpacity style={styles.goalButton} onPress={handleGoalPress}>
        <Text style={styles.goalButtonText}>Mon objectif 1</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.goalContainer}>
        <TouchableOpacity style={styles.goalButton} onPress={handleGoalPress}>
        <Text style={styles.goalButtonText}>Mon objectif 2</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.goalContainer}>
        <TouchableOpacity style={styles.goalButton} onPress={handleGoalPress}>
        <View> <Ionicons size={24} name="add-outline"/></View>
        </TouchableOpacity>
      </View>
      </View>
      

      {profile.showStats && (
        <>

          <BadgesSection badges={badges} />

          <WeeklyProgress weeklyStats={weeklyStats} />
        </>
      )}

      <View style={styles.divider} />

      <BookLibrary
        title="📖 En cours de lecture"
        books={currentlyReading}
        showProgress={true}
      />

      <BookLibrary title="📚 À lire plus tard" books={toRead} />

      <BookLibrary title="✅ Livres terminés" books={completed} />

      <View style={styles.divider} />

      <RecentActivity activities={activities} />

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  goalsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // aligne à gauche
    paddingHorizontal: 12,
    marginTop: 20,
  },
  goalContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  goalButton: {
    backgroundColor: '#BD61A6',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  goalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  goalsContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 16,
  },
  goalCard: {
    height: 140,
    borderRadius: 20,
    overflow: 'hidden',
  },
  goalImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  goalImageStyle: {
    borderRadius: 20,
  },
  goalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 16,
  },
  goalText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  divider: {
    height: 8,
    backgroundColor: '#F3F4F6',
    marginVertical: 8,
  },
  bottomSpace: {
    height: 40,
  },
});
