const STORAGE_KEY = "serial-series-v1";
const LANGUAGE_KEY = "serial-language-v1";
const VIEW_MODE_KEY = "serial-view-mode-v1";
const CUSTOM_INFO_KEY = "serial-custom-show-info-v1";
const CUSTOM_TRANSLATED_INFO_KEY = "serial-custom-show-info-ru-v1";
const DB_NAME = "serial-series-db";
const DB_VERSION = 1;
const DB_STORE = "kv";

const categories = [
  { id: "all", label: "Все сериалы" },
  { id: "watched", label: "Посмотрел" },
  { id: "dropped", label: "Забросил" },
  { id: "paused", label: "Начал, но не досмотрел" },
  { id: "wishlist", label: "Хочу посмотреть" },
];

const watchStatuses = [
  { id: "watching" },
  { id: "finished" },
  { id: "droppedStatus" },
  { id: "wishlistStatus" },
  { id: "waitingSeason" },
];

const translations = {
  ru: {
    appTitle: "Сериалы",
    records: "записей",
    all: "Все сериалы",
    watched: "Посмотрел",
    dropped: "Забросил",
    paused: "Начал, но не досмотрел",
    wishlist: "Хочу посмотреть",
    watching: "Смотрю",
    finished: "Закончил",
    droppedStatus: "Забросил",
    wishlistStatus: "Хочу посмотреть",
    waitingSeason: "Жду сезон",
    export: "Экспорт",
    import: "Импорт",
    reset: "Сброс",
    searchPlaceholder: "Поиск по названию или комментарию",
    add: "Добавить",
    sortRatingDesc: "Оценка: выше",
    sortRatingAsc: "Оценка: ниже",
    sortTitleAsc: "Название: А-Я",
    sortTitleDesc: "Название: Я-А",
    sortNewest: "Сначала новые",
    shelfView: "Полка",
    cardView: "Карточки",
    myList: "Мой список",
    searchResults: "Результаты поиска",
    total: "Всего",
    watchedStat: "Посмотрено",
    averageRating: "Средняя оценка",
    best: "Лучший",
    empty: "Ничего не найдено",
    newEntry: "Новая запись",
    addSeries: "Добавить сериал",
    editSeries: "Редактировать сериал",
    title: "Название",
    category: "Категория",
    watchStatus: "Статус просмотра",
    rating: "Оценка",
    comment: "Комментарий",
    cover: "Обложка",
    clearCover: "Убрать обложку",
    save: "Сохранить",
    deleteConfirm: "Удалить",
    resetConfirm: "Вернуть начальный список? Текущие изменения будут заменены.",
    importError: "Не получилось импортировать файл.",
    details: "Подробнее",
    trailer: "Трейлер",
    seasons: "Сезоны",
    episodes: "Серии",
    years: "Годы",
    status: "Статус",
    network: "Канал",
    language: "Язык",
    genres: "Жанры",
    cast: "Актёры",
    noInfo: "Информация пока не загружена.",
    noCast: "Актёры пока не загружены",
    noRole: "Роль не указана",
  },
  en: {
    appTitle: "Series",
    records: "entries",
    all: "All series",
    watched: "Watched",
    dropped: "Dropped",
    paused: "Started, not finished",
    wishlist: "Want to watch",
    watching: "Watching",
    finished: "Finished",
    droppedStatus: "Dropped",
    wishlistStatus: "Want to watch",
    waitingSeason: "Waiting season",
    export: "Export",
    import: "Import",
    reset: "Reset",
    searchPlaceholder: "Search by title or comment",
    add: "Add",
    sortRatingDesc: "Rating: high",
    sortRatingAsc: "Rating: low",
    sortTitleAsc: "Title: A-Z",
    sortTitleDesc: "Title: Z-A",
    sortNewest: "Newest first",
    shelfView: "Shelf",
    cardView: "Cards",
    myList: "My list",
    searchResults: "Search results",
    total: "Total",
    watchedStat: "Watched",
    averageRating: "Average rating",
    best: "Best",
    empty: "Nothing found",
    newEntry: "New entry",
    addSeries: "Add series",
    editSeries: "Edit series",
    title: "Title",
    category: "Category",
    watchStatus: "Watch status",
    rating: "Rating",
    comment: "Comment",
    cover: "Cover",
    clearCover: "Remove cover",
    save: "Save",
    deleteConfirm: "Delete",
    resetConfirm: "Restore the initial list? Current changes will be replaced.",
    importError: "Could not import this file.",
    details: "Details",
    trailer: "Trailer",
    seasons: "Seasons",
    episodes: "Episodes",
    years: "Years",
    status: "Status",
    network: "Network",
    language: "Language",
    genres: "Genres",
    cast: "Cast",
    noInfo: "No information loaded yet.",
    noCast: "Cast is not loaded yet",
    noRole: "Role not specified",
  },
};

const genreTranslations = {
  ru: {
    Action: "Экшен",
    Adventure: "Приключения",
    Anime: "Аниме",
    Comedy: "Комедия",
    Crime: "Криминал",
    Drama: "Драма",
    Espionage: "Шпионаж",
    Family: "Семейный",
    Fantasy: "Фэнтези",
    History: "История",
    Horror: "Ужасы",
    Legal: "Юридический",
    Medical: "Медицина",
    Mystery: "Мистика",
    Romance: "Романтика",
    "Science-Fiction": "Фантастика",
    Sports: "Спорт",
    Supernatural: "Сверхъестественное",
    Thriller: "Триллер",
    War: "Военный",
    Western: "Вестерн",
  },
};

const coverMap = {
  "Игра престолов": "assets/covers/игра-престолов.jpg",
  "Теория большого взрыва": "assets/covers/теория-большого-взрыва.jpg",
  "Во все тяжкие": "assets/covers/во-все-тяжкие.jpg",
  "Сверхъестественное": "assets/covers/сверхъестественное.jpg",
  "Офис": "assets/covers/офис.jpg",
  "Извне": "assets/covers/извне.jpg",
  "Чёрное зеркало": "assets/covers/черное-зеркало.jpg",
  "Тед Лассо": "assets/covers/тед-лассо.jpg",
  "Острые козырьки": "assets/covers/острые-козырьки.jpg",
  "Менталист": "assets/covers/менталист.jpg",
  "Друзья": "assets/covers/друзья.jpg",
  "Детство Шелдона": "assets/covers/детство-шелдона.jpg",
  "Киностудия": "assets/covers/киностудия.jpg",
  "Ход королевы": "assets/covers/ход-королевы.jpg",
  "Дом Дракона": "assets/covers/дом-дракона.jpg",
  "Хороший доктор": "assets/covers/хорошии-доктор.jpg",
  "Как я встретил вашу маму": "assets/covers/как-я-встретил-вашу-маму.jpg",
  "Лучше звоните Солу": "assets/covers/лучше-звоните-солу.jpg",
  "Сопрано": "assets/covers/сопрано.jpg",
  "Очень странные дела": "assets/covers/очень-странные-дела.jpg",
  "Ходячие мертвецы": "assets/covers/ходячие-мертвецы.jpg",
  "Сёгун": "assets/covers/сегун.jpg",
  "Охотник за разумом": "assets/covers/охотник-за-разумом.jpg",
  "Одни из нас": "assets/covers/одни-из-нас.jpg",
  "Киллербот": "assets/covers/киллербот.jpg",
  "Конец е****го мира": "assets/covers/конец-е-го-мира.jpg",
  "Чернобыль": "assets/covers/чернобыль.jpg",
  "Алиса в Пограничье": "assets/covers/алиса-в-пограничье.jpg",
  "Шерлок": "assets/covers/шерлок.jpg",
  "Гангстерленд": "assets/covers/гангстерленд.jpg",
  "Бумажный дом": "assets/covers/бумажныи-дом.jpg",
  "Фоллаут": "assets/covers/фоллаут.jpg",
  "Пингвин": "assets/covers/пингвин.jpg",
  "Укрытие": "assets/covers/укрытие.jpg",
  "Половое воспитание": "assets/covers/половое-воспитание.jpg",
  "Игра в кальмара": "assets/covers/игра-в-кальмара.jpg",
  "Первозданная Америка": "assets/covers/первозданная-америка.jpg",
  "Озарк": "assets/covers/озарк.jpg",
  "Американская семейка": "assets/covers/американская-семеика.jpg",
  "Остаться в живых": "assets/covers/остаться-в-живых.jpg",
  "Форс-мажоры": "assets/covers/форс-мажоры.jpg",
  "Настоящий детектив": "assets/covers/настоящии-детектив.jpg",
  "Викинги": "assets/covers/викинги.jpg",
  "Бесстыжие": "assets/covers/бесстыжие.jpg",
  "Уэнздей": "assets/covers/уэнздеи.jpg",
  "Два с половиной человека": "assets/covers/два-с-половинои-человека.jpg",
  "Карточный домик": "assets/covers/карточныи-домик.jpg",
  "Пацаны": "assets/covers/пацаны.jpg",
  "Йеллоустоун": "assets/covers/иеллоустоун.jpg",
  "Разделение": "assets/covers/разделение.jpg",
  "Сотня": "assets/covers/сотня.jpg",
  "Острые предметы": "assets/covers/острые-предметы.jpg",
  "Обмани меня": "assets/covers/обмани-меня.jpg",
  "Сцены из супружеской жизни": "assets/covers/сцены-из-супружескои-жизни.jpg",
  "Переходный возраст": "assets/covers/переходныи-возраст.jpg",
  "Когда они нас увидят": "assets/covers/когда-они-нас-увидят.jpg",
  "Наследники": "assets/covers/наследники.jpg",
  "Терапия": "assets/covers/терапия.jpg",
  "Лэндмен": "assets/covers/лэндмен.jpg",
  "Мышь": "assets/covers/мышь.jpg",
  "Миллиарды": "assets/covers/миллиарды.jpg",
  "Предложение": "assets/covers/предложение.jpg",
  "Мейр из Исттауна": "assets/covers/меир-из-исттауна.jpg",
  "Побег": "assets/covers/побег.jpg",
};

const initialSeries = [
  ["Игра престолов", "watched", 10, "Эталонный сериал."],
  ["Теория большого взрыва", "watched", 9.5, "Ситком, очень хороший."],
  ["Во все тяжкие", "watched", 9.5, "Очень хороший сериал."],
  ["Сверхъестественное", "watched", 9.5, "Идеальный сериал до седьмого сезона, дальше все хуже и хуже."],
  ["Офис", "watched", 9, "Хороший сериал, хороший юмор."],
  ["Извне", "watched", 9, "Очень понравился сериал, жду продолжения."],
  ["Чёрное зеркало", "watched", 9, "Хороший сериал с интересной концепцией."],
  ["Тед Лассо", "watched", 9, "Прикольный сериал, хороший юмор."],
  ["Острые козырьки", "watched", 9, "Очень интересный сериал."],
  ["Менталист", "watched", 9, "Очень хороший сериал, интересные истории."],
  ["Друзья", "watched", 9, "Легендарный ситком, можно смотреть и пересматривать под еду."],
  ["Детство Шелдона", "watched", 9, "Очень хороший ситком, чуть хуже оригинала, но в целом достойно."],
  ["Киностудия", "watched", 8.5, "Очень смешной сериал, жду продолжения."],
  ["Ход королевы", "watched", 8.5, "Хороший сериал для единоразового просмотра."],
  ["Дом Дракона", "watched", 8.5, "Хороший сериал, но хуже оригинала, немного скучновато. Жду продолжения."],
  ["Хороший доктор", "watched", 8.5, "Хороший интересный сериал, но местами отвратительный."],
  ["Как я встретил вашу маму", "watched", 8.5, "Хороший смешной ситком."],
  ["Лучше звоните Солу", "watched", 8, "Нормальный сериал, но хуже оригинала."],
  ["Сопрано", "watched", 8, "Хороший сериал, но немного скучноватый."],
  ["Очень странные дела", "watched", 8, "Очень хороший сериал."],
  ["Ходячие мертвецы", "watched", 8, "Очень захватывающий сериал до девятого сезона, дальше все хуже и хуже."],
  ["Сёгун", "watched", 8, "Хороший сериал с интересной историей."],
  ["Охотник за разумом", "watched", 8, "Интересный сериал, жалко что закрыли, нет концовки."],
  ["Одни из нас", "watched", 8, "Нормальный сериал. Если бы не главная актриса, которая бесит и не подходит под роль, был бы очень хорошим. Жду продолжения."],
  ["Киллербот", "watched", 8, "Хороший сериал для единоразового просмотра."],
  ["Конец е****го мира", "watched", 8, "Прикольный сериал с хорошим юмором, но для единоразового просмотра."],
  ["Чернобыль", "watched", 8, "Хороший сериал для единоразового просмотра."],
  ["Алиса в Пограничье", "watched", 8, "Интересный сериал, хоть и главные персонажи как будто бессмертные."],
  ["Шерлок", "watched", 7.5, "Сериал неплохой, один раз посмотреть можно."],
  ["Гангстерленд", "watched", 7.5, "Интересный сериал, жду продолжения."],
  ["Бумажный дом", "watched", 7.5, "Хороший сериал для единоразового просмотра."],
  ["Фоллаут", "watched", 7.5, "Сериал понравился, жду продолжения."],
  ["Пингвин", "watched", 7.5, "Интересный сериал, жду продолжения."],
  ["Укрытие", "watched", 7.5, "Хороший сериал, местами скучноватый, но смотреть можно. Жду продолжения."],
  ["Половое воспитание", "watched", 7.5, "В целом нормальный сериал для единоразового просмотра."],
  ["Игра в кальмара", "watched", 7, "Нормальный сериал для единоразового просмотра."],
  ["Первозданная Америка", "watched", 7, "Прикольный сериал, но немного скучноватый."],
  ["Озарк", "watched", 7, "Хороший сериал для одноразового просмотра, но местами скучноватый."],
  ["Американская семейка", "watched", 7, "Нормальный ситком."],
  ["Остаться в живых", "dropped", 9, "Идеальный и очень интересный сериал до четвёртого сезона, дальше смотреть невозможно. Первые три сезона 9/10, дальше 5/10."],
  ["Форс-мажоры", "dropped", 7.5, "Хороший сериал, интересно было смотреть до седьмого сезона, дальше стало скучновато. Первые семь сезонов 7.5/10, дальше 6/10."],
  ["Настоящий детектив", "dropped", 9, "Очень интересный сериал, первый сезон. Дальше перестал смотреть."],
  ["Викинги", "dropped", 8, "До четвёртого сезона очень интересный и хороший, но после стало скучно и перестал смотреть."],
  ["Бесстыжие", "dropped", 5, "Сериал не понравился, некоторые персонажи очень сильно раздражали. Перестал смотреть после третьего сезона."],
  ["Уэнздей", "dropped", 6, "Обычный сериал, посмотрел только из-за популярности. Второй сезон не смотрел и не буду."],
  ["Два с половиной человека", "dropped", 8, "Был очень хорошим ситкомом, пока не убили главного героя, потом перестал смотреть. Первые семь сезонов 8/10, дальше 3/10."],
  ["Карточный домик", "dropped", 8.5, "Очень хороший интересный сериал, пока был главный герой. После стал скучным, перестал смотреть. Первые сезоны 8.5/10, дальше 6/10."],
  ["Пацаны", "dropped", 2, "Посмотрел первый сезон, отвратительный сериал, перестал смотреть."],
  ["Йеллоустоун", "paused", null, "Посмотрел первый сезон, в целом понравилось, можно продолжать смотреть."],
  ["Разделение", "paused", null, "Посмотрел первую серию, показался скучноватым, но можно начать смотреть заново."],
  ["Сотня", "paused", null, "Посмотрел первые два сезона, понравилось, можно продолжать."],
  ["Острые предметы", "wishlist", null, ""],
  ["Обмани меня", "wishlist", null, ""],
  ["Сцены из супружеской жизни", "wishlist", null, ""],
  ["Переходный возраст", "wishlist", null, ""],
  ["Когда они нас увидят", "wishlist", null, ""],
  ["Наследники", "wishlist", null, ""],
  ["Терапия", "wishlist", null, ""],
  ["Лэндмен", "wishlist", null, ""],
  ["Мышь", "wishlist", null, ""],
  ["Миллиарды", "wishlist", null, ""],
  ["Предложение", "wishlist", null, ""],
  ["Мейр из Исттауна", "wishlist", null, ""],
  ["Побег", "wishlist", null, ""],
].map(([title, category, rating, comment], index) => ({
  id: `seed-${index + 1}`,
  title,
  category,
  watchStatus: defaultWatchStatus(category, comment),
  rating,
  comment,
  cover: coverMap[title] || "",
  createdAt: Date.now() + index,
}));

const state = {
  series: loadSeries(),
  activeCategory: "all",
  search: "",
  sort: "rating-desc",
  coverDraft: "",
  showInfo: {},
  translatedInfo: {},
  customInfo: loadStoredMap(CUSTOM_INFO_KEY),
  customTranslatedInfo: loadStoredMap(CUSTOM_TRANSLATED_INFO_KEY),
  language: localStorage.getItem(LANGUAGE_KEY) || "ru",
  viewMode: localStorage.getItem(VIEW_MODE_KEY) || "cards",
  db: null,
  sidebarCollapsed: window.matchMedia("(max-width: 860px)").matches,
  apiAvailable: false,
  currentUser: null,
  authMode: "login",
};

const els = {
  authScreen: document.querySelector("#authScreen"),
  loginTab: document.querySelector("#loginTab"),
  registerTab: document.querySelector("#registerTab"),
  authForm: document.querySelector("#authForm"),
  authLogin: document.querySelector("#authLogin"),
  authPassword: document.querySelector("#authPassword"),
  authError: document.querySelector("#authError"),
  sidebarToggle: document.querySelector("#sidebarToggle"),
  sidebarScrim: document.querySelector("#sidebarScrim"),
  totalCount: document.querySelector("#totalCount"),
  categoryNav: document.querySelector("#categoryNav"),
  searchInput: document.querySelector("#searchInput"),
  sortSelect: document.querySelector("#sortSelect"),
  languageSelect: document.querySelector("#languageSelect"),
  viewModeButton: document.querySelector("#viewModeButton"),
  openFormButton: document.querySelector("#openFormButton"),
  statsGrid: document.querySelector("#statsGrid"),
  currentCategoryLabel: document.querySelector("#currentCategoryLabel"),
  sectionTitle: document.querySelector("#sectionTitle"),
  visibleCount: document.querySelector("#visibleCount"),
  seriesGrid: document.querySelector("#seriesGrid"),
  dialog: document.querySelector("#seriesDialog"),
  form: document.querySelector("#seriesForm"),
  closeFormButton: document.querySelector("#closeFormButton"),
  editingId: document.querySelector("#editingId"),
  formTitle: document.querySelector("#formTitle"),
  titleInput: document.querySelector("#titleInput"),
  categoryInput: document.querySelector("#categoryInput"),
  watchStatusInput: document.querySelector("#watchStatusInput"),
  ratingInput: document.querySelector("#ratingInput"),
  commentInput: document.querySelector("#commentInput"),
  coverInput: document.querySelector("#coverInput"),
  coverPreview: document.querySelector("#coverPreview"),
  clearCoverButton: document.querySelector("#clearCoverButton"),
  exportButton: document.querySelector("#exportButton"),
  importInput: document.querySelector("#importInput"),
  resetButton: document.querySelector("#resetButton"),
  usersButton: document.querySelector("#usersButton"),
  logoutButton: document.querySelector("#logoutButton"),
  usersDialog: document.querySelector("#usersDialog"),
  closeUsersButton: document.querySelector("#closeUsersButton"),
  usersList: document.querySelector("#usersList"),
  detailsDialog: document.querySelector("#detailsDialog"),
  detailsPanel: document.querySelector("#detailsPanel"),
  closeDetailsButton: document.querySelector("#closeDetailsButton"),
  detailsCover: document.querySelector("#detailsCover"),
  detailsCategory: document.querySelector("#detailsCategory"),
  detailsTitle: document.querySelector("#detailsTitle"),
  detailsOriginal: document.querySelector("#detailsOriginal"),
  trailerButton: document.querySelector("#trailerButton"),
  detailsStats: document.querySelector("#detailsStats"),
  detailsSummary: document.querySelector("#detailsSummary"),
  detailsGenresWrap: document.querySelector("#detailsGenresWrap"),
  detailsGenres: document.querySelector("#detailsGenres"),
  detailsCast: document.querySelector("#detailsCast"),
};

function t(key) {
  return translations[state.language][key] || translations.ru[key] || key;
}

function canAddSeries() {
  return !state.apiAvailable || state.currentUser?.role === "admin" || state.currentUser?.canAdd;
}

function canEditSeries() {
  return !state.apiAvailable || state.currentUser?.role === "admin" || state.currentUser?.canEdit;
}

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

async function saveServerState() {
  if (!state.apiAvailable || !state.currentUser || !canEditSeries() && !canAddSeries()) return;
  await apiRequest("/api/series", {
    method: "PUT",
    body: JSON.stringify({
      series: state.series,
      customInfo: state.customInfo,
      customTranslatedInfo: state.customTranslatedInfo,
    }),
  });
}

async function initAuth() {
  try {
    const session = await apiRequest("/api/session");
    state.apiAvailable = true;
    state.currentUser = session.user;
    if (!state.currentUser) {
      showAuth();
      return;
    }
    await loadServerState();
  } catch {
    state.apiAvailable = false;
  }
}

function showAuth() {
  document.body.classList.add("auth-locked");
  els.authScreen.hidden = false;
  els.authLogin.focus();
}

function hideAuth() {
  document.body.classList.remove("auth-locked");
  els.authScreen.hidden = true;
  els.authError.textContent = "";
}

async function loadServerState() {
  const data = await apiRequest("/api/series");
  if (Array.isArray(data.series)) {
    state.series = hydrateCovers(data.series);
  } else {
    await saveServerState();
  }
  state.customInfo = { ...state.customInfo, ...(data.customInfo || {}) };
  state.customTranslatedInfo = { ...state.customTranslatedInfo, ...(data.customTranslatedInfo || {}) };
  hideAuth();
  render();
}

function loadStoredMap(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function saveStoredMap(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  dbSet(key, value);
  saveServerState();
}

function openSerialDatabase() {
  if (!("indexedDB" in window)) return Promise.resolve(null);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.addEventListener("upgradeneeded", () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE);
      }
    });

    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
  });
}

function dbGet(key) {
  if (!state.db) return Promise.resolve(undefined);

  return new Promise((resolve, reject) => {
    const transaction = state.db.transaction(DB_STORE, "readonly");
    const request = transaction.objectStore(DB_STORE).get(key);
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
  });
}

function dbSet(key, value) {
  if (!state.db) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const transaction = state.db.transaction(DB_STORE, "readwrite");
    transaction.objectStore(DB_STORE).put(value, key);
    transaction.addEventListener("complete", () => resolve());
    transaction.addEventListener("error", () => reject(transaction.error));
  });
}

function mergeSeries(primary, secondary) {
  const merged = new Map();
  primary.forEach((item) => merged.set(item.id || item.title, item));
  secondary.forEach((item) => merged.set(item.id || item.title, item));
  return [...merged.values()];
}

async function initDatabase() {
  try {
    state.db = await openSerialDatabase();
    if (!state.db) {
      window.__serialDbStatus = { ready: false, reason: "indexedDB unavailable" };
      return;
    }

    const dbSeries = await dbGet(STORAGE_KEY);
    const hasLocalSeries = Boolean(localStorage.getItem(STORAGE_KEY));

    if (Array.isArray(dbSeries)) {
      state.series = hydrateCovers(hasLocalSeries ? mergeSeries(dbSeries, state.series) : dbSeries);
      saveSeries();
      render();
    } else {
      await dbSet(STORAGE_KEY, state.series);
    }

    const dbInfo = await dbGet(CUSTOM_INFO_KEY);
    if (dbInfo && typeof dbInfo === "object") {
      state.customInfo = { ...dbInfo, ...state.customInfo };
      saveStoredMap(CUSTOM_INFO_KEY, state.customInfo);
    } else {
      await dbSet(CUSTOM_INFO_KEY, state.customInfo);
    }

    const dbTranslated = await dbGet(CUSTOM_TRANSLATED_INFO_KEY);
    if (dbTranslated && typeof dbTranslated === "object") {
      state.customTranslatedInfo = { ...dbTranslated, ...state.customTranslatedInfo };
      saveStoredMap(CUSTOM_TRANSLATED_INFO_KEY, state.customTranslatedInfo);
    } else {
      await dbSet(CUSTOM_TRANSLATED_INFO_KEY, state.customTranslatedInfo);
    }

    window.__serialDbStatus = { ready: true, seriesCount: state.series.length };
  } catch {
    state.db = null;
    window.__serialDbStatus = { ready: false, reason: "open failed" };
  }
}

function defaultWatchStatus(category, comment = "") {
  if (category === "dropped") return "droppedStatus";
  if (category === "wishlist") return "wishlistStatus";
  if (category === "paused") return "watching";
  if (comment.toLowerCase().includes("жду продолж")) return "waitingSeason";
  return "finished";
}

function categoryForWatchStatus(status) {
  const statusCategories = {
    watching: "paused",
    finished: "watched",
    droppedStatus: "dropped",
    wishlistStatus: "wishlist",
    waitingSeason: "watched",
  };
  return statusCategories[status] || "watched";
}

function loadSeries() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialSeries;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? hydrateCovers(parsed) : initialSeries;
  } catch {
    return initialSeries;
  }
}

function hydrateCovers(series) {
  return series.map((item) => {
    const watchStatus = item.watchStatus || defaultWatchStatus(item.category, item.comment);
    return {
      ...item,
      category: categoryForWatchStatus(watchStatus),
      cover: item.cover || coverMap[item.title] || "",
      watchStatus,
    };
  });
}

function saveSeries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.series));
  dbSet(STORAGE_KEY, state.series);
  saveServerState();
}

async function loadShowInfo() {
  try {
    const [sourceResponse, translatedResponse] = await Promise.all([
      fetch("./assets/show-info.json"),
      fetch("./assets/show-info-ru.json"),
    ]);
    if (!sourceResponse.ok) throw new Error("Show info is unavailable");
    const sourceData = await sourceResponse.json();
    state.showInfo = sourceData.info || {};

    if (translatedResponse.ok) {
      const translatedData = await translatedResponse.json();
      state.translatedInfo = translatedData.info || {};
    }
  } catch {
    state.showInfo = {};
    state.translatedInfo = {};
  }
}

function categoryLabel(id) {
  return t(id);
}

function watchStatusLabel(id) {
  return t(id || "finished");
}

function ratingText(rating) {
  return Number.isFinite(rating) ? `${rating}/10` : "—";
}

function valueText(value) {
  return value || "—";
}

function statusText(status) {
  if (state.language === "en") return status || "";
  const statuses = {
    Ended: "Завершён",
    Running: "Идёт",
    "In Development": "В разработке",
    "To Be Determined": "Неизвестно",
  };
  return statuses[status] || status || "";
}

function languageText(language) {
  if (state.language === "en") return language || "";
  const languages = {
    English: "Английский",
    Korean: "Корейский",
    Spanish: "Испанский",
    Japanese: "Японский",
  };
  return languages[language] || language || "";
}

function genreText(genre) {
  return genreTranslations[state.language]?.[genre] || genre;
}

function detailInfo(title) {
  const info = state.showInfo[title] || state.customInfo[title] || {};
  const translated = state.language === "ru"
    ? state.translatedInfo[title] || state.customTranslatedInfo[title]
    : {};
  return {
    ...info,
    summary: translated?.summary || info.summary || "",
  };
}

function stripHtml(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleQuery(title) {
  const aliases = {
    Декстер: "Dexter",
  };
  return aliases[title.trim()] || title.trim();
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

async function findOnlineShow(title) {
  const query = titleQuery(title);
  const results = await fetchJson(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
  const normalized = query.toLowerCase();
  const exactMatches = results.filter((result) => result.show.name.toLowerCase() === normalized);
  return exactMatches.find((result) => result.show.premiered)?.show || exactMatches[0]?.show || results[0]?.show || null;
}

async function fetchOnlineShowDetails(id) {
  return fetchJson(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=episodes&embed[]=cast`);
}

function normalizeShowInfo(details) {
  const seasons = details._embedded?.seasons || [];
  const episodes = details._embedded?.episodes || [];
  const cast = details._embedded?.cast || [];
  const airedSeasonCount = new Set(episodes.map((episode) => episode.season).filter(Boolean)).size;

  return {
    name: details.name,
    summary: stripHtml(details.summary),
    seasons: airedSeasonCount || seasons.length,
    episodes: episodes.length,
    status: details.status || "",
    premiered: details.premiered || "",
    ended: details.ended || "",
    genres: details.genres || [],
    language: details.language || "",
    network: details.network?.name || details.webChannel?.name || "",
    cast: cast.slice(0, 10).map((entry) => ({
      actor: entry.person?.name || "",
      character: entry.character?.name || "",
    })).filter((entry) => entry.actor),
  };
}

async function translateSummary(summary) {
  if (!summary) return "";
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "en");
  url.searchParams.set("tl", "ru");
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", summary);

  const data = await fetchJson(url.toString());
  return data[0].map((part) => part[0]).join("").trim();
}

async function enrichSeriesItem(item) {
  if (item.cover && state.customInfo[item.title]) return item;

  try {
    const show = await findOnlineShow(item.title);
    if (!show?.id) return item;

    const details = await fetchOnlineShowDetails(show.id);
    const info = normalizeShowInfo(details);
    const cover = item.cover || details.image?.original || details.image?.medium || "";

    state.customInfo[item.title] = info;
    saveStoredMap(CUSTOM_INFO_KEY, state.customInfo);

    if (!state.translatedInfo[item.title] && !state.customTranslatedInfo[item.title] && info.summary) {
      try {
        state.customTranslatedInfo[item.title] = { summary: await translateSummary(info.summary) };
        saveStoredMap(CUSTOM_TRANSLATED_INFO_KEY, state.customTranslatedInfo);
      } catch {
        // Translation is best-effort; the original description is still useful.
      }
    }

    return { ...item, cover };
  } catch {
    return item;
  }
}

async function enrichMissingSeries() {
  const missing = state.series.filter((item) => !item.cover || (!state.showInfo[item.title] && !state.customInfo[item.title]));
  if (!missing.length) return;

  for (const item of missing) {
    const enriched = await enrichSeriesItem(item);
    if (enriched !== item) {
      state.series = state.series.map((series) => series.id === item.id ? enriched : series);
      saveSeries();
      render();
    }
  }
}

function initials(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function filteredSeries() {
  const needle = state.search.trim().toLowerCase();

  return state.series
    .filter((item) => state.activeCategory === "all" || item.category === state.activeCategory)
    .filter((item) => {
      if (!needle) return true;
      return `${item.title} ${item.comment}`.toLowerCase().includes(needle);
    })
    .sort((a, b) => {
      if (state.sort === "rating-desc") return (b.rating ?? -1) - (a.rating ?? -1);
      if (state.sort === "rating-asc") return (a.rating ?? 99) - (b.rating ?? 99);
      if (state.sort === "title-desc") return b.title.localeCompare(a.title, "ru");
      if (state.sort === "newest") return (b.createdAt ?? 0) - (a.createdAt ?? 0);
      return a.title.localeCompare(b.title, "ru");
    });
}

function renderNav() {
  els.categoryNav.innerHTML = categories
    .map((category) => {
      const count = category.id === "all"
        ? state.series.length
        : state.series.filter((item) => item.category === category.id).length;
      return `
        <button class="category-button ${state.activeCategory === category.id ? "active" : ""}" data-category="${category.id}" type="button">
          <span>${categoryLabel(category.id)}</span>
          <span>${count}</span>
        </button>
      `;
    })
    .join("");
}

function renderStats() {
  const watched = state.series.filter((item) => item.category === "watched" && Number.isFinite(item.rating));
  const average = watched.length
    ? (watched.reduce((sum, item) => sum + item.rating, 0) / watched.length).toFixed(1)
    : "—";
  const best = [...state.series]
    .filter((item) => Number.isFinite(item.rating))
    .sort((a, b) => b.rating - a.rating)[0];

  const stats = [
    [t("total"), state.series.length],
    [t("watchedStat"), state.series.filter((item) => item.category === "watched").length],
    [t("averageRating"), average],
    [t("best"), best ? best.title : "—"],
  ];

  els.statsGrid.innerHTML = stats
    .map(([label, value]) => `
      <article class="stat">
        <p>${label}</p>
        <strong>${value}</strong>
      </article>
    `)
    .join("");
}

function renderSeries() {
  const items = filteredSeries();
  els.totalCount.textContent = `${state.series.length} ${t("records")}`;
  els.currentCategoryLabel.textContent = categoryLabel(state.activeCategory);
  els.sectionTitle.textContent = state.search ? t("searchResults") : t("myList");
  els.visibleCount.textContent = `${items.length} ${t("records")}`;
  els.seriesGrid.classList.toggle("shelf-grid", state.viewMode === "shelf");

  if (!items.length) {
    els.seriesGrid.innerHTML = `<div class="empty-state">${t("empty")}</div>`;
    return;
  }

  els.seriesGrid.innerHTML = items
    .map((item) => `
      <article class="series-card" data-open="${item.id}" role="button" tabindex="0" aria-label="${t("details")}: ${escapeHtml(item.title)}">
        <div class="cover">
          ${item.cover ? `<img src="${escapeHtml(item.cover)}" alt="Обложка: ${escapeHtml(item.title)}" />` : `<div class="cover-initials">${escapeHtml(initials(item.title))}</div>`}
          <div class="rating-badge">${ratingText(item.rating)}</div>
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span class="category-pill">${watchStatusLabel(item.watchStatus)}</span>
            <div class="card-actions">
              ${canEditSeries() ? `<button type="button" data-edit="${item.id}" aria-label="Редактировать">✎</button>` : ""}
              ${canEditSeries() ? `<button type="button" data-delete="${item.id}" aria-label="Удалить">×</button>` : ""}
            </div>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          ${item.comment ? `<p>${escapeHtml(item.comment)}</p>` : ""}
        </div>
      </article>
    `)
    .join("");
}

function renderFormCategories() {
  els.categoryInput.innerHTML = categories
    .filter((category) => category.id !== "all")
    .map((category) => `<option value="${category.id}">${categoryLabel(category.id)}</option>`)
    .join("");
}

function renderWatchStatuses() {
  els.watchStatusInput.innerHTML = watchStatuses
    .map((status) => `<option value="${status.id}">${watchStatusLabel(status.id)}</option>`)
    .join("");
}

function render() {
  renderStaticText();
  renderFormCategories();
  renderWatchStatuses();
  renderNav();
  renderStats();
  renderSeries();
  renderSidebarState();
}

function renderSidebarState() {
  document.body.classList.toggle("sidebar-collapsed", state.sidebarCollapsed);
  els.sidebarToggle.setAttribute("aria-expanded", String(!state.sidebarCollapsed));
}

function renderStaticText() {
  const setLabel = (input, text) => {
    if (input?.parentElement?.firstChild) input.parentElement.firstChild.textContent = `${text}\n          `;
  };

  document.documentElement.lang = state.language;
  document.title = t("appTitle");
  document.querySelector(".brand h1").textContent = t("appTitle");
  els.searchInput.placeholder = t("searchPlaceholder");
  els.openFormButton.lastChild.textContent = ` ${t("add")}`;
  els.exportButton.lastChild.textContent = ` ${t("export")}`;
  const importTextNode = [...document.querySelector(".import-label").childNodes]
    .find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (importTextNode) importTextNode.textContent = `\n            ${t("import")}\n            `;
  els.resetButton.textContent = t("reset");
  els.clearCoverButton.textContent = t("clearCover");
  document.querySelector(".form-actions .primary-button").textContent = t("save");
  els.languageSelect.value = state.language;
  els.viewModeButton.textContent = state.viewMode === "shelf" ? t("cardView") : t("shelfView");
  els.openFormButton.hidden = !canAddSeries();
  els.resetButton.hidden = state.apiAvailable && state.currentUser?.role !== "admin";
  els.importInput.parentElement.hidden = state.apiAvailable && !canEditSeries();
  els.exportButton.hidden = state.apiAvailable && !state.currentUser;
  els.usersButton.hidden = !state.apiAvailable || state.currentUser?.role !== "admin";
  els.logoutButton.hidden = !state.apiAvailable || !state.currentUser;
  document.querySelector(".series-form .eyebrow").textContent = t("newEntry");
  setLabel(els.titleInput, t("title"));
  setLabel(els.categoryInput, t("category"));
  setLabel(els.watchStatusInput, t("watchStatus"));
  setLabel(els.ratingInput, t("rating"));
  setLabel(els.commentInput, t("comment"));
  setLabel(els.coverInput, t("cover"));

  const options = {
    "rating-desc": t("sortRatingDesc"),
    "rating-asc": t("sortRatingAsc"),
    "title-asc": t("sortTitleAsc"),
    "title-desc": t("sortTitleDesc"),
    newest: t("sortNewest"),
  };
  [...els.sortSelect.options].forEach((option) => {
    option.textContent = options[option.value] || option.textContent;
  });

}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openForm(item = null) {
  els.form.reset();
  els.editingId.value = item?.id || "";
  els.formTitle.textContent = item ? t("editSeries") : t("addSeries");
  const watchStatus = item?.watchStatus || defaultWatchStatus(
    item?.category || (state.activeCategory === "all" ? "watched" : state.activeCategory),
    item?.comment || "",
  );
  els.titleInput.value = item?.title || "";
  els.watchStatusInput.value = watchStatus;
  els.categoryInput.value = categoryForWatchStatus(watchStatus);
  els.ratingInput.value = Number.isFinite(item?.rating) ? item.rating : "";
  els.commentInput.value = item?.comment || "";
  state.coverDraft = item?.cover || "";
  updateCoverPreview();
  els.dialog.showModal();
  els.titleInput.focus();
}

function openDetails(item) {
  const info = detailInfo(item.title);
  const cover = item.cover || coverMap[item.title] || "";
  const cast = info.cast || [];
  const genres = info.genres || [];
  const years = [info.premiered?.slice(0, 4), info.ended?.slice(0, 4)].filter(Boolean).join(" - ");

  els.detailsCover.style.backgroundImage = cover ? `url("${cover}")` : "";
  els.detailsCategory.textContent = categoryLabel(item.category);
  els.detailsTitle.textContent = item.title;
  els.detailsOriginal.textContent = info.name && info.name !== item.title ? info.name : "";
  els.trailerButton.textContent = t("trailer");
  els.trailerButton.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${info.name || item.title} trailer`)}`;
  els.detailsSummary.textContent = info.summary || item.comment || t("noInfo");

  const stats = [
    [t("rating"), ratingText(item.rating)],
    [t("seasons"), valueText(info.seasons)],
    [t("episodes"), valueText(info.episodes)],
    [t("years"), valueText(years)],
    [t("status"), valueText(statusText(info.status))],
    [t("network"), valueText(info.network)],
    [t("language"), valueText(languageText(info.language))],
    [t("category"), categoryLabel(item.category)],
    [t("watchStatus"), watchStatusLabel(item.watchStatus)],
  ];

  els.detailsStats.innerHTML = stats
    .map(([label, value]) => `
      <div class="details-stat">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `)
    .join("");

  els.detailsGenresWrap.hidden = genres.length === 0;
  document.querySelector("#detailsGenresWrap h3").textContent = t("genres");
  document.querySelector(".details-section:last-child h3").textContent = t("cast");
  els.detailsGenres.innerHTML = genres.map((genre) => `<span>${escapeHtml(genreText(genre))}</span>`).join("");

  els.detailsCast.innerHTML = cast.length
    ? cast.map((entry) => `
        <li>
          <strong>${escapeHtml(entry.actor)}</strong>
          <span>${escapeHtml(entry.character || t("noRole"))}</span>
        </li>
      `).join("")
    : `<li><span>${t("noCast")}</span></li>`;

  els.detailsDialog.showModal();
}

function closeDetails() {
  els.detailsDialog.close();
}

function closeForm() {
  els.dialog.close();
  state.coverDraft = "";
}

function updateCoverPreview() {
  els.coverPreview.classList.toggle("has-cover", Boolean(state.coverDraft));
  els.coverPreview.style.backgroundImage = state.coverDraft ? `url("${state.coverDraft}")` : "";
}

async function handleSubmit(event) {
  event.preventDefault();
  if (els.editingId.value ? !canEditSeries() : !canAddSeries()) return;
  const title = els.titleInput.value.trim();
  if (!title) return;

  const ratingValue = els.ratingInput.value === "" ? null : Number(els.ratingInput.value);
  const watchStatus = els.watchStatusInput.value;
  const payload = await enrichSeriesItem({
    title,
    category: categoryForWatchStatus(watchStatus),
    watchStatus,
    rating: Number.isFinite(ratingValue) ? ratingValue : null,
    comment: els.commentInput.value.trim(),
    cover: state.coverDraft,
  });

  const existingId = els.editingId.value;
  if (existingId) {
    state.series = state.series.map((item) => item.id === existingId ? { ...item, ...payload } : item);
  } else {
    state.series = [{ id: crypto.randomUUID(), createdAt: Date.now(), ...payload }, ...state.series];
  }

  saveSeries();
  closeForm();
  render();
}

function readCover(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.coverDraft = reader.result;
    updateCoverPreview();
  });
  reader.readAsDataURL(file);
}

function exportData() {
  const blob = new Blob([JSON.stringify(state.series, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "serial-series-backup.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

function importData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!Array.isArray(parsed)) throw new Error("Invalid file");
      state.series = parsed;
      saveSeries();
      render();
    } catch {
      alert(t("importError"));
    } finally {
      els.importInput.value = "";
    }
  });
  reader.readAsText(file);
}

function setAuthMode(mode) {
  state.authMode = mode;
  els.loginTab.classList.toggle("active", mode === "login");
  els.registerTab.classList.toggle("active", mode === "register");
  els.authError.textContent = "";
}

async function submitAuth(event) {
  event.preventDefault();
  els.authError.textContent = "";
  try {
    const path = state.authMode === "login" ? "/api/login" : "/api/register";
    const result = await apiRequest(path, {
      method: "POST",
      body: JSON.stringify({
        login: els.authLogin.value,
        password: els.authPassword.value,
      }),
    });
    state.currentUser = result.user;
    els.authForm.reset();
    await loadServerState();
  } catch (error) {
    els.authError.textContent = error.message;
  }
}

async function renderUsers() {
  const data = await apiRequest("/api/users");
  els.usersList.innerHTML = data.users.map((user) => `
    <div class="user-row" data-user="${escapeHtml(user.id)}">
      <div>
        <strong>${escapeHtml(user.login)}</strong>
        <span>${escapeHtml(user.role)}</span>
      </div>
      <label>
        <input type="checkbox" data-permission="canAdd" ${user.canAdd ? "checked" : ""} ${user.role === "admin" ? "disabled" : ""} />
        Добавлять
      </label>
      <label>
        <input type="checkbox" data-permission="canEdit" ${user.canEdit ? "checked" : ""} ${user.role === "admin" ? "disabled" : ""} />
        Редактировать
      </label>
    </div>
  `).join("");
}

async function updateUserPermission(input) {
  const row = input.closest("[data-user]");
  if (!row) return;
  const canAdd = row.querySelector('[data-permission="canAdd"]').checked;
  const canEdit = row.querySelector('[data-permission="canEdit"]').checked;
  await apiRequest(`/api/users/${encodeURIComponent(row.dataset.user)}`, {
    method: "PATCH",
    body: JSON.stringify({ canAdd, canEdit }),
  });
}

els.categoryNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.activeCategory = button.dataset.category;
  render();
});

els.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderSeries();
});

els.sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderSeries();
});

els.viewModeButton.addEventListener("click", () => {
  state.viewMode = state.viewMode === "shelf" ? "cards" : "shelf";
  localStorage.setItem(VIEW_MODE_KEY, state.viewMode);
  render();
});

els.sidebarToggle.addEventListener("click", () => {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  renderSidebarState();
});

els.sidebarScrim.addEventListener("click", () => {
  state.sidebarCollapsed = true;
  renderSidebarState();
});

els.loginTab.addEventListener("click", () => setAuthMode("login"));
els.registerTab.addEventListener("click", () => setAuthMode("register"));
els.authForm.addEventListener("submit", submitAuth);

els.openFormButton.addEventListener("click", () => openForm());
els.closeFormButton.addEventListener("click", closeForm);
els.form.addEventListener("submit", handleSubmit);
els.watchStatusInput.addEventListener("change", () => {
  els.categoryInput.value = categoryForWatchStatus(els.watchStatusInput.value);
});
els.categoryInput.addEventListener("change", () => {
  els.watchStatusInput.value = defaultWatchStatus(els.categoryInput.value);
});
els.coverInput.addEventListener("change", (event) => readCover(event.target.files[0]));
els.clearCoverButton.addEventListener("click", () => {
  state.coverDraft = "";
  els.coverInput.value = "";
  updateCoverPreview();
});

els.seriesGrid.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit]");
  const deleteButton = event.target.closest("[data-delete]");
  const openCard = event.target.closest("[data-open]");

  if (editButton) {
    const item = state.series.find((series) => series.id === editButton.dataset.edit);
    if (item) openForm(item);
  }

  if (deleteButton) {
    const item = state.series.find((series) => series.id === deleteButton.dataset.delete);
    if (!item) return;
    if (confirm(`${t("deleteConfirm")} «${item.title}»?`)) {
      state.series = state.series.filter((series) => series.id !== item.id);
      saveSeries();
      render();
    }
  }

  if (openCard && !editButton && !deleteButton) {
    const item = state.series.find((series) => series.id === openCard.dataset.open);
    if (item) openDetails(item);
  }
});

els.seriesGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const openCard = event.target.closest("[data-open]");
  if (!openCard) return;
  event.preventDefault();
  const item = state.series.find((series) => series.id === openCard.dataset.open);
  if (item) openDetails(item);
});

els.exportButton.addEventListener("click", exportData);
els.importInput.addEventListener("change", (event) => importData(event.target.files[0]));
els.usersButton.addEventListener("click", async () => {
  await renderUsers();
  els.usersDialog.showModal();
});
els.logoutButton.addEventListener("click", async () => {
  await apiRequest("/api/logout", { method: "POST", body: "{}" });
  state.currentUser = null;
  showAuth();
  render();
});
els.closeUsersButton.addEventListener("click", () => els.usersDialog.close());
els.usersDialog.addEventListener("click", (event) => {
  if (event.target === els.usersDialog) els.usersDialog.close();
});
els.usersList.addEventListener("change", (event) => {
  const input = event.target.closest("[data-permission]");
  if (input) updateUserPermission(input);
});
els.resetButton.addEventListener("click", () => {
  if (!confirm(t("resetConfirm"))) return;
  state.series = initialSeries;
  saveSeries();
  render();
});

els.languageSelect.addEventListener("change", (event) => {
  state.language = event.target.value;
  localStorage.setItem(LANGUAGE_KEY, state.language);
  render();
});

els.dialog.addEventListener("click", (event) => {
  if (event.target === els.dialog) closeForm();
});

els.closeDetailsButton.addEventListener("click", closeDetails);
els.detailsDialog.addEventListener("click", (event) => {
  if (event.target === els.detailsDialog) closeDetails();
});

render();
Promise.all([initDatabase(), loadShowInfo(), initAuth()]).then(() => {
  render();
  if (state.currentUser || !state.apiAvailable) enrichMissingSeries();
});
