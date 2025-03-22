
# MindStash Backend Dokumentation

Spring Boot REST API mit JWT-Security, Notizverwaltung, Medienupload & Benutzer-Authentifizierung



## 1. Architekturüberblick

Das Backend ist als RESTful Webservice aufgebaut und basiert auf Spring Boot. Es verwendet:
- **Spring Security** mit JWT für Authentifizierung
- **JPA/Hibernate** für ORM (Datenbankzugriffe)
- **H2-Datenbank** (Entwicklungsmodus)
- **DTOs** zur Entkopplung von Datenbank und API
- **Media** für Medien-Upload
- **Modulares Design** mit Controllern, Services, Repositories und Entities



##  2. Benutzerverwaltung

###  Registrierung (`/api/users/register`)
- Entgegennahme von `UserRegistrationRequest`
- Passwort wird gehasht mit `BCryptPasswordEncoder`
- Benutzer wird mit `isActive = true` und `createdAt` gespeichert

###  Login (`/authenticate`)
- JWT-Token wird generiert mit Benutzer-ID, Rollen (scopes) und Ablaufzeit
- Bei erfolgreicher Authentifizierung wird `JwtTokenResponse` zurückgegeben

###  Token-Handling
- Token wird clientseitig gespeichert (z. B. im LocalStorage)
- Spring Security verarbeitet den JWT automatisch durch Filterkette
- Token-Claims enthalten: `sub`, `userId`, `scope`, `exp`

##  3. Entitäten & Beziehungen

###  User
- Felder: `email`, `passwordHash`, `firstName`, `lastName`, `isActive`, `createdAt`
- Beziehung: OneToMany zu Kategorien & Notizen

###  Category
- Felder: `name`, `createdAt`
- Beziehung: ManyToOne `User`, OneToMany `Note`

###  Note
- Felder: `title`, `content`, `createdAt`, `updatedAt`, `isArchived`, `shareableLink`
- Beziehung: ManyToOne `User`, ManyToOne `Category`, OneToMany `Media`

###  Media
- Felder: `type`, `data`, `url` (optional für Pfadspeicherung)
- Beziehung: ManyToOne `Note`



## 4. Notizen & Kategorien-Logik

###  Kategorien-Endpunkte (`/api/categories`)
- `POST /{userId}` – Neue Kategorie erstellen
- `GET /{userId}` – Alle Kategorien des Benutzers abrufen
- `PUT /notes/{categoryId}` – Notiz (nur Text) hinzufügen
- `DELETE /{categoryId}` – Kategorie löschen

###  Notizen-Endpunkte (`/api/notes`)
- `POST /addNote` – Fügt eine vollständige Notiz mit Titel & Inhalt hinzu

###  Datenfluss:
- Frontend sendet z. B. `NoteRequest` mit `userId`, `categoryId`, `title`, `content`
- Service layer validiert User und Category, erstellt Note und speichert


##  5. Medienverwaltung

###  Upload (`POST /api/media/upload/{noteId}`)
- Erwartet ein `MultipartFile` und verknüpft dieses mit der Notiz
- Medien werden als `byte[]` im `Media`-Objekt gespeichert (könnte auch nur Pfad sein)

###  Abruf
- `GET /note/{noteId}` – Alle Medien zu einer Notiz abrufen
- `GET /{mediaId}` – Einzelnes Medium als `byte[]` zurückgeben (mit `Content-Type`)



##  6. Sicherheit & Authentifizierung

###  JWT Konfiguration (`JwtSecurityConfig`)
- Alle Routen sind standardmäßig gesichert
- `/authenticate`, `/register`, `/login` sind öffentlich
- Session-Management: `stateless`
- JWT wird über `Authorization: Bearer <token>` verarbeitet

###  Benutzeridentifikation im Token
- `JwtTokenService` extrahiert Daten aus `Authentication`
- `CustomUserDetails` liefert `userId`, `email`, `isActive`



##  7. DTOs & Datenmodell

### Wichtigste DTOs:
- `UserRegistrationRequest` / `UserLoginRequest`
- `CategoryDTO` (enthält Liste von Notizinhalten)
- `NoteRequest` (Titel, Inhalt, Kategorie-ID)
- `UserResponseDTO` (ohne Passwortdaten)
- `JwtTokenRequest/Response` (Login/Token)

### Sichere Kommunikation zwischen Frontend und Backend, ohne Entitäten direkt preiszugeben


##  8. API-Zugriffsstruktur (Beispiele)

| Methode | Pfad | Beschreibung |
|--------|------|--------------|
| `POST` | `/authenticate` | Login mit E-Mail und Passwort |
| `POST` | `/api/users/register` | Benutzerregistrierung |
| `GET`  | `/api/categories/{userId}` | Kategorien eines Nutzers |
| `POST` | `/api/notes/addNote` | Neue Notiz anlegen |
| `POST` | `/api/media/upload/{noteId}` | Datei zu Notiz hochladen |
| `GET`  | `/api/media/note/{noteId}` | Dateien einer Notiz abrufen |



##  9. Entwicklerhinweise

- `@PrePersist` & `@PreUpdate` sorgen für automatische Zeitstempelung
- Fehlerbehandlung über `IllegalArgumentException` & `ResourceNotFoundException`
- Services enthalten zentrale Geschäftslogik, Controller sind sehr schlank gehalten
- Security ist vollständig über `JwtSecurityConfig` konfiguriert



## 10. Erweiterungsideen

-  **Notiz teilen** über `shareableLink` (Endpoint existiert noch nicht vollständig, wurde angefangen)
-  **Rollen & Berechtigungen** ( Admin-Funktionen)
-  **Medien auslagern** ins Dateisystem oder S3 (Pfad statt Blob speichern, Nützlich für ein Endprodukt. Daher wurde es nicht implementiert.)
-  **Kommentare oder Tags** zu Notizen, generell eine Vollfertige Notizseite mit Bildern.
