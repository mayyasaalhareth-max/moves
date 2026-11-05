import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  ActionButton,
  AppScreen,
  colors,
  EmptyState,
  Field,
  Notice,
  Page,
  PageHeading,
  SearchField,
  SectionTitle,
  Surface,
} from '@/components/cinema-ui';
import {
  getActors,
  removeActor,
  saveActor,
} from '@/features/actors/services/actors-api';
import {
  addCastMember,
  getCast,
  removeCastMember,
  updateCastMember,
} from '@/features/cast/services/cast-api';
import {
  getMovies,
  removeMovie,
  saveMovie,
} from '@/features/movies/services/movies-api';
import {
  Actor,
  ActorFormData,
  emptyActor,
} from '@/features/actors/types';
import { CastMember } from '@/features/cast/types';
import { emptyMovie, Movie, MovieFormData, posters } from '@/features/movies/types';
import { Image } from 'expo-image';

type DashboardSection = 'movies' | 'actors' | 'cast';

const sectionLabels: Record<DashboardSection, string> = {
  movies: 'الأفلام',
  actors: 'الممثلون',
  cast: 'طاقم الأفلام',
};

function OptionChips<T extends { _id: string }>({
  label,
  options,
  selectedId,
  getLabel,
  onSelect,
}: {
  label: string;
  options: T[];
  selectedId: string;
  getLabel: (option: T) => string;
  onSelect: (id: string) => void;
}) {
  return (
    <View style={styles.optionGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {options.length === 0 ? (
        <Text style={styles.noOptions}>أضف {label === 'الفيلم' ? 'فيلمًا' : 'ممثلًا'} أولًا.</Text>
      ) : (
        <View style={styles.options}>
          {options.map((option) => (
            <Pressable
              key={option._id}
              onPress={() => onSelect(option._id)}
              style={[styles.option, selectedId === option._id && styles.selectedOption]}
            >
              <Text style={[styles.optionText, selectedId === option._id && styles.selectedOptionText]}>
                {getLabel(option)}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

export default function DashboardScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [section, setSection] = useState<DashboardSection>('movies');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [movieForm, setMovieForm] = useState<MovieFormData>(emptyMovie);
  const [editingMovieId, setEditingMovieId] = useState('');
  const [actorForm, setActorForm] = useState<ActorFormData>(emptyActor);
  const [editingActorId, setEditingActorId] = useState('');
  const [actorId, setActorId] = useState('');
  const [movieId, setMovieId] = useState('');
  const [role, setRole] = useState('');
  const [editingCastId, setEditingCastId] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([getMovies(), getActors(), getCast()])
      .then(([movieList, actorList, castList]) => {
        if (!active) return;
        setMovies(movieList);
        setActors(actorList);
        setCast(castList);
      })
      .catch((error: Error) => {
        if (active) {
          setMessage(error.message);
          setIsError(true);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filteredMovies = useMemo(
    () =>
      movies.filter((movie) =>
        `${movie.title} ${movie.director} ${movie.category}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [movies, search],
  );
  const filteredActors = useMemo(
    () =>
      actors.filter((actor) =>
        `${actor.name} ${actor.nationality}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [actors, search],
  );
  const filteredCast = useMemo(
    () =>
      cast.filter((member) =>
        `${member.actor?.name} ${member.movie?.title} ${member.role}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [cast, search],
  );

  function clearForm() {
    setShowForm(false);
    setEditingMovieId('');
    setMovieForm(emptyMovie);
    setEditingActorId('');
    setActorForm(emptyActor);
    setEditingCastId('');
    setActorId('');
    setMovieId('');
    setRole('');
  }

  function changeSection(next: DashboardSection) {
    setSection(next);
    setSearch('');
    setMessage('');
    clearForm();
  }

  function startCreate() {
    clearForm();
    setShowForm(true);
  }

  function editMovie(movie: Movie) {
    setEditingMovieId(movie._id);
    setMovieForm({
      title: movie.title,
      director: movie.director,
      category: movie.category,
      releaseDate: movie.releaseDate.slice(0, 10),
      rating: String(movie.rating),
    });
    setShowForm(true);
  }

  function editActor(actor: Actor) {
    setEditingActorId(actor._id);
    setActorForm({
      name: actor.name,
      birthDay: actor.birthDay.slice(0, 10),
      nationality: actor.nationality,
    });
    setShowForm(true);
  }

  function editCast(member: CastMember) {
    setEditingCastId(member._id);
    setActorId(member.actor?._id ?? '');
    setMovieId(member.movie?._id ?? '');
    setRole(member.role);
    setShowForm(true);
  }

  function notifyDelete(
    title: string,
    onConfirm: () => Promise<void>,
  ) {
    Alert.alert(title, 'لا يمكن التراجع عن هذا الإجراء.', [
      { text: 'إلغاء', style: 'cancel' },
      {
        text: 'حذف',
        style: 'destructive',
        onPress: () => {
          void onConfirm();
        },
      },
    ]);
  }

  async function deleteMovie(id: string) {
    try {
      await removeMovie(id);
      setMovies((current) => current.filter((movie) => movie._id !== id));
      setMessage('تم حذف الفيلم.');
      setIsError(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'تعذر حذف الفيلم.');
      setIsError(true);
    }
  }

  async function deleteActor(id: string) {
    try {
      await removeActor(id);
      setActors((current) => current.filter((actor) => actor._id !== id));
      setMessage('تم حذف الممثل.');
      setIsError(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'تعذر حذف الممثل.');
      setIsError(true);
    }
  }

  async function deleteCast(id: string) {
    try {
      await removeCastMember(id);
      setCast((current) => current.filter((member) => member._id !== id));
      setMessage('تمت إزالة الممثل من الفيلم.');
      setIsError(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'تعذرت إزالة الممثل.');
      setIsError(true);
    }
  }

  async function submitForm() {
    if (saving) return;
    setMessage('');
    if (section === 'movies') {
      if (!movieForm.title.trim() || !movieForm.director.trim() || !movieForm.category.trim() || !movieForm.releaseDate.trim() || !movieForm.rating.trim()) {
        setMessage('يرجى تعبئة جميع حقول الفيلم.');
        setIsError(true);
        return;
      }
      const rating = Number(movieForm.rating);
      if (!Number.isFinite(rating) || rating < 0 || rating > 10) {
        setMessage('يجب أن يكون التقييم رقمًا بين 0 و10.');
        setIsError(true);
        return;
      }
      setSaving(true);
      try {
        const saved = await saveMovie(editingMovieId, movieForm);
        setMovies((current) =>
          editingMovieId
            ? current.map((item) => item._id === editingMovieId ? saved : item)
            : [...current, saved],
        );
        setMessage(editingMovieId ? 'تم تعديل الفيلم.' : 'تمت إضافة الفيلم.');
        setIsError(false);
        clearForm();
      } catch (error) {
        setMessage(error instanceof Error ? error.message : 'تعذر حفظ الفيلم.');
        setIsError(true);
      } finally {
        setSaving(false);
      }
      return;
    }

    if (section === 'actors') {
      if (!actorForm.name.trim() || !actorForm.birthDay.trim() || !actorForm.nationality.trim()) {
        setMessage('يرجى تعبئة جميع حقول الممثل.');
        setIsError(true);
        return;
      }
      setSaving(true);
      try {
        const saved = await saveActor(editingActorId, actorForm);
        setActors((current) =>
          editingActorId
            ? current.map((item) => item._id === editingActorId ? saved : item)
            : [...current, saved],
        );
        setMessage(editingActorId ? 'تم تعديل الممثل.' : 'تمت إضافة الممثل.');
        setIsError(false);
        clearForm();
      } catch (error) {
        setMessage(error instanceof Error ? error.message : 'تعذر حفظ الممثل.');
        setIsError(true);
      } finally {
        setSaving(false);
      }
      return;
    }

    if (!actorId || !movieId || !role.trim()) {
      setMessage('اختر الفيلم والممثل واكتب الدور.');
      setIsError(true);
      return;
    }
    setSaving(true);
    try {
      const saved = editingCastId
        ? await updateCastMember(editingCastId, actorId, movieId, role)
        : await addCastMember(actorId, movieId, role);
      setCast((current) =>
        editingCastId
          ? current.map((item) => item._id === editingCastId ? saved : item)
          : [...current, saved],
      );
      setMessage(editingCastId ? 'تم تعديل مشاركة الممثل.' : 'تمت إضافة الممثل إلى الفيلم.');
      setIsError(false);
      clearForm();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'تعذر حفظ مشاركة الممثل.');
      setIsError(true);
    } finally {
      setSaving(false);
    }
  }

  const resultCount =
    section === 'movies' ? filteredMovies.length : section === 'actors' ? filteredActors.length : filteredCast.length;
  const sectionData = section === 'movies' ? filteredMovies : section === 'actors' ? filteredActors : filteredCast;

  return (
    <AppScreen>
      <Page>
        <PageHeading
          eyebrow="إدارة المحتوى"
          title="لوحة التحكم"
          description="أضف وعدّل واحذف بيانات مجموعتك من هنا."
        />

        <View style={styles.stats}>
          <Surface style={styles.stat}>
            <Text style={styles.statNumber}>{movies.length}</Text>
            <Text style={styles.statLabel}>أفلام</Text>
          </Surface>
          <Surface style={styles.stat}>
            <Text style={styles.statNumber}>{actors.length}</Text>
            <Text style={styles.statLabel}>ممثلون</Text>
          </Surface>
          <Surface style={styles.stat}>
            <Text style={styles.statNumber}>{cast.length}</Text>
            <Text style={styles.statLabel}>مشاركات</Text>
          </Surface>
        </View>

        <View style={styles.tabs}>
          {(Object.keys(sectionLabels) as DashboardSection[]).map((key) => (
            <Pressable
              key={key}
              onPress={() => changeSection(key)}
              style={[styles.tab, section === key && styles.activeTab]}
            >
              <Text style={[styles.tabText, section === key && styles.activeTabText]}>
                {sectionLabels[key]}
              </Text>
            </Pressable>
          ))}
        </View>

        <SearchField
          value={search}
          onChangeText={setSearch}
          placeholder={`ابحث في ${sectionLabels[section]}...`}
        />
        <ActionButton
          label={showForm ? 'إغلاق النموذج' : `+ أضف ${section === 'movies' ? 'فيلمًا' : section === 'actors' ? 'ممثلًا' : 'مشاركة'}`}
          onPress={() => (showForm ? clearForm() : startCreate())}
          variant="primary"
        />

        {showForm ? (
          <Surface>
            <Text style={styles.formTitle}>
              {section === 'movies'
                ? editingMovieId ? 'تعديل الفيلم' : 'إضافة فيلم جديد'
                : section === 'actors'
                  ? editingActorId ? 'تعديل بيانات الممثل' : 'إضافة ممثل جديد'
                  : editingCastId ? 'تعديل مشاركة الممثل' : 'إضافة ممثل إلى فيلم'}
            </Text>

            {section === 'movies' ? (
              <>
                <Field label="اسم الفيلم" value={movieForm.title} onChangeText={(value) => setMovieForm({ ...movieForm, title: value })} />
                <Field label="المخرج" value={movieForm.director} onChangeText={(value) => setMovieForm({ ...movieForm, director: value })} />
                <Field label="التصنيف" value={movieForm.category} onChangeText={(value) => setMovieForm({ ...movieForm, category: value })} />
                <Field label="تاريخ الإصدار (YYYY-MM-DD)" value={movieForm.releaseDate} onChangeText={(value) => setMovieForm({ ...movieForm, releaseDate: value })} placeholder="2026-01-31" />
                <Field label="التقييم من 10" value={movieForm.rating} onChangeText={(value) => setMovieForm({ ...movieForm, rating: value })} keyboardType="decimal-pad" />
              </>
            ) : section === 'actors' ? (
              <>
                <Field label="الاسم" value={actorForm.name} onChangeText={(value) => setActorForm({ ...actorForm, name: value })} />
                <Field label="تاريخ الميلاد (YYYY-MM-DD)" value={actorForm.birthDay} onChangeText={(value) => setActorForm({ ...actorForm, birthDay: value })} placeholder="1990-01-31" />
                <Field label="الجنسية" value={actorForm.nationality} onChangeText={(value) => setActorForm({ ...actorForm, nationality: value })} />
              </>
            ) : (
              <>
                <OptionChips
                  label="الفيلم"
                  options={movies}
                  selectedId={movieId}
                  getLabel={(item) => item.title}
                  onSelect={setMovieId}
                />
                <OptionChips
                  label="الممثل"
                  options={actors}
                  selectedId={actorId}
                  getLabel={(item) => item.name}
                  onSelect={setActorId}
                />
                <Field label="الدور" value={role} onChangeText={setRole} />
              </>
            )}

            {message ? <Notice tone={isError ? 'error' : 'success'}>{message}</Notice> : null}
            <View style={styles.formActions}>
              <ActionButton
                label={editingMovieId || editingActorId || editingCastId ? 'حفظ التعديل' : 'إضافة'}
                onPress={() => void submitForm()}
                disabled={saving}
              />
              <ActionButton label="إلغاء" variant="secondary" onPress={clearForm} />
            </View>
          </Surface>
        ) : null}

        {!showForm && message ? <Notice tone={isError ? 'error' : 'success'}>{message}</Notice> : null}
        <SectionTitle title={sectionLabels[section]} count={resultCount} />

        {loading ? (
          <Text style={styles.loading}>جارٍ تحميل البيانات...</Text>
        ) : sectionData.length === 0 ? (
          <EmptyState>لا توجد نتائج تطابق البحث.</EmptyState>
        ) : section === 'movies' ? (
          filteredMovies.map((movie, index) => (
            <Surface key={movie._id} style={styles.recordCard}>
              <Image
                source={{ uri: posters[index % posters.length] }}
                style={styles.poster}
                contentFit="cover"
                transition={150}
              />
              <View style={styles.recordInfo}>
                <Text style={styles.recordTitle}>{movie.title}</Text>
                <Text style={styles.recordMeta}>{movie.category} · ★ {movie.rating}</Text>
                <Text style={styles.recordMeta}>إخراج {movie.director}</Text>
                <View style={styles.recordActions}>
                  <ActionButton label="تعديل" variant="secondary" onPress={() => editMovie(movie)} />
                  <ActionButton label="حذف" variant="danger" onPress={() => notifyDelete('حذف الفيلم؟', () => deleteMovie(movie._id))} />
                </View>
              </View>
            </Surface>
          ))
        ) : section === 'actors' ? (
          filteredActors.map((actor) => (
            <Surface key={actor._id} style={styles.recordCard}>
              <View style={styles.actorAvatar}>
                <Text style={styles.avatarText}>{actor.name.charAt(0)}</Text>
              </View>
              <View style={styles.recordInfo}>
                <Text style={styles.recordTitle}>{actor.name}</Text>
                <Text style={styles.recordMeta}>{actor.nationality}</Text>
                <Text style={styles.recordMeta}>تاريخ الميلاد: {actor.birthDay.slice(0, 10)}</Text>
                <View style={styles.recordActions}>
                  <ActionButton label="تعديل" variant="secondary" onPress={() => editActor(actor)} />
                  <ActionButton label="حذف" variant="danger" onPress={() => notifyDelete('حذف الممثل؟', () => deleteActor(actor._id))} />
                </View>
              </View>
            </Surface>
          ))
        ) : (
          filteredCast.map((member) => (
            <Surface key={member._id} style={styles.castCard}>
              <View style={styles.recordInfo}>
                <Text style={styles.recordTitle}>{member.actor?.name || 'ممثل غير متوفر'}</Text>
                <Text style={styles.recordMeta}>{member.role} · {member.movie?.title || 'فيلم غير متوفر'}</Text>
                <View style={styles.recordActions}>
                  <ActionButton label="تعديل" variant="secondary" onPress={() => editCast(member)} />
                  <ActionButton label="إزالة" variant="danger" onPress={() => notifyDelete('إزالة المشاركة؟', () => deleteCast(member._id))} />
                </View>
              </View>
            </Surface>
          ))
        )}
      </Page>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  stats: { flexDirection: 'row-reverse', gap: 8 },
  stat: { flex: 1, alignItems: 'center', paddingHorizontal: 8, paddingVertical: 14 },
  statNumber: { color: colors.pink, fontSize: 24, fontWeight: '800' },
  statLabel: { color: colors.muted, fontSize: 11 },
  tabs: { flexDirection: 'row-reverse', gap: 8 },
  tab: { flex: 1, paddingVertical: 11, borderRadius: 22, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center' },
  activeTab: { backgroundColor: colors.pink, borderColor: colors.pink },
  tabText: { color: colors.muted, fontSize: 11, fontWeight: '600' },
  activeTabText: { color: '#38111f' },
  formTitle: { color: colors.text, fontSize: 18, fontWeight: '800', textAlign: 'right' },
  formActions: { flexDirection: 'row-reverse', gap: 9, flexWrap: 'wrap' },
  optionGroup: { gap: 8 },
  fieldLabel: { color: colors.muted, fontSize: 13, textAlign: 'right' },
  options: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 7 },
  option: { maxWidth: '100%', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 18, backgroundColor: colors.surfaceHigh },
  selectedOption: { backgroundColor: colors.pink },
  optionText: { color: colors.text, fontSize: 12 },
  selectedOptionText: { color: '#38111f', fontWeight: '700' },
  noOptions: { color: colors.muted, textAlign: 'right', fontSize: 12 },
  recordCard: { flexDirection: 'row-reverse', alignItems: 'center' },
  poster: { width: 76, height: 110, borderRadius: 10, backgroundColor: colors.surfaceHigh },
  recordInfo: { flex: 1, alignItems: 'flex-end', gap: 7 },
  recordTitle: { color: colors.text, fontSize: 16, fontWeight: '700', textAlign: 'right' },
  recordMeta: { color: colors.muted, fontSize: 11, textAlign: 'right' },
  recordActions: { flexDirection: 'row-reverse', gap: 7, marginTop: 4, flexWrap: 'wrap' },
  actorAvatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3b2632' },
  avatarText: { color: colors.pink, fontSize: 23, fontWeight: '800' },
  castCard: { alignItems: 'stretch' },
  loading: { color: colors.muted, textAlign: 'center', padding: 20 },
});
