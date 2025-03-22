package com.RestApi.RestApi.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Referenz zur Benutzer-Entität

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category; // Referenz zur Kategorie-Entität

    @OneToMany(mappedBy = "note")
    private List<Media> media;

    //UID ZUM TEILEN DER NOTIZEN
    @Column(name = "shareable_link")
    private String shareableLink;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "is_archived", nullable = false)
    private Boolean isArchived;

    public Note() {
        // Der Konstruktor sorgt dafür, dass bei der Erstellung einer Notiz der Link auch generiert wird
        this.shareableLink = generateShareableLink();
    }

    //DATA TRANSFER OBJECTS WERDEN SICHERLICH NÖTIG SEIN!
    //für UC-7 wichtig, wird zum Schluss implementiert, Klassen werden trotzdem erstellt. 
    public String generateShareableLink() {
        return UUID.randomUUID().toString();  // Generiert einen zufälligen, nicht erratbaren UUID-Link
    }


    // Getter und Setter

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Boolean getIsArchived() {
        return isArchived;
    }

    public void setIsArchived(Boolean isArchived) {
        this.isArchived = isArchived;
    }

    public List<Media> getMedia() {
        return media;
    }
    
    public void setMedia(List<Media> media) {
        this.media = media;
    }

    // Methoden, um die Felder automatisch zu setzen (z.B. bei
    // Erstellung/Aktualisierung)
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.isArchived = false; // Standardmäßig nicht archiviert
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public String getShareableLink() {
        return shareableLink;
    }

    public void setShareableLink(String shareableLink) {
        this.shareableLink = shareableLink;
    }
}

