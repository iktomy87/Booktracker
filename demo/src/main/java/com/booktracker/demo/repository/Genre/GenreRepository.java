package com.booktracker.demo.repositor.Genre;

import org.springframework.data.jpa.repository.JpaRepository;
import com.booktracker.demo.model.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}