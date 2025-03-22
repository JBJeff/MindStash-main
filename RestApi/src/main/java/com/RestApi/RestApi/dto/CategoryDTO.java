package com.RestApi.RestApi.dto;

import java.util.List;

public class CategoryDTO {
    private Long id;
    private String name;
    private List<String> notes; // Liste von Notiz-Inhalten als Strings

    // Getter und Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getNotes() {
        return notes;
    }

    public void setNotes(List<String> notes) {
        this.notes = notes;
    }
}