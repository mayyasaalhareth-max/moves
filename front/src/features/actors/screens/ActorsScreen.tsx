import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import {
  AppScreen,
  colors,
  EmptyState,
  Notice,
  PageHeading,
  SearchField,
} from '@/components/cinema-ui';
import { ActorCard } from '@/features/actors/components/ActorCard';
import { useActors } from '@/features/actors/hooks/useActors';

export default function ActorsScreen() {
  const { actors, loading, error: message } = useActors();
  const [search, setSearch] = useState('');

  const filteredActors = useMemo(
    () =>
      actors.filter((actor) =>
        `${actor.name} ${actor.nationality}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [actors, search],
  );
  return (
    <AppScreen>
      <FlatList
        data={filteredActors}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <PageHeading
              eyebrow="وجوه وراء القصص"
              title="الممثلون"
              description={`${actors.length} ممثل في مجموعتك`}
            />
            {message ? <Notice tone="error">{message}</Notice> : null}
            <SearchField
              value={search}
              onChangeText={setSearch}
              placeholder="ابحث عن ممثل أو جنسية..."
            />
            <Text style={styles.sectionTitle}>كل الممثلين · {filteredActors.length} نتيجة</Text>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <Text style={styles.status}>جارٍ تحميل الممثلين...</Text>
          ) : (
            <EmptyState>لا يوجد ممثلون يطابقون البحث.</EmptyState>
          )
        }
        renderItem={({ item, index }) => <ActorCard actor={item} index={index} />}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  listContent: { paddingHorizontal: 16, paddingTop: 26, paddingBottom: 36, maxWidth: 790, width: '100%', alignSelf: 'center' },
  headerContent: { gap: 17, marginBottom: 18 },
  gridRow: { gap: 12, marginBottom: 12 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '700', textAlign: 'right' },
  status: { color: colors.muted, textAlign: 'center', padding: 22 },
});