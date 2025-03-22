package com.RestApi.RestApi.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.RestApi.RestApi.dto.NoteRequest;
import com.RestApi.RestApi.entity.Note;
import com.RestApi.RestApi.service.NoteService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    // Endpoint zum Hinzufügen einer Notiz zu einer Kategorie
    @PostMapping("/addNote")
    public ResponseEntity<Note> addNote(@RequestBody NoteRequest noteRequest) {
        try {
            Note newNote = noteService.addNoteToCategory(noteRequest.getUserId(), noteRequest.getCategoryId(),
                    noteRequest.getTitle(), noteRequest.getContent());
            return ResponseEntity.ok(newNote); // Rückgabe der erstellten Notiz
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Fehlermeldung, wenn Benutzer oder Kategorie nicht gefunden wurden
        }
    }

}

