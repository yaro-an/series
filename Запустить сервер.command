#!/bin/zsh
cd "$(dirname "$0")"
open "http://localhost:4173"
node server.js
