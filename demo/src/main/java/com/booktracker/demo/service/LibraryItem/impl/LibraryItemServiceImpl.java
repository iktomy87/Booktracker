package com.booktracker.demo.service.LibraryItem.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.booktracker.demo.dto.LibraryItem.LibraryItemDto;
import com.booktracker.demo.dto.LibraryItem.LibraryItemResponseDto;
import com.booktracker.demo.model.Book;
import com.booktracker.demo.model.LibraryItem;
import com.booktracker.demo.model.User;
import com.booktracker.demo.repository.Book.BookRepository;
import com.booktracker.demo.repository.LibraryItem.LibraryItemRepository;
import com.booktracker.demo.repository.User.UserRepository;
import com.booktracker.demo.service.LibraryItem.LibraryItemService;

@Service
public class LibraryItemServiceImpl implements LibraryItemService {

    private final LibraryItemRepository libraryItemRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public LibraryItemServiceImpl(LibraryItemRepository libraryItemRepository,
                                  UserRepository userRepository,
                                  BookRepository bookRepository) {
        this.libraryItemRepository = libraryItemRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    @Transactional
    public LibraryItemDto addBookToLibrary(String email, Long bookId, LibraryItemDto payload) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Libro no encontrado en el catálogo"));

        LibraryItem libraryItem = libraryItemRepository.findByUserAndBook(user, book)
                .orElse(new LibraryItem());

        libraryItem.setUser(user);
        libraryItem.setBook(book);
        libraryItem.setStatus(payload.getStatus() != null ? payload.getStatus() : "PENDIENTE");
        libraryItem.setCurrentPage(payload.getCurrentPage() != null ? payload.getCurrentPage() : 0);
        libraryItem.setStartDate(payload.getStartDate());
        libraryItem.setEndDate(payload.getEndDate());
        libraryItem.setRating(payload.getRating());
        libraryItem.setTags(payload.getTags());
        libraryItem.setNotes(payload.getNotes());

        LibraryItem saved = libraryItemRepository.save(libraryItem);

        LibraryItemDto result = new LibraryItemDto();
        result.setBookId(saved.getBook().getId());
        result.setStatus(saved.getStatus());
        result.setCurrentPage(saved.getCurrentPage());
        result.setStartDate(saved.getStartDate());
        result.setEndDate(saved.getEndDate());
        result.setRating(saved.getRating());
        result.setTags(saved.getTags());
        result.setNotes(saved.getNotes());

        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<LibraryItemResponseDto> getUserLibrary(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<LibraryItem> userBooks = libraryItemRepository.findAllByUser(user);

        return userBooks.stream().map(ub -> {
            LibraryItemResponseDto dto = new LibraryItemResponseDto();
            dto.setUserBookId(ub.getId());
            dto.setBookId(ub.getBook().getId());
            dto.setTitle(ub.getBook().getName());

            String authorName = "Desconocido";
            if (ub.getBook().getAuthors() != null && !ub.getBook().getAuthors().isEmpty()) {
                authorName = ub.getBook().getAuthors().iterator().next().getName();
            }
            dto.setAuthor(authorName);

            dto.setCoverUrl(null);
            dto.setCoverVariant(null);

            dto.setTotalPages(ub.getBook().getTotalPages());

            dto.setStatus(ub.getStatus());
            dto.setCurrentPage(ub.getCurrentPage());
            dto.setStartDate(ub.getStartDate());
            dto.setEndDate(ub.getEndDate());
            dto.setRating(ub.getRating());

            return dto;
        }).collect(Collectors.toList());
    }
}