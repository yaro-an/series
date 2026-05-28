const crypto = require("crypto");
const fs = require("fs/promises");
const http = require("http");
const path = require("path");

const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, "data");
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, "app-db.json");
const SEED_DB_PATH = path.join(ROOT, "data", "app-db.json");
const PUBLIC_FILES = new Set([".html", ".css", ".js", ".json", ".jpg", ".png", ".txt", ".toml"]);
const sessions = new Map();

function send(res, status, body, headers = {}) {
  const payload = typeof body === "string" ? body : JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": typeof body === "string" ? "text/plain; charset=utf-8" : "application/json; charset=utf-8",
    ...headers,
  });
  res.end(payload);
}

function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 210000, 32, "sha256").toString("hex");
}

function publicUser(user) {
  return {
    id: user.id,
    login: user.login,
    role: user.role,
    canAdd: Boolean(user.canAdd || user.role === "admin"),
    canEdit: Boolean(user.canEdit || user.role === "admin"),
    createdAt: user.createdAt,
  };
}

async function readDb() {
  await ensureDb();
  const raw = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(raw);
}

async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    const seed = await fs.readFile(SEED_DB_PATH, "utf8");
    await fs.writeFile(DB_PATH, seed);
  }
}

async function writeDb(db) {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, `${JSON.stringify(db, null, 2)}\n`);
}

function sessionUser(req, db) {
  const cookie = req.headers.cookie || "";
  const sid = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith("sid="))?.slice(4);
  const session = sid ? sessions.get(sid) : null;
  if (!session) return null;
  return db.users.find((user) => user.id === session.userId) || null;
}

async function readJson(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
  return body ? JSON.parse(body) : {};
}

function requireUser(req, res, db) {
  const user = sessionUser(req, db);
  if (!user) {
    send(res, 401, { error: "Unauthorized" });
    return null;
  }
  return user;
}

function requireAdmin(req, res, db) {
  const user = requireUser(req, res, db);
  if (!user) return null;
  if (user.role !== "admin") {
    send(res, 403, { error: "Forbidden" });
    return null;
  }
  return user;
}

async function handleApi(req, res, pathname) {
  if (req.method === "GET" && pathname === "/api/health") {
    send(res, 200, { ok: true });
    return;
  }

  const db = await readDb();

  if (req.method === "GET" && pathname === "/api/session") {
    const user = sessionUser(req, db);
    send(res, 200, { user: user ? publicUser(user) : null });
    return;
  }

  if (req.method === "POST" && pathname === "/api/login") {
    const { login, password } = await readJson(req);
    const user = db.users.find((entry) => entry.login === String(login || "").trim());
    if (!user || !safeEqual(hashPassword(String(password || ""), user.salt), user.passwordHash)) {
      send(res, 401, { error: "Invalid login or password" });
      return;
    }

    const sid = crypto.randomBytes(24).toString("hex");
    sessions.set(sid, { userId: user.id, createdAt: Date.now() });
    send(res, 200, { user: publicUser(user) }, {
      "Set-Cookie": `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000`,
    });
    return;
  }

  if (req.method === "POST" && pathname === "/api/logout") {
    const cookie = req.headers.cookie || "";
    const sid = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith("sid="))?.slice(4);
    if (sid) sessions.delete(sid);
    send(res, 200, { ok: true }, { "Set-Cookie": "sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0" });
    return;
  }

  if (req.method === "POST" && pathname === "/api/register") {
    const { login, password } = await readJson(req);
    const cleanLogin = String(login || "").trim();
    const cleanPassword = String(password || "");
    if (cleanLogin.length < 3 || cleanPassword.length < 6) {
      send(res, 400, { error: "Login or password is too short" });
      return;
    }
    if (db.users.some((user) => user.login === cleanLogin)) {
      send(res, 409, { error: "User already exists" });
      return;
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const user = {
      id: crypto.randomUUID(),
      login: cleanLogin,
      role: "viewer",
      canAdd: false,
      canEdit: false,
      salt,
      passwordHash: hashPassword(cleanPassword, salt),
      createdAt: Date.now(),
    };
    db.users.push(user);
    await writeDb(db);

    const sid = crypto.randomBytes(24).toString("hex");
    sessions.set(sid, { userId: user.id, createdAt: Date.now() });
    send(res, 201, { user: publicUser(user) }, {
      "Set-Cookie": `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000`,
    });
    return;
  }

  if (req.method === "GET" && pathname === "/api/users") {
    if (!requireAdmin(req, res, db)) return;
    send(res, 200, { users: db.users.map(publicUser) });
    return;
  }

  if (req.method === "PATCH" && pathname.startsWith("/api/users/")) {
    if (!requireAdmin(req, res, db)) return;
    const id = decodeURIComponent(pathname.split("/").pop());
    const target = db.users.find((user) => user.id === id);
    if (!target || target.role === "admin") {
      send(res, 404, { error: "User not found" });
      return;
    }
    const body = await readJson(req);
    target.canAdd = Boolean(body.canAdd);
    target.canEdit = Boolean(body.canEdit);
    await writeDb(db);
    send(res, 200, { user: publicUser(target) });
    return;
  }

  if (req.method === "GET" && pathname === "/api/series") {
    if (!requireUser(req, res, db)) return;
    send(res, 200, {
      series: db.series,
      customInfo: db.customInfo || {},
      customTranslatedInfo: db.customTranslatedInfo || {},
    });
    return;
  }

  if (req.method === "PUT" && pathname === "/api/series") {
    const user = requireUser(req, res, db);
    if (!user) return;
    if (user.role !== "admin" && !user.canAdd && !user.canEdit) {
      send(res, 403, { error: "No edit rights" });
      return;
    }
    const body = await readJson(req);
    db.series = Array.isArray(body.series) ? body.series : db.series;
    db.customInfo = body.customInfo && typeof body.customInfo === "object" ? body.customInfo : db.customInfo || {};
    db.customTranslatedInfo = body.customTranslatedInfo && typeof body.customTranslatedInfo === "object"
      ? body.customTranslatedInfo
      : db.customTranslatedInfo || {};
    await writeDb(db);
    send(res, 200, { ok: true });
    return;
  }

  send(res, 404, { error: "Not found" });
}

async function serveStatic(req, res, pathname) {
  const filePath = path.normalize(path.join(ROOT, pathname === "/" ? "index.html" : pathname));
  if (!filePath.startsWith(ROOT)) {
    send(res, 403, "Forbidden");
    return;
  }

  const ext = path.extname(filePath);
  if (!PUBLIC_FILES.has(ext)) {
    send(res, 404, "Not found");
    return;
  }

  try {
    const body = await fs.readFile(filePath);
    const types = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".jpg": "image/jpeg",
      ".png": "image/png",
      ".txt": "text/plain; charset=utf-8",
      ".toml": "text/plain; charset=utf-8",
    };
    res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
    res.end(body);
  } catch {
    send(res, 404, "Not found");
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url.pathname);
      return;
    }
    await serveStatic(req, res, decodeURIComponent(url.pathname));
  } catch (error) {
    send(res, 500, { error: "Server error" });
  }
});

server.listen(PORT, () => {
  console.log(`Serial app server: http://localhost:${PORT}`);
});
