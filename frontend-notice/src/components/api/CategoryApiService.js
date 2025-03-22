import { apiClient } from './ApiClient.js';

// Funktion zum Abrufen der Kategorien eines Benutzers
export const getCategoriesForUser = async (userId) => {
    try {
        const response = await apiClient.get(`/api/categories/${userId}`);
        return response.data;  // Erfolgreiche Antwort zurückgeben
    } catch (error) {
        // Fehlerbehandlung
        if (error.response) {
            // Server antwortet mit einem Fehlercode
            throw new Error(error.response.data.message || 'Fehler beim Abrufen der Kategorien');
        } else if (error.request) {
            // Keine Antwort vom Server
            throw new Error("Keine Antwort vom Server erhalten");
        } else {
            // Fehler bei der Anfrage
            throw new Error("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
        }
    }
};

// Funktion zum Erstellen einer neuen Kategorie
export const createCategory = async (userId, categoryData) => {
    try {
        const response = await apiClient.post(`/api/categories/${userId}`, categoryData);
        return response.data;  // Erfolgreiche Antwort zurückgeben
    } catch (error) {
        // Fehlerbehandlung
        if (error.response) {
            // Server antwortet mit einem Fehlercode
            throw new Error(error.response.data.message || 'Fehler beim Erstellen der Kategorie');
        } else if (error.request) {
            // Keine Antwort vom Server
            throw new Error("Keine Antwort vom Server erhalten");
        } else {
            // Fehler bei der Anfrage
            throw new Error("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
        }
    }
};

// Funktion zum Löschen einer Kategorie
export const deleteCategory = async (categoryId) => {
    try {
        // Sendet eine DELETE-Anfrage zum Löschen der Kategorie
        const response = await apiClient.delete(`/api/categories/${categoryId}`);
        return response;  // Erfolgreiche Antwort zurückgeben (status 204)
    } catch (error) {
        // Fehlerbehandlung
        if (error.response) {
            // Server antwortet mit einem Fehlercode
            throw new Error(error.response.data.message || 'Fehler beim Löschen der Kategorie');
        } else if (error.request) {
            // Keine Antwort vom Server
            throw new Error("Keine Antwort vom Server erhalten");
        } else {
            // Fehler bei der Anfrage
            throw new Error("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
        }
    }
}
