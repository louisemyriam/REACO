import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  progress?: number;
}

interface BookLibraryProps {
  title: string;
  books: Book[];
  showProgress?: boolean;
}

export function BookLibrary({ title, books, showProgress }: BookLibraryProps) {
  if (books.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{books.length}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {books.map((book) => (
          <View key={book.id} style={styles.bookCard}>
            {book.coverUrl ? (
              <Image source={{ uri: book.coverUrl }} style={styles.cover} />
            ) : (
              <View style={styles.coverPlaceholder}>
                <Text style={styles.coverText}>{book.title.charAt(0)}</Text>
              </View>
            )}
            {showProgress && book.progress !== undefined && (
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${book.progress}%` },
                  ]}
                />
              </View>
            )}
            <Text style={styles.bookTitle} numberOfLines={2}>
              {book.title}
            </Text>
            <Text style={styles.bookAuthor} numberOfLines={1}>
              {book.author}
            </Text>
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#291425', // Ridzy dark
    flex: 1,
  },

  count: {
    fontSize: 12,
    fontWeight: '800',
    color: '#291425',
    backgroundColor: 'rgba(251,176,64,0.25)', // light orange badge
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.10)',
  },

  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },

  bookCard: {
    width: 120,
  },

  cover: {
    width: 120,
    height: 180,
    borderRadius: 18, // more rounded (Ridzy style)
    backgroundColor: '#FFF4EC',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },

  coverPlaceholder: {
    width: 120,
    height: 180,
    borderRadius: 18,
    backgroundColor: 'rgba(189,97,166,0.25)', // light purple
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(41,20,37,0.08)',
  },

  coverText: {
    fontSize: 44,
    fontWeight: '900',
    color: '#291425',
  },

  progressContainer: {
    height: 6,
    backgroundColor: 'rgba(41,20,37,0.10)',
    borderRadius: 999,
    marginTop: 8,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#FBB040', // Ridzy orange
    borderRadius: 999,
  },

  bookTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#291425',
    marginTop: 8,
  },

  bookAuthor: {
    fontSize: 12,
    color: 'rgba(41,20,37,0.65)',
    marginTop: 2,
  },
});
