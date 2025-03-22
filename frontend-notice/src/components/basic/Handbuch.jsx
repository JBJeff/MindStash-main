import React from 'react';
import './cs_bComponents/Handbuch.css'; 

export default function Handbuch() {
  return (
    <div className="user-guide">
      <h1>Willkommen bei MindStash dein digitales Notizbuch</h1>

      <section>
        <h2>1. Registrierung & Login</h2>
        <p>
           Registriere dich über den <strong>„Registrieren“</strong>-Button. Danach kannst du dich mit einer E-Mail und deinem Passwort anmelden.
           Einsehbar in der H2 Concole im Backend
        </p>
      </section>

      <section>
        <h2>2. Kategorien erstellen</h2>
        <p>
          Im <strong>Main Dashboard</strong> kannst man Kategorien erstellen, z.B. „Studium“, Programmieren, „Rezepte“ oder „Musik“.
        </p>
        <p>
          Gib einen Namen ein und klicke auf „Erstellen“. Du kannst diese Kategorien jederzeit löschen.
        </p>
      </section>

      <section>
        <h2>3. Notizen verwalten</h2>
        <p>
          Klicke auf eine Kategorie, um alle zugehörigen Notizen zu sehen. Du kannst neue Notizen hinzufügen, mit Filtern(Buchstabe) durchsuchen oder nach Datum einschränken.
        </p>
      </section>

      <section>
        <h2>4. Bilder zu Notizen hochladen</h2>
        <p>
          Für jede Notiz kannst du ein Bild oder eine Datei hochladen – z. B. Screenshots, Zeichnungen oder PDFs. Klicke dafür einfach auf den Datei-Upload unter der Notiz.
          Diese Funktion ist noch nicht ausgereift.
        </p>
      </section>

      <section>
        <h2>5. Sicherheit & Authentifizierung</h2>
        <p>
          Die Daten sind geschützt. Die App verwendet <strong>JWT-Authentifizierung</strong> und speichert dein Token sicher im Browser.
        </p>
        <p>
          Beim Logout wird das Token gelöscht  deine Sitzung ist beendet. Jedoch ist es ist noch nicht integriert für einfache nutzung. 
          Man müsste jediglich die "AuthenticatedRoute"AuthenticatedRoute" Komponente in der MindStash.jsx nutzen.
        </p>
      </section>

      <footer>
        <p>MindStash</p>
      </footer>
    </div>
  );
}
