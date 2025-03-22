package com.RestApi.RestApi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.RestApi.RestApi.dto.CustomUserDetails;
import com.RestApi.RestApi.entity.User;
import com.RestApi.RestApi.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Benutzer nicht gefunden: " + email));
        
        // Gib CustomUserDetails zurück, nicht das Standard User-Objekt
        return new CustomUserDetails(
                user.getEmail(),
                user.getPasswordHash(),
                user.getIsActive(),
                user.getId()  // User ID an CustomUserDetails übergeben
        );
    }
}