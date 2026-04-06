#!/bin/bash
cd /home/kiosk-zvm/zitate-vom-nilogamer
git fetch origin main >/dev/null

# Prüfen, ob der lokale Stand hinter dem Remote liegt
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")

if [ $LOCAL != $REMOTE ]; then
    echo "Änderungen gefunden. Aktualisiere..."
    git pull >/dev/null
    # Hier den Befehl zum Neustart einfügen, z.B.:
    npm install
    pm2 reload zvm
fi
