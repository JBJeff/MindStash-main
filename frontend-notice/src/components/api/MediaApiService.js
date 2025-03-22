import { apiClient } from './ApiClient.js';


//Bild hochladen
export const uploadMedia = async (noteId, file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await apiClient.post(`/api/media/upload/${noteId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data; // Erfolgreiche Antwort zurückgeben
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Fehler beim Hochladen des Bildes');
        } else if (error.request) {
            throw new Error("Keine Antwort vom Server erhalten");
        } else {
            throw new Error("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
        }
    }
};


//Bilder für eine Notiz anzeigen
export const getMediaByNoteId = async (noteId) => {
    try {
        const response = await apiClient.get(`/api/media/note/${noteId}`);
        return response.data; // Liste der Media-Objekte zurückgeben
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Fehler beim Abrufen der Bilder');
        } else if (error.request) {
            throw new Error("Keine Antwort vom Server erhalten");
        } else {
            throw new Error("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
        }
    }
};

//einzelnes Bild, nicht notwendig...
export const getMediaById = async (mediaId) => {
    try {
        const response = await apiClient.get(`/api/media/${mediaId}`, {
            responseType: 'arraybuffer' // Für Binärdaten wie Bilder
        });

        // Bilddaten als Blob konvertieren
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        return URL.createObjectURL(blob); // URL zurückgeben, die das Bild darstellt
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Fehler beim Abrufen des Bildes');
        } else if (error.request) {
            throw new Error("Keine Antwort vom Server erhalten");
        } else {
            throw new Error("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
        }
    }
};


