import { apiClient } from './ApiClient.js';


export const createNote = async (userId, categoryId, title, content) => {
    try {
      const response = await apiClient.post('/api/notes/addNote', {
        userId,
        categoryId,
        title,
        content
      });
      return response.data;  // Erfolgreiche Antwort zurückgeben (erstellt eine Notiz)
    } catch (error) {
      // Fehlerbehandlung
      if (error.response) {
        // Server antwortet mit einem Fehlercode
        throw new Error(error.response.data.message || 'Fehler beim Erstellen der Notiz');
      } else if (error.request) {
        // Keine Antwort vom Server
        throw new Error("Keine Antwort vom Server erhalten");
      } else {
        // Fehler bei der Anfrage
        throw new Error("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
      }
    }
  };
