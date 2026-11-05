import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import {
  ActionButton,
  AppScreen,
  colors,
  EmptyState,
  Notice,
  Page,
  Surface,
} from '@/components/cinema-ui';
import { getMovie } from '@/features/movies/services/movies-api';
import { getMovieActors } from '@/features/cast/services/cast-api';
import { Movie } from '@/features/movies/types';
import { MovieActor } from '@/features/cast/types';

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [actors, setActors] = useState<MovieActor[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let active = true;
    Promise.allSettled([getMovie(id), getMovieActors(id)])
      .then(([movieResult, actorResult]) => {
        if (!active) return;
        const errors: string[] = [];
        if (movieResult.status === 'fulfilled') {
          setMovie(movieResult.value);
        } else {
          errors.push(movieResult.reason instanceof Error ? movieResult.reason.message : 'تعذر تحميل الفيلم.');
        }
        if (actorResult.status === 'fulfilled') {
          setActors(actorResult.value);
        } else {
          errors.push(actorResult.reason instanceof Error ? actorResult.reason.message : 'تعذر تحميل الممثلين.');
        }
        if (errors.length > 0) setMessage(errors.join(' '));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <AppScreen>
      <Page>
        <ActionButton label="العودة إلى الأفلام" variant="secondary" onPress={() => router.back()} />
        {message ? <Notice tone="error">{message}</Notice> : null}
        {loading ? (
          <Text style={styles.status}>جارٍ تحميل الفيلم...</Text>
        ) : !movie ? (
          <EmptyState>تعذر العثور على الفيلم.</EmptyState>
        ) : (
          <>
            <View style={styles.hero}>
              <Text style={styles.category}>{movie.category}</Text>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.description}>
                فيلم من إخراج {movie.director}. اكتشف معلومات الفيلم والممثلين المشاركين فيه.
              </Text>
              <View style={styles.meta}>
                <Text style={styles.metaItem}>سنة الإصدار: {movie.releaseDate?.slice(0, 4)}</Text>
                <Text style={styles.metaItem}>التقييم: ★ {movie.rating} / 10</Text>
              </View>
              <ActionButton label="إدارة طاقم الفيلم" onPress={() => router.push('/dashboard')} />
            </View>

            <View style={styles.sectionHeading}>
              <Text style={styles.sectionTitle}>الممثلون في الفيلم</Text>
              <Text style={styles.count}>{actors.length} مشاركات</Text>
            </View>
            {actors.length === 0 ? (
              <EmptyState>لم تتم إضافة ممثلين لهذا الفيلم بعد.</EmptyState>
            ) : (
              actors.map((item) => (
                <Surface key={item._id} style={styles.actorRow}>
                  <View>
                    <Text style={styles.actorName}>{item.actor?.name || 'ممثل'}</Text>
                    <Text style={styles.role}>{item.role}</Text>
                  </View>
                  <Text style={styles.star}>✦</Text>
                </Surface>
              ))
            )}
          </>
        )}
      </Page>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: { minHeight: 300, justifyContent: 'flex-end', gap: 14, borderRadius: 22, backgroundColor: '#19151a', borderWidth: 1, borderColor: colors.border, padding: 22 },
  category: { color: colors.cyan, fontSize: 13, fontWeight: '700', textAlign: 'right' },
  title: { color: colors.text, fontSize: 36, fontWeight: '900', textAlign: 'right' },
  description: { color: colors.muted, fontSize: 14, lineHeight: 23, textAlign: 'right' },
  meta: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 12 },
  metaItem: { color: colors.text, fontSize: 12 },
  sectionHeading: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: '800' },
  count: { color: colors.pink, fontSize: 12 },
  actorRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  actorName: { color: colors.text, fontWeight: '700', fontSize: 15, textAlign: 'right' },
  role: { color: colors.muted, fontSize: 12, textAlign: 'right', marginTop: 4 },
  star: { color: colors.pink, fontSize: 20 },
  status: { color: colors.muted, textAlign: 'center', padding: 24 },
});
