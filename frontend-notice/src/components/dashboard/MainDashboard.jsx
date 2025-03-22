import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

import { getCategoriesForUser, createCategory, deleteCategory } from "../api/CategoryApiService";

export default function MainDashboard() {
  const [categories, setCategories] = useState([]);  // Zustand für Kategorien
  const [newCategoryName, setNewCategoryName] = useState("");  // Zustand für den neuen Kategoriennamen
  const [userId, setUserId] = useState(null);  // Zustand für Benutzer-ID
  const navigate = useNavigate(); // React-Router-Hook für Navigation

  // Benutzer-ID aus Token abrufen
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Kein Authentifizierungstoken gefunden.");
      return null;
    }

    try {
      const decodedToken = jwtDecode(token); // Token dekodieren mit jwtDecode
      if (!decodedToken.userId) {
        console.error("Benutzer-ID fehlt im Token.");
        return null;
      }
      return decodedToken.userId;  // Benutzer-ID aus dem Token extrahieren
    } catch (error) {
      console.error("Fehler beim Dekodieren des Tokens:", error);
      return null;
    }
  };

  // Effect-Hook zum Abrufen der Benutzer-ID und Kategorien
  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();  // Benutzer-ID aus Token abrufen
    if (!userIdFromToken) {
      console.error("Benutzer-ID nicht verfügbar. Umleitung zur Login-Seite.");
      //navigate("/login"); // Benutzer zur Login-Seite umleiten
    } else {
      setUserId(userIdFromToken);  // Benutzer-ID im Zustand setzen
      fetchCategories(userIdFromToken);  // Kategorien abrufen
    }
  }, []);  // Nur einmal beim ersten Rendern ausführen

  // Funktion: Kategorien vom Server abrufen
  const fetchCategories = async (userId) => {
    try {
      const data = await getCategoriesForUser(userId);
      if (Array.isArray(data)) {
        setCategories(data);  // Kategorien im Zustand speichern
      } else {
        console.error("Unerwartetes API-Format.");
        setCategories([]);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Kategorien:", error.message);
    }
  };

  // Funktion: Neue Kategorie erstellen
  const handleCreateCategory = async () => {
    const userIdFromToken = getUserIdFromToken();
    if (!userIdFromToken) {
      alert("Fehler: Bitte melden Sie sich erneut an.");
      return;
    }

    if (!newCategoryName.trim()) {
      alert("Bitte geben Sie einen Namen für die Kategorie ein.");
      return;
    }

    try {
      await createCategory(userIdFromToken, { name: newCategoryName });
      setNewCategoryName("");  // Eingabefeld zurücksetzen
      fetchCategories(userIdFromToken);  // Kategorienliste aktualisieren
    } catch (error) {
      console.error("Fehler beim Erstellen der Kategorie:", error.message);
    }
  };

    // Funktion: Kategorie löschen
    const handleDeleteCategory = async (categoryId) => {
      const userIdFromToken = getUserIdFromToken();
      if (!userIdFromToken) {
        alert("Fehler: Bitte melden Sie sich erneut an.");
        return;
      }
  
      try {
        await deleteCategory(categoryId);  // Lösche die Kategorie
        // Nach dem Löschen die Liste der Kategorien aktualisieren
        setCategories(categories.filter((category) => category.id !== categoryId));
      } catch (error) {
        console.error("Fehler beim Löschen der Kategorie:", error.message);
      }
    };

  return (
    <div className="main-dashboard">
      <h1>Main Dashboard</h1>

      {/* Kategorie erstellen */}
      <div className="create-category-section">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Neue Kategorie eingeben"
        />
        <button onClick={handleCreateCategory}>Erstellen</button>
      </div>

      {/* Kategorienliste */}
      <div className="categories-list">
        <h2>Erstellte Kategorien</h2>
        {categories.length === 0 ? (
          <p>Keine Kategorien vorhanden. Erstelle eine neue Kategorie!</p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Link to={`/categoryNotes/${category.id}`}>{category.name}</Link>
                <button onClick={() => handleDeleteCategory(category.id)}>Löschen</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
