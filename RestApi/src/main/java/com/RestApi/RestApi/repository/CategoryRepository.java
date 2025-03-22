package com.RestApi.RestApi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RestApi.RestApi.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Findet alle Kategorien für einen bestimmten Benutzer
    List<Category> findByUserId(Long userId);
    
    // Optional: Findet eine Kategorie anhand ihres Namens (kann später nützlich sein)
    Optional<Category> findByName(String name);
}
