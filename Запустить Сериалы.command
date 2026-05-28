#!/bin/zsh
cd "$(dirname "$0")"
PORT=4173
URL="http://localhost:${PORT}/index.html"

open "$URL"

if nc -z localhost "$PORT" >/dev/null 2>&1; then
  echo "Сериалы уже открыты: $URL"
else
  python3 -m http.server "$PORT"
fi
