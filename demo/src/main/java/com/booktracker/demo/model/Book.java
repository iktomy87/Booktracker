package com.booktracker.demo.model;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;
    @Column(nullable = false, length = 500)
    private String description; 
    @Column(nullable = true)
    private int totalPages;

    public int getTotalPages() {
        return totalPages;
    }
}
