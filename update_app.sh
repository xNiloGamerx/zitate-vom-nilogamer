#!/bin/bash
cd /home/kiosk-zvm/zitate-vom-nilogamer
git restore .
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
    npm audit fix
    pm2 reload zvm
else
    echo "changes_not_found"
fi
