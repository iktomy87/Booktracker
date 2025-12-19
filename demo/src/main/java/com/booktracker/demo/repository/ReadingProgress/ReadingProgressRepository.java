package com.booktracker.demo.repository.ReadingProgress;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import com.booktracker.demo.model.ReadingProgress;
import com.booktracker.demo.model.User;
import com.booktracker.demo.model.Book;

@Repository
public interface ReadingProgressRepository extends JpaRepository<ReadingProgress, Long> {
    List<ReadingProgress> findByUserAndIsReadingTrue(User user);
    List<ReadingProgress> findById(Book book);
    Optional<ReadingProgress> findByUserAndBook(User user, Book book);
}
