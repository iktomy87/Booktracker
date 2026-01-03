package com.booktracker.demo.dto.Book;


import java.util.List;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookCreateDto {

    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @NotBlank(message = "La descripción es obligatoria")
    private String description;

    @Min(value = 1, message = "El libro debe tener al menos una página")
    private int totalPages;

    private String publisher;

    @NotNull(message = "El ID del autor es obligatorio")
    private Long authorId; // Enviamos solo el ID

    private List<Long> genreIds; // Lista de IDs para la relación ManyToMany
}
