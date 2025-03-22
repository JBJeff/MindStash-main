package com.RestApi.RestApi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.RestApi.RestApi.entity.User;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Findet einen Benutzer anhand seiner E-Mail-Adresse (eindeutige e-mail)
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email); // Prüft, ob ein Benutzer mit dieser E-Mail existiert

    // Optional: Findet einen Benutzer anhand der ID (JpaRepository bietet diese Methode bereits)
    Optional<User> findById(Long id);

    // Optional: Findet einen Benutzer, der aktiv ist
    List<User> findByIsActive(Boolean isActive);
}
