
# Dokumentation und Anleitung: MindStash App



## Projektvision
Die Anwendung "MindStash" ist ein REST-basiertes Backend, das Benutzer dabei unterstützt, Gedanken und Ideen zu organisieren. Hauptanwendungsfälle:
1. Registrierung und Authentifizierung von Benutzern.
2. Erstellung, Verwaltung und Abruf von Kategorien und Notizen.
3. Hinzufügen und Abrufen von Medien zu Notizen.
4. Sicherung der Daten durch Benutzer-Authentifizierung und JWT-basierte Sicherheit.

Es befinden sich zusätzlich Dokumentation in den jeweiligen Anwendungen 1. "Frontend 2. "Backend"



## Plattform
Die Anwendung basiert auf:
- **Programmiersprache**: Java 17
- **Framework**: Spring Boot 3.3.4
- **Build-Tool**: Maven
- **Datenbank**: H2 (in-memory)
- **Frontend**: React mit React-Router
- **Styling**: CSS
- **JWT**: JSON Web Tokens zur Authentifizierung
- **Libraries**:
  - `spring-boot-starter-data-jpa`
  - `spring-boot-starter-security`
  - `io.jsonwebtoken` (Version 0.11.5 für JWT-Handling)
  - `spring-boot-starter-validation`
  - Axios für API-Kommunikation



## Architektur
- **Architekturtyp**:  Modular Monolithisch
- **Schichtenmodell**: 3-Schicht-Architektur
  1. **Controller-Schicht**: API-Endpunkte (z.B. `UserController`, `NoteController`)
  2. **Service-Schicht**: Geschäftsdaten-Logik
  3. **Datenzugriffsschicht**: Zugriff auf die H2-Datenbank mit JPA
- **Sicherheitskonzept**:
  - JWT für Authentifizierung und Autorisierung
  - CORS-Konfiguration erlaubt spezifische Frontend-Zugriffe


## Kurzanleitung zur Navigation und Nutzung

### Anwendung starten
1. Stelle sicher, dass Java 17, Maven und Node.js installiert sind.
2. Klone das Repository und navigiere zum Projektordner.
3. STARTE BEIDES GLEICHZEITIG!:
 ```bash
   ./start.bat ODER ./start.sh 
   ```
   -Im obersten Ordner aufhalten: ~MindStash-Main und falls die Skripte nicht funnktionieren einfach die Anwendungen einzelnd starten!
4. Starte das Backend, siehe Schritt 5. um die folgenden Schritte zu überspringen:
   ```bash
   mvn spring-boot:run
   ```
5. Starte das Frontend:
   ```bash
   npm run dev
   ```

   

### Verfügbare Endpunkte
- **Benutzer:**
  - Registrierung: `POST /api/users/register`
    ```json
    {
      "email": "test@example.com",
      "password": "pass1234",
      "firstName": "Max",
      "lastName": "Mustermann"
    }
    ```
  - Login: `POST /api/users/login`
    ```json
    {
      "email": "test@example.com",
      "password": "pass1234"
    }
    ```

- **Kategorien:**
  - Kategorie erstellen: `POST /api/categories/{userId}`
    ```json
    {
      "name": "Arbeit"
    }
    ```
  - Kategorien abrufen: `GET /api/categories/{userId}`

- **Notizen:**
  - Notiz hinzufügen: `POST /api/notes/addNote`
    ```json
    {
      "userId": 1,
      "categoryId": 2,
      "title": "Projektstart",
      "content": "Planung und Vorbereitung."
    }
    ```

- **Medien:**
  - Datei hochladen: `POST /api/media/upload/{noteId}` (Multipart-Request)



## Anleitung zur Navigation

### **1. Startseite**
- Beim Start der App (URL: `/`), begrüßt die **Willkommen-Seite** den Benutzer.
- Über den Button „Funktionen“ kann man die verfügbaren Features erkunden.

### **2. Benutzer-Authentifizierung**
1. **Registrieren:**
   - Navigiere zur Registrierungsseite (URL: `/register`).
   - Fülle die Felder für E-Mail, Passwort, Vor- und Nachname aus und drücke auf „Registrieren“.
   - Nach erfolgreicher Registrierung wird eine Erfolgsmeldung angezeigt.

2. **Login:**
   - Gehe zur Login-Seite (URL: `/login`).
   - Gib E-Mail und Passwort ein und klicke auf „Login“.
   - Nach erfolgreichem Login wirst du zum Dashboard weitergeleitet.

### **3. Dashboard**
Nach der Anmeldung ist das **Haupt-Dashboard** (URL: `/mainDashBoard`) der zentrale Ausgangspunkt:
- **Kategorien anzeigen**: Alle erstellten Kategorien werden aufgelistet.
- **Kategorie erstellen**:
  1. Gib den Namen einer neuen Kategorie ein.
  2. Klicke auf „Erstellen“.
  3. Die neue Kategorie erscheint in der Liste.
- **Kategorie löschen**:
  - Klicke auf „Löschen“ neben einer Kategorie, um sie zu entfernen.

### **4. Notizen einer Kategorie**
- Klicke auf eine Kategorie im Dashboard, um deren Notizen anzuzeigen (URL: `/categoryNotes/:categoryId`).
- **Neue Notiz hinzufügen**:
  1. Gib den Inhalt der Notiz in das Textfeld ein.
  2. Klicke auf „Notiz Hinzufügen“.
- **Medien hochladen**:
  - Wähle eine Datei aus und lade sie hoch, um sie mit einer Notiz zu verknüpfen.
- **Notizen filtern**:
  - Verwende Schlagworte oder Datumsfilter, um Notizen gezielt zu durchsuchen.

### **5. Kopf- und Fußzeile**
- **Header:**
  - Verlinkt auf die Startseite und das Dashboard.
  - Zeigt abhängig vom Login-Status „Einloggen“ oder „Ausloggen“ an.
- **Footer:**
  - Enthält Links zu Seiten wie „Über uns“, „Kontakt“ und rechtliche Hinweise.



## Testdaten
Verwende folgende Dummy-Daten, um die Anwendung zu testen:
- **Benutzer:**
  - Email: `user@beispiel.com`
  - Passwort: `password123`
  Komplett frei nutzbar, alle User werden in der Datenbank gespeichert. Es gibt keine "fertigen" Test User. 

### Datenbank
Die Anwendung verwendet eine H2-In-Memory-Datenbank. Der Datenbank-Console kann unter `http://localhost:8080/h2-console` erreicht werden.
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Benutzername**: `sa`
- **Passwort**: (kein Passwort erforderlich)



## Technische Hinweise
- **Starten der App**: 
  ```
  npm run dev
  ```
- **Haupttechnologien**:
  - **Frontend**: React, React-Router.
  - **API**: Axios zum Kommunizieren mit dem Backend.
  - **Styling**: CSS-Dateien in den jeweiligen Komponenten. Müsste zusammen einheitlich verpackt werden und Mbile First, da Backend die Hauptkomponente ist wurde es vernachlässigt.

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



## Technische Funktionen
- Authentifizierung und Autorisierung basieren auf JWT.
- API-Aufrufe sind modular in Services definiert.
- Lokales Testen durch Konfiguration der `baseURL` in `ApiClient.js`.
