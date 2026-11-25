#!/bin/sh
# usage: shoot.sh <path> <name> <WxH>
C="/c/Program Files/Google/Chrome/Application/chrome.exe"
OUT="C:/Users/Thinkbook/Desktop/cybersecurity-website/.impeccable/review/shots/$2.png"
"$C" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=8000 --run-all-compositor-stages-before-draw $EXTRA --window-size="$3" --screenshot="$OUT" "http://localhost:4321$1" >/dev/null 2>&1
echo "$OUT"
