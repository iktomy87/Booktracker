package com.booktracker.demo.service.Book;

import java.util.List;

import com.booktracker.demo.dto.Book.BookCreateDto;
import com.booktracker.demo.dto.Book.BookDto;

public interface BookService {
    BookDto createBook(BookCreateDto bookCreateDto);
    List<BookDto> getAllBooks();
    BookDto getBookById(Long id);
}
