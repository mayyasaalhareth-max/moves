import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/components/cinema-ui';
import { Actor } from '@/features/actors/types';

export function ActorCard({ actor, index }: { actor: Actor; index: number }) {
  const avatarStyles = [styles.avatar0, styles.avatar1, styles.avatar2, styles.avatar3] as const;

  return (
    <View style={styles.card}>
      <View style={[styles.avatar, avatarStyles[index % avatarStyles.length]]}>
        <Text style={styles.avatarText}>{actor.name.charAt(0)}</Text>
      </View>
      <Text style={styles.nationality}>ممثل · {actor.nationality}</Text>
      <Text style={styles.name} numberOfLines={2}>{actor.name}</Text>
      <Text style={styles.birthday}>تاريخ الميلاد: {actor.birthDay?.slice(0, 10)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 0, minHeight: 184, alignItems: 'flex-end', justifyContent: 'center', gap: 9, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: colors.surface, padding: 14 },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3b2632' },
  avatar0: { backgroundColor: '#3b2632' },
  avatar1: { backgroundColor: '#18373a' },
  avatar2: { backgroundColor: '#34304a' },
  avatar3: { backgroundColor: '#443525' },
  avatarText: { color: colors.pink, fontSize: 22, fontWeight: '800' },
  nationality: { color: colors.cyan, fontSize: 10, textAlign: 'right' },
  name: { color: colors.text, fontSize: 16, fontWeight: '700', textAlign: 'right' },
  birthday: { color: colors.muted, fontSize: 10, textAlign: 'right' },
});
