#!/bin/bash
cd /pfad/zu/deiner/app
git fetch origin main

# Prüfen, ob der lokale Stand hinter dem Remote liegt
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")

if [ $LOCAL != $REMOTE ]; then
    echo "Änderungen gefunden. Aktualisiere..."
    git pull
    # Hier den Befehl zum Neustart einfügen, z.B.:
    # pm2 restart my-app OR systemctl restart my-app
fi
