package com.booktracker.demo.repository.Book;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.booktracker.demo.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("SELECT DISTINCT b FROM Book b LEFT JOIN FETCH b.authors LEFT JOIN FETCH b.genres")
    List<Book> findAllWithRelations();

    @Query("SELECT b FROM Book b LEFT JOIN FETCH b.authors LEFT JOIN FETCH b.genres WHERE b.id = :id")
    Optional<Book> findByIdWithRelations(@Param("id") Long id);

    List<Book> findByNameContainingIgnoreCaseOrAuthorsNameContainingIgnoreCase(String name, String authorName);
}
