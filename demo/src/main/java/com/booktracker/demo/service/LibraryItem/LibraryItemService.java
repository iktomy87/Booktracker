package com.booktracker.demo.service.LibraryItem;
import com.booktracker.demo.dto.LibraryItem.LibraryItemDto;

public interface LibraryItemService {
    LibraryItemDto addBookToLibrary(String username, Long id, LibraryItemDto payload);
}
