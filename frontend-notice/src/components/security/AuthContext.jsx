import React, { createContext, useContext, useState, useEffect } from "react";
import { executeJWTAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";
import { jwtDecode } from "jwt-decode";  // Richtiger Import

// Erstellen des Authentifizierungs-Kontexts
export const AuthContext = createContext();

// Hook zum Zugriff auf den Authentifizierungs-Kontext
export const useAuth = () => useContext(AuthContext);

/*
 * Beschreibung:
 * Der `AuthProvider`-Komponente bietet den Authentifizierungs-Kontext für die untergeordneten Komponenten. 
 * Sie verwaltet den Anmeldestatus, das Benutzername und das Token. Sie enthält Funktionen zur 
 * Anmeldung (`login`) und Abmeldung (`logout`).
 */
export default function AuthProvider({ children }) {
  // State-Variablen zur Verwaltung des Authentifizierungsstatus
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // Überprüfen, ob ein Token im localStorage vorhanden ist
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken'); // Token aus localStorage abrufen
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken); // Token dekodieren
        console.log('Decoded Token:', decodedToken); // Zum Debuggen in der Konsole ausgeben

        // Überprüfe, ob das Token nicht abgelaufen ist
        const currentTime = Date.now() / 1000; // Aktuelle Zeit in Sekunden
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          // Token ist noch gültig
          setAuthenticated(true);
          setEmail(decodedToken.email); // E-Mail aus dem Token extrahieren
          setUserId(decodedToken.userId); // Benutzer-ID setzen
          setToken(storedToken); // Token setzen
          

          // API-Client mit JWT-Token konfigurieren
          // apiClient.interceptors.request.use((config) => {
          //   config.headers.Authorization = storedToken;
          //   return config;
          // });
        } else {
          // Token ist abgelaufen
          logout();
        }
      } catch (error) {
        console.error("Fehler beim Dekodieren des Tokens:", error);
        logout(); // Abmelden bei Fehler
      }
    }
  }, []);

  // Funktion zur Anmeldung
  async function login(email, password) {
    try {
      // Authentifizierung durchführen und Token erhalten
      const response = await executeJWTAuthenticationService(email, password);
      const jwtToken = 'Bearer ' + response.data.token;

      // Erfolgreiche Anmeldung
      if (response.status === 200) {
        setAuthenticated(true);
        setEmail(email);
        setToken(jwtToken);
        //setUserId(userId);

        // Speichern des Tokens im localStorage
        localStorage.setItem('authToken', jwtToken);

        // API-Client mit JWT-Token konfigurieren
        apiClient.interceptors.request.use(
          (config) => {
            config.headers.Authorization = jwtToken;
            return config;
          }
        );

        return true;
      } else {
        console.error('Es gab einen Fehler:', response.statusText);
        logout(); // Abmelden des Benutzers bei Fehler
        return false;
      }
    } catch (error) {
      console.error('Es gab einen Fehler:', error.message);
      logout(); // Abmelden des Benutzers bei Fehler
      return false;
    }
  }

  // Funktion zum Abmelden des Benutzers
  function logout() {
    setAuthenticated(false);
    setEmail(null);
    setToken(null);
    localStorage.removeItem('authToken'); // Token aus localStorage entfernen
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, email, token,userId }}>
      {children}
    </AuthContext.Provider>
  );
}
