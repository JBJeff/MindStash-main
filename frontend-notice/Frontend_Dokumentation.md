### Dokumentation und Anleitung: MindStash App

---

#### **Überblick**
MindStash ist eine Anwendung, die Benutzer dabei unterstützt, Gedanken und Ideen zu organisieren. Sie ermöglicht die Erstellung von Kategorien, Hinzufügen von Notizen sowie das Hochladen von Medien zu diesen Notizen(muss erweiter werden). Mit Benutzer-Authentifizierung wird die Sicherheit der Daten gewährleistet.

---

### **Anleitung zur Navigation und Nutzung**

#### **1. Startseite**
- Beim Start der App (URL: `/`), begrüßt die **Willkommen-Seite** den Benutzer.
- Über den Button „Funktionen“ kann man die verfügbaren Features erkunden.

#### **2. Benutzer-Authentifizierung**
1. **Registrieren:**
   - Navigiere zur Registrierungsseite (URL: `/register`).
   - Fülle die Felder für E-Mail, Passwort, Vor- und Nachname aus und drücke auf „Registrieren“.
   - Nach erfolgreicher Registrierung wird eine Erfolgsmeldung angezeigt.

2. **Login:**
   - Gehe zur Login-Seite (URL: `/login`).
   - Gib E-Mail und Passwort ein und klicke auf „Login“.
   - Nach erfolgreichem Login wirst du zum Dashboard weitergeleitet.

#### **3. Dashboard**
Nach der Anmeldung ist das **Haupt-Dashboard** (URL: `/mainDashBoard`) der zentrale Ausgangspunkt:
- **Kategorien anzeigen**: Alle erstellten Kategorien werden aufgelistet.
- **Kategorie erstellen**:
  1. Gib den Namen einer neuen Kategorie ein.
  2. Klicke auf „Erstellen“.
  3. Die neue Kategorie erscheint in der Liste.
- **Kategorie löschen**:
  - Klicke auf „Löschen“ neben einer Kategorie, um sie zu entfernen.

#### **4. Notizen einer Kategorie**
- Klicke auf eine Kategorie im Dashboard, um deren Notizen anzuzeigen (URL: `/categoryNotes/:categoryId`).
- **Neue Notiz hinzufügen**:
  1. Gib den Inhalt der Notiz in das Textfeld ein.
  2. Klicke auf „Notiz Hinzufügen“.
- **Medien hochladen**:
  - Wähle eine Datei aus und lade sie hoch, um sie mit einer Notiz zu verknüpfen.
- **Notizen filtern**:
  - Verwende Schlagworte oder Datumsfilter, um Notizen gezielt zu durchsuchen.

#### **5. Kopf- und Fußzeile**
- **Header:**
  - Verlinkt auf die Startseite und das Dashboard.
  - Zeigt abhängig vom Login-Status „Einloggen“ oder „Ausloggen“ an.
- **Footer:**
  - Enthält Links zu Seiten wie „Über uns“, „Kontakt“ und rechtliche Hinweise.

---

### **Technische Hinweise**

- **Starten der App**: 
  ```
  npm run dev
  ```
- **Haupttechnologien**:
  - **Frontend**: React, React-Router.
  - **API**: Axios zum Kommunizieren mit dem Backend.
  - **Styling**: CSS-Dateien in den jeweiligen Komponenten.

- **Backend-Endpunkte**:
  - Authentifizierung: `/authenticate`
  - Benutzerregistrierung: `/api/users/register`
  - Kategorien:
    - Abrufen: `/api/categories/:userId`
    - Erstellen: `/api/categories/:userId`
    - Löschen: `/api/categories/:categoryId`
  - Notizen:
    - Hinzufügen: `/api/notes/addNote`
  - Medien:
    - Hochladen: `/api/media/upload/:noteId`

---

### **Technische Funktionen **
- Authentifizierung und Autorisierung basieren auf JWT.
- API-Aufrufe sind modular in Services definiert.

