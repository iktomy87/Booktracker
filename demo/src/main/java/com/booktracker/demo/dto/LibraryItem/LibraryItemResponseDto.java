package com.booktracker.demo.dto.LibraryItem;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LibraryItemResponseDto {
    private Long userBookId; // El ID de la relación (útil para actualizar páginas luego)
    private Long bookId;     // El ID original del libro
    private String title;
    private String author;
    private String coverUrl;
    private String coverVariant;
    private Integer totalPages;
    
    private String status;
    private Integer currentPage;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer rating;

}