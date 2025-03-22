package com.RestApi.RestApi.dto;

import java.time.LocalDateTime;

public class UserResponseDTO {
     private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDateTime createdAt;
    private Boolean isActive;

    public UserResponseDTO(Long id, String email, String firstName, String lastName, LocalDateTime createdAt, Boolean isActive) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = createdAt;
        this.isActive = isActive;
    }

    // Getter
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public Boolean getIsActive() { return isActive; }
}

