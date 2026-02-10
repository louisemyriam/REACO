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
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  count: {
    fontSize: 14,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  bookCard: {
    width: 120,
  },
  cover: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  coverPlaceholder: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#2E7D6F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2E7D6F',
    borderRadius: 2,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});
