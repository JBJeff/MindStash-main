import axios from "axios";

/**
 * 
 * Beschreibung:
 * Verbindet die Anwendung mit dem Backend-Server über eine HTTP-Anfragebibliothek.
 **/

// Erzeugt eine Instanz von 'axios' mit vordefinierten Konfigurationen
export const apiClient = axios.create({
    
    // Basis-URL für alle Anfragen, die mit dieser Instanz gesendet werden
    //baseURL: 'http://192.168.2.57:8080' // IP-Adresse des Netzwerks um die Anwendung auf dem Handy zu testen.
   baseURL: 'http://localhost:8080' //Basis-URL für die lokale Entwicklung
    
});

// Interceptor für Anfragen hinzufügen. globales Authentifizierungssystem
// WICHTIG: /register rausnehmen sonst funktioniert das Registrieren nicht!!!

// apiClient.interceptors.request.use(
//   (config) => {
//       const token = localStorage.getItem("authToken");

//       // `Authorization`-Header nur für geschützte Routen setzen
//       if (token && !config.url.includes("/register") && !config.url.includes("/authenticate")) {
//           config.headers.Authorization = `Bearer ${token}`;
//       }

//       return config;
//   },
//   (error) => Promise.reject(error)
// );