import React, { useState, useEffect } from 'react';
import './dashBoardCSS/CategoryNotes.css';
import { useParams, useNavigate } from 'react-router-dom';
import { createNote } from "../api/NoteApiService";
import { jwtDecode } from "jwt-decode"; 
import { getCategoriesForUser } from '../api/CategoryApiService';  
import{uploadMedia} from '../api/MediaApiService';  


export default function CategoryNotes({ categories }) {
  const { categoryId } = useParams();  // Die Kategorie-ID aus der URL
  const navigate = useNavigate(); 
  const [category, setCategory] = useState(null);  // Zustand für die aktuelle Kategorie
  const [newNote, setNewNote] = useState('');  // Zustand für die neue Notiz
  const [notes, setNotes] = useState([]);  // Zustand für die Notizen
  const [userId, setUserId] = useState(null);  // Benutzer-ID
  const [loading, setLoading] = useState(true);  // Ladezustand

    // Filterzustände
    const [keyword, setKeyword] = useState("");  // Zustand für das Schlagwort
    //const [isArchived, setIsArchived] = useState(null);  // Zustand für Archivstatus
    const [startDate, setStartDate] = useState("");  // Zustand für das Startdatum
    const [endDate, setEndDate] = useState("");  // Zustand für das Enddatum

    const [mediaFiles, setMediaFiles] = useState([]); // Zustand für Medien
  const [showMediaModal, setShowMediaModal] = useState(false); // Zustand für das Modal
  const [selectedNoteId, setSelectedNoteId] = useState(null); // Die ID der Notiz, für die Medien angezeigt werden

  // Benutzer-ID aus dem Token abrufen
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("authToken");  // Hole das Token aus localStorage

    if (!token) {
      console.error("Kein Authentifizierungstoken gefunden.");
      return null;
    }
    try {
      const decodedToken = jwtDecode(token);  // Token dekodieren
      console.log("Dekodiertes Token:", decodedToken);  // Ausgabe zur Überprüfung
      return decodedToken.userId;  // Benutzer-ID zurückgeben
    } catch (error) {
      console.error("Fehler beim Dekodieren des Tokens:", error);
      return null;
    }
  };

  // Effekt zum Abrufen der Benutzer-ID und der Kategorie
  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();
    if (!userIdFromToken) {
      console.error("Benutzer-ID nicht verfügbar.");
      //navigate("/login");  // Umleitung zur Login-Seite, wenn kein Token vorhanden ist
      return;
    }
    setUserId(userIdFromToken);  // Benutzer-ID im Zustand setzen
    fetchCategoryAndNotes(userIdFromToken, categoryId);  // Abrufen der Kategorie und Notizen
  }, [categoryId, navigate]);

  // Funktion zum Abrufen der Kategorie und Notizen
  const fetchCategoryAndNotes = async (userId, categoryId) => {
    try {
      const data = await getCategoriesForUser(userId);  // Hole alle Kategorien für den Benutzer
      console.log("Abgerufene Kategorien:", data);  // Ausgabe zur Überprüfung
      const selectedCategory = data.find(cat => cat.id === parseInt(categoryId));
      
      if (selectedCategory) {
        setCategory(selectedCategory);  // Kategorie setzen
        setNotes(selectedCategory.notes || []);  // Notizen setzen (falls vorhanden)
      } else {
        console.error("Kategorie nicht gefunden");
        //navigate("/mainDashBoard");  // Zurück zum Dashboard, wenn die Kategorie nicht gefunden wird
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Kategorie:", error.message);
      //navigate("/mainDashBoard");  // Im Fehlerfall zur Dashboard-Seite navigieren
    }
    setLoading(false);  // Ladezustand zurücksetzen
  };

  // Funktion zum Hinzufügen einer Notiz
const handleAddNote = async () => {
  if (newNote.trim()) {
    try {
      // Benutzer-ID aus dem Token abrufen
      const userIdFromToken = getUserIdFromToken();  // Holen der Benutzer-ID aus dem Token
      if (!userIdFromToken) {
        alert("Benutzer-ID konnte nicht abgerufen werden.");
        return;
      }

      // Versuche, die Notiz über die API hinzuzufügen
      const newNoteData = await createNote(userIdFromToken, categoryId, 'Neuer Titel', newNote); // Benutzer-ID übergeben

      // Wenn die Notiz erfolgreich erstellt wurde, aktualisiere die Notizenliste
      setNotes([...notes, newNoteData]); // Neue Notiz zur Liste hinzufügen
      setNewNote(''); // Eingabefeld zurücksetzen
      window.location.reload();

    } catch (error) {
      alert('Fehler beim Hinzufügen der Notiz: ' + error.message);
    }
  } else {
    alert('Bitte eine Notiz eingeben!');
  }
};

useEffect(() => {
  if (category) {
    let filteredNotes = category.notes || [];

    // Filtern nach Schlagwort
    if (keyword) {
      filteredNotes = filteredNotes.filter(note =>
        note.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    // Filtern nach Zeitraum
    if (startDate) {
      filteredNotes = filteredNotes.filter(note => new Date(note.createdAt) >= new Date(startDate));
    }
    if (endDate) {
      filteredNotes = filteredNotes.filter(note => new Date(note.createdAt) <= new Date(endDate));
    }

    setNotes(filteredNotes);  // Setzt die gefilterten Notizen
  }
}, [category, keyword, startDate, endDate]);  // Trigger bei Änderungen der Filter


// Funktion zum Hochladen eines Bildes für eine Notiz
const handleUploadMedia = async (noteId, file) => {
  if (!file) {
    alert("Bitte wählen Sie eine Datei aus.");
    return;
  }

  try {
    const response = await uploadMedia(noteId, file); // API-Aufruf für das Hochladen
    alert(`Bild erfolgreich hochgeladen: ${response.fileName}`);
  } catch (error) {
    alert('Fehler beim Hochladen des Bildes: ' + error.message);
  }
};


return (
  <div className="category-notes">
    {/* Filtersektion */}
    <div className="filter-section">
      <input
        type="text"
        placeholder="Schlagwort suchen"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>

    {loading ? (
      <p>Lade Kategorie und Notizen...</p>
    ) : category ? (
      <>
          <h2>Notizen für {category.name}</h2>
          <div className="add-note-section">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Neue Notiz hinzufügen"
            />
            <button className="add-note-button" onClick={handleAddNote}>
              Notiz Hinzufügen
            </button>
          </div>

          <div className="notes-list">
            <ul>
              {notes.length === 0 ? (
                <p>Keine Notizen für diese Kategorie.</p>
              ) : 
              (
                
                notes.map((note, index) => (
                  <li key={index} className="note">
                    <span>{note}</span>
                    {/* Datei-Upload-Bereich */}
                    <input
                      type="file"
                      onChange={(e) => handleUploadMedia(note.id, e.target.files[0])}
                      className="upload-input"
                    />
                  </li>
                ))
              )}
            </ul>
          </div>
        </>
      ) : (
        <p>Die Kategorie wurde nicht gefunden.</p>
      )}
    </div>
  );
}