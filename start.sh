#!/bin/bash

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Startet das Backend
echo "Starte das Backend..."
cd "$BASE_DIR/RestApi" || { echo "Backend-Verzeichnis nicht gefunden!"; exit 1; }
gnome-terminal -- bash -c "mvn spring-boot:run; exec bash"

# Startet das Frontend
echo "Startet das Frontend..."
cd "$BASE_DIR/frontend-notice" || { echo "Frontend-Verzeichnis nicht gefunden!"; exit 1; }
gnome-terminal -- bash -c "npm run dev; exec bash"

echo "Backend und Frontend wurden gestartet!"

