package com.RestApi.RestApi.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "media")
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "note_id", nullable = false)
    private Note note; // Referenz zur Notiz

    @Column(name = "url")
    private String url; //Für externe Links oder Dateien, die im Dateisystem gespeichert sind

    @Column(name = "type", nullable = false)
    private String type; // Typ des Mediums (z. B. "image/png", "image/jpeg")

    @Lob
    @Column(name = "data")
    private byte[] data; // Binäre Bilddaten

    // Getter und Setter
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Note getNote() { return note; }
    public void setNote(Note note) { this.note = note; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public byte[] getData() { return data; }
    public void setData(byte[] data) { this.data = data; }
}
