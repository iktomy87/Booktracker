package com.booktracker.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booktracker.demo.dto.LibraryItem.LibraryItemDto;
import com.booktracker.demo.dto.LibraryItem.LibraryItemResponseDto;
import com.booktracker.demo.service.LibraryItem.LibraryItemService;;

@RestController
@RequestMapping("/api/library")
public class LibraryController {

    private final LibraryItemService libraryService;

    public LibraryController(LibraryItemService libraryService) {
        this.libraryService = libraryService;
    }

    @PostMapping("/{bookId}")
    public ResponseEntity<?> addBookToLibrary(
            @PathVariable Long bookId,
            @RequestBody LibraryItemDto payload,
            Authentication authentication) {
        
        String username = authentication.getName(); 
        
        libraryService.addBookToLibrary(username, bookId, payload);

        return ResponseEntity.ok().body("{\"message\": \"Libro añadido correctamente a la biblioteca\"}");
    }

@GetMapping
    public ResponseEntity<?> getUserLibrary(Authentication authentication) {
        String username = authentication.getName(); 
        
        var library = libraryService.getUserLibrary(username);
        
        return ResponseEntity.ok(library);
    }
}