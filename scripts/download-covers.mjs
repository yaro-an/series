import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const coversDir = path.resolve("assets/covers");

const shows = [
  ["Игра престолов", "Game of Thrones"],
  ["Теория большого взрыва", "The Big Bang Theory"],
  ["Во все тяжкие", "Breaking Bad"],
  ["Сверхъестественное", "Supernatural"],
  ["Офис", "The Office US"],
  ["Извне", "From"],
  ["Чёрное зеркало", "Black Mirror"],
  ["Тед Лассо", "Ted Lasso"],
  ["Острые козырьки", "Peaky Blinders"],
  ["Менталист", "The Mentalist"],
  ["Друзья", "Friends"],
  ["Детство Шелдона", "Young Sheldon"],
  ["Киностудия", "The Studio"],
  ["Ход королевы", "The Queen's Gambit"],
  ["Дом Дракона", "House of the Dragon"],
  ["Хороший доктор", "The Good Doctor"],
  ["Как я встретил вашу маму", "How I Met Your Mother"],
  ["Лучше звоните Солу", "Better Call Saul"],
  ["Сопрано", "The Sopranos"],
  ["Очень странные дела", "Stranger Things"],
  ["Ходячие мертвецы", "The Walking Dead"],
  ["Сёгун", "Shogun"],
  ["Охотник за разумом", "Mindhunter"],
  ["Одни из нас", "The Last of Us"],
  ["Киллербот", "Murderbot"],
  ["Конец е****го мира", "The End of the F***ing World"],
  ["Чернобыль", "Chernobyl"],
  ["Алиса в Пограничье", "Alice in Borderland"],
  ["Шерлок", "Sherlock"],
  ["Гангстерленд", "MobLand"],
  ["Бумажный дом", "La Casa de Papel"],
  ["Фоллаут", "Fallout"],
  ["Пингвин", "The Penguin"],
  ["Укрытие", "Silo"],
  ["Половое воспитание", "Sex Education"],
  ["Игра в кальмара", "Squid Game"],
  ["Первозданная Америка", "American Primeval"],
  ["Озарк", "Ozark"],
  ["Американская семейка", "Modern Family"],
  ["Остаться в живых", "Lost"],
  ["Форс-мажоры", "Suits"],
  ["Настоящий детектив", "True Detective"],
  ["Викинги", "Vikings"],
  ["Бесстыжие", "Shameless"],
  ["Уэнздей", "Wednesday"],
  ["Два с половиной человека", "Two and a Half Men"],
  ["Карточный домик", "House of Cards"],
  ["Пацаны", "The Boys"],
  ["Йеллоустоун", "Yellowstone"],
  ["Разделение", "Severance"],
  ["Сотня", "The 100"],
  ["Острые предметы", "Sharp Objects"],
  ["Обмани меня", "Lie to Me"],
  ["Сцены из супружеской жизни", "Scenes from a Marriage"],
  ["Переходный возраст", "Adolescence"],
  ["Когда они нас увидят", "When They See Us"],
  ["Наследники", "Succession"],
  ["Терапия", "Shrinking"],
  ["Лэндмен", "Landman"],
  ["Мышь", "Mouse"],
  ["Миллиарды", "Billions"],
  ["Предложение", "The Offer"],
  ["Мейр из Исттауна", "Mare of Easttown"],
  ["Побег", "Prison Break"],
];

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

async function findShow(query) {
  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
  const response = await fetch(url, { headers: { "User-Agent": "serial-local-app" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const results = await response.json();
  const normalized = query.toLowerCase();
  return results.find((result) => result.show.name.toLowerCase() === normalized)?.show || results[0]?.show;
}

async function download(url, filePath) {
  const response = await fetch(url, { headers: { "User-Agent": "serial-local-app" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(filePath, buffer);
}

await mkdir(coversDir, { recursive: true });

const manifest = [];
const misses = [];

for (const [title, query] of shows) {
  try {
    const show = await findShow(query);
    const imageUrl = show?.image?.original || show?.image?.medium;

    if (!show || !imageUrl) {
      misses.push({ title, query, reason: "no image" });
      continue;
    }

    const extension = path.extname(new URL(imageUrl).pathname) || ".jpg";
    const fileName = `${slugify(title)}${extension}`;
    const relativePath = `assets/covers/${fileName}`;

    await download(imageUrl, path.join(coversDir, fileName));
    manifest.push({ title, query, matched: show.name, cover: relativePath });
    console.log(`${title} -> ${show.name}`);
  } catch (error) {
    misses.push({ title, query, reason: error.message });
  }
}

await writeFile(
  path.resolve("assets/covers/manifest.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), covers: manifest, misses }, null, 2)}\n`,
);

console.log(`Downloaded: ${manifest.length}`);
console.log(`Missing: ${misses.length}`);
if (misses.length) {
  console.log(JSON.stringify(misses, null, 2));
}
