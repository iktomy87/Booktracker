package com.booktracker.demo.mapper.Genre;

import java.util.List;

import com.booktracker.demo.dto.Genre.GenreDto;
import com.booktracker.demo.model.Genre;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GenreMapper {
    GenreDto toDto(Genre genre);
    List<GenreDto> toDtoList(List<Genre> genres);
}
