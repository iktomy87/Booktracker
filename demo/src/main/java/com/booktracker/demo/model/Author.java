package com.booktracker.demo.model;

import java.time.LocalDate; 
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "authors")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    private LocalDate birthDate; 

    @Column(length = 500)
    private String biography;

    private int totalBooks;

    @ManyToMany(mappedBy = "authors")
    private List<Book> books = new ArrayList<>();
}