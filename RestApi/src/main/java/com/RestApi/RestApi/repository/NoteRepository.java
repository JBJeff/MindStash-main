package com.RestApi.RestApi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RestApi.RestApi.entity.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long>{
     
     // benutzerdefinierte Abfrage, um eine Notiz anhand eines Shareable Links zu finden
     Optional<Note> findByShareableLink(String shareableLink);
    
     
}
