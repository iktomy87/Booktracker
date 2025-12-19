package com.booktracker.demo.model;
import jakarta.persistence.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;
    @Column(nullable = true)
    private Date birthDate;
    @Column(nullable = true, length = 500)
    private String biography;

    private int totalBooks;

    public Author(Long id, String name, Date birthDate, String biography) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.biography = biography;
    }
}
