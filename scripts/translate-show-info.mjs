import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const inputPath = path.resolve("assets/show-info.json");
const outputPath = path.resolve("assets/show-info-ru.json");
const REQUEST_DELAY_MS = 450;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateText(text) {
  if (!text) return "";
  await sleep(REQUEST_DELAY_MS);

  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "en");
  url.searchParams.set("tl", "ru");
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);

  const response = await fetch(url, { headers: { "User-Agent": "serial-local-app" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const data = await response.json();
  return data[0].map((part) => part[0]).join("").trim();
}

let existing = { info: {} };
try {
  existing = JSON.parse(await readFile(outputPath, "utf8"));
} catch {
  existing = { info: {} };
}

const source = JSON.parse(await readFile(inputPath, "utf8"));
const translated = { ...existing.info };
const misses = [];

for (const [title, info] of Object.entries(source.info)) {
  if (translated[title]?.summary) {
    console.log(`${title} -> already translated`);
    continue;
  }

  try {
    translated[title] = {
      summary: await translateText(info.summary),
    };
    console.log(`${title} -> translated`);
  } catch (error) {
    misses.push({ title, reason: error.message });
    console.log(`${title} -> ${error.message}`);
  }
}

await writeFile(
  outputPath,
  `${JSON.stringify({ generatedAt: new Date().toISOString(), info: translated, misses }, null, 2)}\n`,
);

console.log(`Translated: ${Object.keys(translated).length}`);
console.log(`Missing: ${misses.length}`);
