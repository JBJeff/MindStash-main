package com.RestApi.RestApi.jwtoken;

/**
 * Beschreibung:
 * Die Klasse `JwtTokenRequest` repräsentiert die Anfrage für die JWT-Authentifizierung.
 * Sie enthält die notwendigen Anmeldeinformationen eines Benutzers: den Benutzernamen und das Passwort.
 */
public record JwtTokenRequest(String email, String password) {}