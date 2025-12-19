package com.booktracker.demo.model;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

public class ReadingProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    private int currentPage;
    private boolean isReading;

    public double getProgressPercentage() {
        return (double) currentPage / book.getTotalPages() * 100;
    }

    public Book getBook() {
        return book;
    }

    public void setCurrentPage(int page) {
        this.currentPage = page;
    }

}
