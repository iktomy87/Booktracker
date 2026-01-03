package com.booktracker.demo.mapper.Author;

import java.util.List;

import org.mapstruct.Mapper;

import com.booktracker.demo.dto.Genre.GenreDto;
import com.booktracker.demo.model.Genre;

@Mapper(componentModel = "spring")
public interface AuthorMapper {
    GenreDto toDto(Genre genre);
    List<GenreDto> toDtoList(List<Genre> genres);
}
