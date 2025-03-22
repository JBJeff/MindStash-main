package com.RestApi.RestApi.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.RestApi.RestApi.entity.User;
import com.RestApi.RestApi.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;//Wichtig sonst stimmt der bergleich zu Passwort und HashedPasswort nicht !!!!

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Benutzer erstellen
    public User createUser(String email, String rawPassword, String firstName, String lastName) {
        // Prüft, ob ein Benutzer mit der E-Mail bereits existiert
        userRepository.findByEmail(email).ifPresent(existingUser -> {
            throw new IllegalArgumentException("Ein Benutzer mit dieser E-Mail existiert bereits!");
        });

        // Passwort hashen
        String hashedPassword = passwordEncoder.encode(rawPassword);

        // Neuen Benutzer erstellen
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPasswordHash(hashedPassword);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setIsActive(true);

        return userRepository.save(newUser);
    }

    // Login eines Benutzers
    public Optional<User> loginUser(String email, String rawPassword) {
        // Benutzer anhand der E-Mail suchen
        return userRepository.findByEmail(email).filter(user -> {
            // Passwort-Hash prüfen
            boolean passwordMatches = passwordEncoder.matches(rawPassword, user.getPasswordHash());
            if (!passwordMatches) {
                System.out.println("Ungültiges Passwort für Benutzer: " + email);
            }
            return passwordMatches;
        });
    }

    // Benutzer nach ID finden
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Benutzer nach E-Mail finden
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Benutzer aktualisieren
    public Optional<User> updateUser(Long id, String firstName, String lastName, Boolean isActive) {
        return userRepository.findById(id).map(user -> {
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setIsActive(isActive);
            return userRepository.save(user);
        });
    }

    // Benutzer löschen
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Benutzer aktivieren/deaktivieren
    public Optional<User> toggleUserStatus(Long id) {
        return userRepository.findById(id).map(user -> {
            user.setIsActive(!user.getIsActive());
            return userRepository.save(user);
        });
    }
}
