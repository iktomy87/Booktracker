package com.booktracker.demo.controller;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.booktracker.demo.dto.Book.BookCreateDto;
import com.booktracker.demo.dto.Book.BookDto;
import com.booktracker.demo.service.Book.BookService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {
    
    private final BookService bookService;

    @PostMapping
    public ResponseEntity<BookDto> createBook(@Valid @RequestBody BookCreateDto bookCreateDto) {
        BookDto createdBook = bookService.createBook(bookCreateDto);
        return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> getAllBooks() {
        List<BookDto> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @PostMapping("/upload-cover")
    public ResponseEntity<Map<String, String>> uploadCover(@RequestParam("file") MultipartFile file) {
        try {
            // 1. Crear la carpeta si no existe
            String uploadDir = "uploads/covers/";
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // 2. Generar un nombre único para evitar que imágenes con el mismo nombre se sobreescriban
            String originalName = file.getOriginalFilename();
            String extension = originalName != null ? originalName.substring(originalName.lastIndexOf(".")) : ".jpg";
            String fileName = UUID.randomUUID().toString() + extension;

            // 3. Guardar el archivo físicamente en el disco
            Path path = Paths.get(uploadDir + fileName);
            Files.write(path, file.getBytes());

            // 4. Devolver la URL para acceder a la imagen
            Map<String, String> response = new HashMap<>();
            response.put("coverUrl", "http://localhost:8080/uploads/covers/" + fileName);
            
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<BookDto>> searchBooks(@RequestParam("q") String query) {
        List<BookDto> books = bookService.searchBooks(query);
        return ResponseEntity.ok(books);
    }


}

