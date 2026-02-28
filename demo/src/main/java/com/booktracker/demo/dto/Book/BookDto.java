package com.booktracker.demo.dto.Book;

import java.util.List;

import com.booktracker.demo.dto.Author.AuthorDto;
import com.booktracker.demo.dto.Genre.GenreDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookDto {
    private Long id;
    private String name;
    private String description; 
    private int totalPages;
    private List<AuthorDto> authors;
    private List<GenreDto> genres;
    private String publisher;
}
