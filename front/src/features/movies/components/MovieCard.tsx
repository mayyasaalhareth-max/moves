import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/components/cinema-ui';
import { Movie, posters } from '@/features/movies/types';

export function MovieCard({
  movie,
  index,
  onPress,
}: {
  movie: Movie;
  index: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.poster}>
        <Image
          source={{ uri: posters[index % posters.length] }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={180}
        />
        <View style={styles.ratingBadge}>
          <Text style={styles.rating}>★ {movie.rating}</Text>
        </View>
        <View style={styles.caption}>
          <Text style={styles.category}>{movie.category} · {movie.releaseDate?.slice(0, 4)}</Text>
          <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
        </View>
      </View>
      <Text style={styles.director} numberOfLines={1}>إخراج {movie.director}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 0, overflow: 'hidden', borderRadius: 15, backgroundColor: colors.surface, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  poster: { height: 224, justifyContent: 'flex-end', overflow: 'hidden', backgroundColor: colors.surfaceHigh },
  ratingBadge: { position: 'absolute', top: 10, left: 10, borderRadius: 15, backgroundColor: 'rgba(14,14,14,0.8)', paddingHorizontal: 9, paddingVertical: 5 },
  rating: { color: colors.pink, fontSize: 11, fontWeight: '700' },
  caption: { padding: 12, backgroundColor: 'rgba(10,10,12,0.76)', gap: 5 },
  category: { color: colors.cyan, fontSize: 10 },
  title: { color: '#fff', fontSize: 16, fontWeight: '800', textAlign: 'right' },
  director: { color: colors.muted, fontSize: 11, padding: 10, textAlign: 'right' },
  pressed: { opacity: 0.8 },
});
