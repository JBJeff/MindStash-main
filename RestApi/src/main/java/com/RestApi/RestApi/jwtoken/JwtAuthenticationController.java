package com.RestApi.RestApi.jwtoken;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtAuthenticationController {
    
    private final JwtTokenService tokenService;
    
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationController(JwtTokenService tokenService, 
            AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    //Endpunkt zur Authentifizierung eines Benutzers und zur Generierung eines JWT.
    @PostMapping("/authenticate")
    public ResponseEntity<JwtTokenResponse> generateToken(@RequestBody JwtTokenRequest jwtTokenRequest) {
        System.out.println("Anmeldeversuch mit E-Mail: " + jwtTokenRequest.email());
        
        try {
            // Erzeugt ein Authentifizierungstoken
            var authenticationToken = new UsernamePasswordAuthenticationToken(
                    jwtTokenRequest.email(),  //E-Mail des Benutzers
                    jwtTokenRequest.password());

            // Versucht, den Benutzer zu authentifizieren
            var authentication = authenticationManager.authenticate(authenticationToken);
            
            // Generiert ein JWT für den authentifizierten Benutzer
            var token = tokenService.generateToken(authentication);
            return ResponseEntity.ok(new JwtTokenResponse(token));
        } catch (Exception e) {
            System.out.println("Authentifizierungsfehler: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();  // 401 Unauthorized zurückgeben
        }
    }
}