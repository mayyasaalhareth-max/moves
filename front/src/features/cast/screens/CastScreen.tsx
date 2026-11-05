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
import { CastCard } from '@/features/cast/components/CastCard';
import { useCast } from '@/features/cast/hooks/useCast';

export default function CastScreen() {
  const { cast, loading, error: message } = useCast();
  const [search, setSearch] = useState('');

  const filteredCast = useMemo(
    () =>
      cast.filter((member) =>
        `${member.actor?.name} ${member.movie?.title} ${member.role}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [cast, search],
  );
  return (
    <AppScreen>
      <FlatList
        data={filteredCast}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <PageHeading
              eyebrow="من يقف وراء كل حكاية؟"
              title="طاقم الأفلام"
              description={`${cast.length} مشاركة في الأفلام`}
            />
            {message ? <Notice tone="error">{message}</Notice> : null}
            <SearchField
              value={search}
              onChangeText={setSearch}
              placeholder="ابحث عن ممثل أو فيلم أو دور..."
            />
            <Text style={styles.sectionTitle}>المشاركات · {filteredCast.length} نتيجة</Text>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <Text style={styles.status}>جارٍ تحميل طاقم الأفلام...</Text>
          ) : (
            <EmptyState>لا توجد مشاركات تطابق البحث.</EmptyState>
          )
        }
        renderItem={({ item, index }) => <CastCard member={item} index={index} />}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  listContent: { paddingHorizontal: 20, paddingTop: 26, paddingBottom: 36, maxWidth: 760, width: '100%', alignSelf: 'center' },
  headerContent: { gap: 17, marginBottom: 18 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '700', textAlign: 'right' },
  separator: { height: 12 },
  status: { color: colors.muted, textAlign: 'center', padding: 22 },
});