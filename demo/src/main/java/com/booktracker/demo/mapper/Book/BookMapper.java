package com.booktracker.demo.mapper.Book;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping; 
import com.booktracker.demo.dto.Book.BookCreateDto;
import com.booktracker.demo.dto.Book.BookDto;
import com.booktracker.demo.mapper.Author.AuthorMapper;
import com.booktracker.demo.mapper.Genre.GenreMapper;
import com.booktracker.demo.model.Book;

@Mapper(componentModel = "spring", uses = {AuthorMapper.class, GenreMapper.class})
public interface BookMapper {
    BookDto toDto(Book book);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "authors", ignore = true)
    @Mapping(target = "genres", ignore = true)
    Book toEntity(BookCreateDto dto);
}