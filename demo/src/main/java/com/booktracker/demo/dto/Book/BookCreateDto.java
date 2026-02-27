package com.booktracker.demo.dto.Book;


import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

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

    @NotEmpty(message = "Debe asignar al menos un autor")
    private List<Long> authorIds; 

    private List<Long> genreIds; // Lista de IDs para la relación ManyToMany
}
