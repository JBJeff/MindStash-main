package com.RestApi.RestApi.controller;

import java.util.List;
import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.RestApi.RestApi.dto.CategoryDTO;
import com.RestApi.RestApi.entity.Category;
import com.RestApi.RestApi.entity.Note;
import com.RestApi.RestApi.exception.ResourceNotFoundException;
import com.RestApi.RestApi.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // API-Endpunkt zum Erstellen einer neuen Kategorie
    @PostMapping("/{userId}")
    public ResponseEntity<CategoryDTO> createCategory(
            @PathVariable Long userId,
            @RequestBody CategoryDTO categoryDTO) {

        Category category = categoryService.createCategory(userId, categoryDTO.getName());
        CategoryDTO response = new CategoryDTO();
        response.setId(category.getId());
        response.setName(category.getName());
        response.setNotes(new ArrayList<>()); // Am Anfang sind keine Notizen vorhanden

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // API-Endpunkt zum Abrufen aller Kategorien eines Benutzers
    @GetMapping("/{userId}")
    public ResponseEntity<List<CategoryDTO>> getCategoriesForUser(@PathVariable Long userId) {
        List<Category> categories = categoryService.getCategoriesForUser(userId);

        // Kategorien in DTOs umwandeln
        List<CategoryDTO> response = categories.stream().map(category -> {
            CategoryDTO dto = new CategoryDTO();
            dto.setId(category.getId());
            dto.setName(category.getName());

            // Notizen von List<Note> zu List<String> umwandeln
            if (category.getNotes() != null) {
                List<String> noteContents = category.getNotes().stream()
                        .map(Note::getContent) // Extrahiert den Content der Notizen
                        .collect(Collectors.toList());
                dto.setNotes(noteContents);
            } else {
                dto.setNotes(new ArrayList<>());
            }

            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // API-Endpunkt zum Aktualisieren von Notizen in einer Kategorie
    @PutMapping("/notes/{categoryId}")
    public ResponseEntity<CategoryDTO> addNoteToCategory(
            @PathVariable Long categoryId,
            @RequestBody String note) {

        Category category = categoryService.addNoteToCategory(categoryId, note);

        CategoryDTO response = new CategoryDTO();
        response.setId(category.getId());
        response.setName(category.getName());

        // Notizen von List<Note> in List<String> umwandeln
        if (category.getNotes() != null) {
            List<String> noteContents = category.getNotes().stream()
                    .map(Note::getContent) // Extrahiert den Content der Notizen
                    .collect(Collectors.toList());
            response.setNotes(noteContents);
        } else {
            response.setNotes(new ArrayList<>());
        }

        return ResponseEntity.ok(response);
    }

     @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId) {
        try {
            categoryService.deleteCategory(categoryId); // Aufruf der Löschen-Methode im Service
            return ResponseEntity.noContent().build(); // Erfolgreiches Löschen ohne Inhalt (204 No Content)
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Kategorie nicht gefunden (404 Not Found)
        }
    }

}
