package com.booktracker.demo.model;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;
}
