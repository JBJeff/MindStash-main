package com.RestApi.RestApi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.RestApi.RestApi.entity.Media;
import com.RestApi.RestApi.entity.Note;
import com.RestApi.RestApi.repository.MediaRepository;
import com.RestApi.RestApi.repository.NoteRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class MediaService {

    @Autowired
    private MediaRepository mediaRepository;
    @Autowired
    private NoteRepository noteRepository;

    // Bild hochladen
    public Media uploadMedia(Long noteId, MultipartFile file) throws IOException {
        Optional<Note> noteOptional = noteRepository.findById(noteId);
        if (noteOptional.isEmpty()) {
            throw new IllegalArgumentException("Note not found with ID: " + noteId);
        }

        Media media = new Media();
        media.setNote(noteOptional.get());
        media.setType(file.getContentType());
        media.setData(file.getBytes());
        return mediaRepository.save(media);
    }

    // Bilder für eine Notiz abrufen
    public List<Media> getMediaByNoteId(Integer noteId) {
        return mediaRepository.findByNoteId(noteId);
    }

    // Einzelnes Bild abrufen
    public Media getMediaById(Integer mediaId) {
        return mediaRepository.findById(mediaId).orElseThrow(() -> 
            new IllegalArgumentException("Media not found with ID: " + mediaId));
    }

}
