package com.booktracker.demo.repository.Author;

import org.springframework.data.jpa.repository.JpaRepository;
import com.booktracker.demo.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}