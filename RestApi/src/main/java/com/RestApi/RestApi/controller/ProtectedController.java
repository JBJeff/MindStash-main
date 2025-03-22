package com.RestApi.RestApi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/protected")
public class ProtectedController {

    @GetMapping("/user-data")
    public ResponseEntity<?> getUserData(@RequestAttribute("userId") String userId) {
        // Benutzer-ID wird aus dem JWT-Token extrahiert
        return ResponseEntity.ok("Data for user ID: " + userId);
    }
}


