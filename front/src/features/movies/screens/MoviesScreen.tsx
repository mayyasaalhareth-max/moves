import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import {
  AppScreen,
  colors,
  EmptyState,
  Notice,
  PageHeading,
  SearchField,
  SectionTitle,
} from '@/components/cinema-ui';
import { MovieCard } from '@/features/movies/components/MovieCard';
import { useMovies } from '@/features/movies/hooks/useMovies';

export default function MoviesScreen() {
  const { movies, loading, error: message } = useMovies();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('الكل');

  const categories = useMemo(
    () => ['الكل', ...new Set(movies.map((movie) => movie.category).filter(Boolean))],
    [movies],
  );
  const filteredMovies = useMemo(
    () =>
      movies.filter((movie) => {
        const matchesText = `${movie.title} ${movie.director} ${movie.category}`
          .toLowerCase()
          .includes(search.toLowerCase());
        return matchesText && (category === 'الكل' || movie.category === category);
      }),
    [movies, search, category],
  );

  return (
    <AppScreen>
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <PageHeading
              eyebrow="اكتشف مجموعتك"
              title="الأفلام"
              description={`${movies.length} أفلام في مجموعتك`}
            />
            {message ? <Notice tone="error">{message}</Notice> : null}
            <SearchField
              value={search}
              onChangeText={setSearch}
              placeholder="ابحث عن فيلم أو مخرج..."
            />
            <FlatList
              horizontal
              inverted
              data={categories}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryRow}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setCategory(item)}
                  style={[styles.chip, category === item && styles.activeChip]}
                >
                  <Text style={[styles.chipText, category === item && styles.activeChipText]}>
                    {item}
                  </Text>
                </Pressable>
              )}
            />
            <SectionTitle title="كل الأفلام" count={filteredMovies.length} />
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <Text style={styles.status}>جارٍ تحميل الأفلام...</Text>
          ) : (
            <EmptyState>لا توجد أفلام تطابق البحث.</EmptyState>
          )
        }
        renderItem={({ item, index }) => (
          <MovieCard
            movie={item}
            index={index}
            onPress={() => router.push({ pathname: '/movies/[id]', params: { id: item._id } })}
          />
        )}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  listContent: { paddingHorizontal: 16, paddingTop: 26, paddingBottom: 36, maxWidth: 790, width: '100%', alignSelf: 'center' },
  headerContent: { gap: 17, marginBottom: 18 },
  categoryRow: { gap: 8, paddingVertical: 2 },
  chip: { backgroundColor: colors.surfaceHigh, paddingHorizontal: 15, paddingVertical: 9, borderRadius: 20 },
  activeChip: { backgroundColor: colors.pink },
  chipText: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  activeChipText: { color: '#38111f' },
  gridRow: { gap: 12, marginBottom: 12 },
  status: { color: colors.muted, textAlign: 'center', padding: 22 },
});
