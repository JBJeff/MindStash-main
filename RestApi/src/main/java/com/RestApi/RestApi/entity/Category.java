package com.RestApi.RestApi.entity;

import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Referenz zur Benutzer-Entität

    @Column(name = "name", nullable = false, length = 100)
    private String name; // Name der Kategorie (z.B. "Arbeit", "Persönlich", "Studium")

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt; // Erstellungsdatum der Kategorie

    @OneToMany(mappedBy = "category") // Eine Kategorie hat viele Notizen
    private List<Note> notes; // Liste von Notizen, die zu dieser Kategorie gehören


    // Getter und Setter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    // Methoden, um die Felder automatisch zu setzen (z.B. bei Erstellung/Aktualisierung)
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
