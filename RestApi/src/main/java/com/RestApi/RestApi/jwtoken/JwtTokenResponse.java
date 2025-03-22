package com.RestApi.RestApi.jwtoken;

/**
 * 
 * Beschreibung:
 * Die Klasse `JwtTokenResponse` repräsentiert die Antwort auf eine JWT-Authentifizierungsanfrage.
 * Sie enthält den JWT-Token, der nach erfolgreicher Authentifizierung zurückgegeben wird.
 */
public record JwtTokenResponse(String token) {
    
}
