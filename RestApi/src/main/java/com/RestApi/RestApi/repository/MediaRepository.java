package com.RestApi.RestApi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RestApi.RestApi.entity.Media;

@Repository
public interface MediaRepository extends JpaRepository<Media, Integer> {
    
    // Optional:  benutzerdefinierte Abfragen hinzufügen, z.B. nach noteId filtern
    
    
    List<Media> findByNoteId(Integer noteId); // Bilder für eine spezifische Notiz abrufen
}
