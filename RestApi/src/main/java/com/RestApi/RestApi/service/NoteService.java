package com.RestApi.RestApi.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RestApi.RestApi.entity.Category;
import com.RestApi.RestApi.entity.Note;
import com.RestApi.RestApi.entity.User;
import com.RestApi.RestApi.repository.CategoryRepository;
import com.RestApi.RestApi.repository.NoteRepository;
import com.RestApi.RestApi.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    // Methode zum Hinzufügen einer Notiz zu einer Kategorie
    @Transactional
    public Note addNoteToCategory(Long userId, Long categoryId, String title, String content) {
        // Überprüfen, ob der Benutzer existiert
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Benutzer nicht gefunden"));

        // Überprüfen, ob die Kategorie existiert
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Kategorie nicht gefunden"));

        // Eine neue Notiz erstellen und die notwendigen Felder setzen
        Note note = new Note();
        note.setUser(user);  // Die Notiz wird mit dem Benutzer verknüpft
        note.setCategory(category);  // Die Notiz wird mit der Kategorie verknüpft
        note.setTitle(title);
        note.setContent(content);
        note.setCreatedAt(LocalDateTime.now());
        note.setIsArchived(false);  // Standardwert (optional)

        // Speichern der Notiz in der Datenbank
        return noteRepository.save(note);
    }

    //Später AUSBAUEN
    // public Note getNoteByShareableLink(String shareableLink) {
    //     return noteRepository.findByShareableLink(shareableLink);  // Abrufen der Notiz anhand des Shareable Links
    // }
}