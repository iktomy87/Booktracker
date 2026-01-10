package com.booktracker.demo.mapper.Author;

import java.util.List;

import org.mapstruct.Mapper;

import com.booktracker.demo.dto.Author.AuthorDto;
import com.booktracker.demo.dto.Genre.GenreDto;
import com.booktracker.demo.model.Author;
import com.booktracker.demo.model.Genre;

@Mapper(componentModel = "spring")
public interface AuthorMapper {
    AuthorDto toDto(Author author);
    List<AuthorDto> toDtoList(List<Author> authors);
}
