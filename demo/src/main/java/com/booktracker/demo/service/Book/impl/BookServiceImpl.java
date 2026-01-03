package com.booktracker.demo.service.Book.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.booktracker.demo.dto.Book.BookCreateDto;
import com.booktracker.demo.dto.Book.BookDto;
import com.booktracker.demo.mapper.Book.BookMapper;
import com.booktracker.demo.model.Book;
import com.booktracker.demo.repository.Book.BookRepository;
import com.booktracker.demo.service.Book.BookService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;
    private final BookMapper bookMapper;

    @Override
    @Transactional
    public BookDto createBook(BookCreateDto bookCreateDto) {
        // CORRECCIÓN: Usar la instancia inyectada 'bookMapper'
        Book book = bookMapper.toEntity(bookCreateDto);
        
        if (bookCreateDto.getAuthorIds() != null) {
            book.setAuthors(authorRepository.findAllById(bookCreateDto.getAuthorIds()));
        }

        if (bookCreateDto.getGenreIds() != null) {
            book.setGenres(genreRepository.findAllById(bookCreateDto.getGenreIds()));
        }

        Book savedBook = bookRepository.save(book);
        return bookMapper.toDto(savedBook);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookDto> getAllBooks() {
        return bookRepository.findAllWithRelations() // Usando la query optimizada
            .stream()
            .map(bookMapper::toDto)
            .toList(); // Simplificación de .collect(Collectors.toList())
    }

    @Override
    @Transactional(readOnly = true)
    public BookDto getBookById(Long id) {
        // Implementación del método faltante
        return bookRepository.findByIdWithRelations(id)
            .map(bookMapper::toDto)
            .orElseThrow(() -> new ResourceNotFoundException("El libro con ID " + id + " no existe"));
    }
}
