package com.RestApi.RestApi.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.RestApi.RestApi.dto.UserRegistrationRequest;
import com.RestApi.RestApi.entity.User;
import com.RestApi.RestApi.repository.UserRepository;
import com.RestApi.RestApi.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationRequest request) {
        // Prüft, ob die E-Mail bereits registriert ist
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("E-Mail bereits registriert");
        }

        // Neues Benutzerobjekt erstellen
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword())); // Passwort sicher hashen
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setIsActive(true);
        user.setCreatedAt(LocalDateTime.now());

        // Benutzer in der Datenbank speichern
        userRepository.save(user);

        return ResponseEntity.ok("Benutzer erfolgreich registriert");
    }

      // Methode um alle Benutzer abzurufen
    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        // Alle Benutzer aus der Datenbank abrufen
        List<User> users = userRepository.findAll();
        
        // Wenn keine Benutzer gefunden wurden
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Erfolgreiche Rückgabe der Benutzerliste
        return ResponseEntity.ok(users);
    }

}
