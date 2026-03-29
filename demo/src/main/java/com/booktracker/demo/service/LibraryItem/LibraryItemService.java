package com.booktracker.demo.service.LibraryItem;
import java.util.List;

import com.booktracker.demo.dto.LibraryItem.LibraryItemDto;
import com.booktracker.demo.dto.LibraryItem.LibraryItemResponseDto;

public interface LibraryItemService {
    LibraryItemDto addBookToLibrary(String username, Long id, LibraryItemDto payload);

    List<LibraryItemResponseDto> getUserLibrary(String username);
}
