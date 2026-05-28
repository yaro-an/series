import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const manifestPath = path.resolve("assets/covers/manifest.json");
const outputPath = path.resolve("assets/show-info.json");
const REQUEST_DELAY_MS = 800;
const refresh = process.argv.includes("--refresh");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripHtml(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchJson(url, attempt = 1) {
  await sleep(REQUEST_DELAY_MS);
  const response = await fetch(url, { headers: { "User-Agent": "serial-local-app" } });
  if (response.status === 429 && attempt <= 4) {
    await sleep(5000 * attempt);
    return fetchJson(url, attempt + 1);
  }
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

async function findShow(query) {
  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
  const results = await fetchJson(url);
  const normalized = query.toLowerCase();
  const exactMatches = results.filter((result) => result.show.name.toLowerCase() === normalized);
  return exactMatches.find((result) => result.show.premiered)?.show || exactMatches[0]?.show || results[0]?.show;
}

async function fetchShowDetails(id) {
  const url = `https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=episodes&embed[]=cast`;
  return fetchJson(url);
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
let existing = { info: {} };
try {
  existing = JSON.parse(await readFile(outputPath, "utf8"));
} catch {
  existing = { info: {} };
}

const info = { ...existing.info };
const misses = [];

for (const item of manifest.covers) {
  if (!refresh && info[item.title]) {
    console.log(`${item.title} -> already saved`);
    continue;
  }

  try {
    const show = await findShow(item.query);
    if (!show?.id) {
      misses.push({ title: item.title, query: item.query, reason: "not found" });
      continue;
    }

    const details = await fetchShowDetails(show.id);
    const seasons = details._embedded?.seasons || [];
    const episodes = details._embedded?.episodes || [];
    const cast = details._embedded?.cast || [];
    const airedSeasonCount = new Set(episodes.map((episode) => episode.season).filter(Boolean)).size;

    info[item.title] = {
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

    console.log(`${item.title} -> ${details.name}: ${seasons.length} seasons, ${episodes.length} episodes`);
  } catch (error) {
    misses.push({ title: item.title, query: item.query, reason: error.message });
  }
}

await writeFile(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), info, misses }, null, 2)}\n`);

console.log(`Saved: ${Object.keys(info).length}`);
console.log(`Missing: ${misses.length}`);
if (misses.length) {
  console.log(JSON.stringify(misses, null, 2));
}
