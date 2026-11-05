import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/components/cinema-ui';
import { CastMember } from '@/features/cast/types';

export function CastCard({ member, index }: { member: CastMember; index: number }) {
  const artStyles = [styles.art0, styles.art1, styles.art2, styles.art3] as const;

  return (
    <View style={styles.card}>
      <View style={[styles.art, artStyles[index % artStyles.length]]}>
        <Text style={styles.scene}>مشهد رقم {String(index + 1).padStart(2, '0')}</Text>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {member.movie?.title || 'فيلم غير متوفر'}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.role}>{member.role}</Text>
        <Text style={styles.actorName}>{member.actor?.name || 'ممثل غير متوفر'}</Text>
        <Text style={styles.movieLine}>
          يشارك في <Text style={styles.movieName}>{member.movie?.title || 'فيلم غير متوفر'}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { overflow: 'hidden', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: colors.surface },
  art: { minHeight: 105, justifyContent: 'space-between', padding: 14, backgroundColor: '#243137' },
  art0: { backgroundColor: '#243137' },
  art1: { backgroundColor: '#382432' },
  art2: { backgroundColor: '#282847' },
  art3: { backgroundColor: '#3b3426' },
  scene: { color: colors.cyan, fontSize: 10 },
  movieTitle: { color: colors.text, fontSize: 18, fontWeight: '800', textAlign: 'right' },
  info: { alignItems: 'flex-end', gap: 6, padding: 14 },
  role: { color: colors.pink, fontSize: 12, fontWeight: '700' },
  actorName: { color: colors.text, fontSize: 18, fontWeight: '700' },
  movieLine: { color: colors.muted, fontSize: 12 },
  movieName: { color: colors.text, fontWeight: '700' },
});
