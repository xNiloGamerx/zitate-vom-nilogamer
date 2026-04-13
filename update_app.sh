#!/bin/bash
cd /home/kiosk-zvm/zitate-vom-nilogamer
git fetch origin main 2>/dev/null

# Prüfen, ob der lokale Stand hinter dem Remote liegt
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")

if [ $LOCAL != $REMOTE ]; then
    echo "changes_found"
    git pull 2>/dev/null
    # Hier den Befehl zum Neustart einfügen, z.B.:
    npm install
    pm2 stop zvm
    . ./start_pm2.sh
else
    echo "changes_not_found"
fi
