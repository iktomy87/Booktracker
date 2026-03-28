package com.booktracker.demo.dto.LibraryItem;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LibraryItemDto {
    private Long bookId;
    private String status;
    private Integer currentPage;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer rating;
    private List<String> tags;
    private String notes;
}