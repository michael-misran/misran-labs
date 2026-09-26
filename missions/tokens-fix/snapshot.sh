#!/bin/sh
# Relevé des valeurs calculées des tokens via Chrome headless (le preview « dev »
# n'est pas disponible en session autonome). Usage : ./snapshot.sh sortie.json
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
TMP="$(mktemp -d)"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --allow-file-access-from-files --virtual-time-budget=3000 --user-data-dir="$TMP/profil" \
  --dump-dom "file://$DIR/token-snapshot.html" > "$TMP/dom.html" 2>/dev/null &
PID=$!
# Chrome ne rend pas toujours la main après --dump-dom : on attend le JSON puis on coupe
for i in $(seq 1 30); do
  grep -q '</pre>' "$TMP/dom.html" 2>/dev/null && break
  sleep 1
done
kill $PID 2>/dev/null || true
wait $PID 2>/dev/null || true
python3 - "$TMP/dom.html" "$1" <<'PY'
import re, html, json, sys
d = open(sys.argv[1]).read()
j = json.loads(html.unescape(re.search(r'<pre id="out">(.*?)</pre>', d, re.S).group(1)))
json.dump(j, open(sys.argv[2], 'w'), indent=2, ensure_ascii=False)
print(len(j['root']), 'tokens relevés')
PY
rm -rf "$TMP" 2>/dev/null || true
