import { apiClient } from './ApiClient.js';

// Funktion für die Benutzerregistrierung
export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post("/api/users/register", userData);
        return response.data;  // Erfolgreiche Antwort zurückgeben
    } catch (error) {
        // Fehlerbehandlung
        if (error.response) {
            // Server antwortet mit einem Fehlercode
            throw new Error(error.response.data.message || 'Unknown error');
        } else if (error.request) {
            // Keine Antwort vom Server
            throw new Error("No response from server");
        } else {
            // Fehler bei der Anfrage
            throw new Error("An error occurred. Please try again later.");
        }
    }
};

// Funktion für den Benutzerlogin, wird nicht genutzt da der AuthContext das Login regelt.
export const loginUser = async (userData) => {
    try {
        const response = await apiClient.post("/api/users/login", userData);
        return response.data;  // Erfolgreiche Antwort zurückgeben
    } catch (error) {
        // Fehlerbehandlung
        if (error.response) {
            // Server antwortet mit einem Fehlercode
            throw new Error(error.response.data.message || 'Unknown error');
        } else if (error.request) {
            // Keine Antwort vom Server
            throw new Error("No response from server");
        } else {
            // Fehler bei der Anfrage
            throw new Error("An error occurred. Please try again later.");
        }
    }
}