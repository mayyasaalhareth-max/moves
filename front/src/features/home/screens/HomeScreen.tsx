import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton, AppScreen, colors, Page, PageHeading, Surface } from '@/components/cinema-ui';

const links = [
  { title: 'مكتبة الأفلام', description: 'تصفح مجموعتك وابحث عن فيلمك التالي.', route: '/movies' as const, icon: '▶' },
  { title: 'الممثلون', description: 'اكتشف الوجوه وراء القصص.', route: '/actors' as const, icon: '✦' },
  { title: 'طاقم الأفلام', description: 'شاهد الأدوار والمشاركات في كل فيلم.', route: '/cast' as const, icon: '◉' },
];

export default function HomeScreen() {
  return (
    <AppScreen>
      <Page>
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>أرشيف الأفلام · 2026</Text>
          <Text style={styles.heroTitle}>كل القصص{'\n'}تبدأ من هنا.</Text>
          <Text style={styles.heroDescription}>
            مجموعة أفلامك وممثليك، مرتبة في مكان واحد.
          </Text>
          <ActionButton label="استعرض الأفلام" onPress={() => router.push('/movies')} />
        </View>

        <PageHeading eyebrow="اكتشف مجموعتك" title="CineScope" description="مساحتك الخاصة لإدارة الأفلام والطاقم." />

        {links.map((item) => (
          <Surface key={item.route} style={styles.linkCard}>
            <View style={styles.linkCopy}>
              <Text style={styles.linkTitle}>{item.title}</Text>
              <Text style={styles.linkDescription}>{item.description}</Text>
            </View>
            <Text style={styles.linkIcon}>{item.icon}</Text>
            <ActionButton
              label="فتح القسم"
              variant="secondary"
              onPress={() => router.push(item.route)}
            />
          </Surface>
        ))}

        <Surface style={styles.manageCard}>
          <Text style={styles.linkTitle}>إدارة مجموعتك</Text>
          <Text style={styles.linkDescription}>
            أضف الأفلام والممثلين، وعدّل بياناتهم واربط أدوارهم بالأفلام.
          </Text>
          <ActionButton label="فتح لوحة التحكم" onPress={() => router.push('/dashboard')} />
        </Surface>
      </Page>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    padding: 22,
    minHeight: 290,
    justifyContent: 'center',
    gap: 14,
    borderRadius: 22,
    backgroundColor: '#19151a',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroEyebrow: { color: colors.cyan, fontWeight: '700', textAlign: 'right' },
  heroTitle: { color: colors.text, fontSize: 43, lineHeight: 52, fontWeight: '900', textAlign: 'right' },
  heroDescription: { color: colors.muted, fontSize: 15, lineHeight: 24, textAlign: 'right' },
  linkCard: { flexDirection: 'row-reverse', alignItems: 'center', flexWrap: 'wrap' },
  linkCopy: { flex: 1, minWidth: 190, gap: 6 },
  linkTitle: { color: colors.text, fontSize: 17, fontWeight: '700', textAlign: 'right' },
  linkDescription: { color: colors.muted, fontSize: 13, lineHeight: 20, textAlign: 'right' },
  linkIcon: { color: colors.pink, fontSize: 22, marginHorizontal: 8 },
  manageCard: { borderColor: colors.border },
});
