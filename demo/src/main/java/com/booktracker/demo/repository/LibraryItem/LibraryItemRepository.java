package com.booktracker.demo.repository.LibraryItem;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booktracker.demo.model.Book;
import com.booktracker.demo.model.LibraryItem;
import com.booktracker.demo.model.User;

@Repository
public interface LibraryItemRepository extends JpaRepository<LibraryItem, Long> {
    Optional<LibraryItem> findByUserAndBook(User user, Book book);
    List<LibraryItem> findAllByUser(User user);
}
