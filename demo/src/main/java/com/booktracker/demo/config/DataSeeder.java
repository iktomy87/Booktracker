package com.booktracker.demo.config;

import com.booktracker.demo.model.Author;
import com.booktracker.demo.model.Book;
import com.booktracker.demo.model.Genre;
import com.booktracker.demo.model.User;
import com.booktracker.demo.repository.Author.AuthorRepository;
import com.booktracker.demo.repository.Book.BookRepository;
import com.booktracker.demo.repository.Genre.GenreRepository;
import com.booktracker.demo.repository.User.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Set;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(
            UserRepository userRepository,
            BookRepository bookRepository,
            AuthorRepository authorRepository,
            GenreRepository genreRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {
            // Evitar que se dupliquen los datos si la base de datos ya tiene información
            if (bookRepository.count() > 0 || genreRepository.count() > 0) {
                System.out.println("✅ La base de datos ya está poblada.");
                return;
            }

            System.out.println("⏳ Poblando la base de datos con datos iniciales...");

            // 1. Crear Géneros
            Genre fantasia = new Genre(); fantasia.setName("Fantasía");
            Genre scifi = new Genre(); scifi.setName("Ciencia Ficción");
            Genre terror = new Genre(); terror.setName("Terror");
            genreRepository.saveAll(List.of(fantasia, scifi, terror));

            // 2. Crear Autores
            Author sanderson = new Author(); sanderson.setName("Brandon Sanderson");
            Author asimov = new Author(); asimov.setName("Isaac Asimov");
            Author king = new Author(); king.setName("Stephen King");
            authorRepository.saveAll(List.of(sanderson, asimov, king));

            // 3. Crear Libros
            Book mistborn = new Book();
            mistborn.setName("El Imperio Final");
            mistborn.setDescription("Primer libro de la saga Nacidos de la Bruma.");
            mistborn.setTotalPages(688);
            mistborn.setPublisher("Nova");
            mistborn.setAuthors(Set.of(sanderson)); // Usa Set porque lo cambiamos en el paso anterior
            mistborn.setGenres(Set.of(fantasia));

            Book fundacion = new Book();
            fundacion.setName("Fundación");
            fundacion.setDescription("Clásico de la ciencia ficción que narra la caída del Imperio Galáctico.");
            fundacion.setTotalPages(255);
            fundacion.setPublisher("Debolsillo");
            fundacion.setAuthors(Set.of(asimov));
            fundacion.setGenres(Set.of(scifi));

            Book resplandor = new Book();
            resplandor.setName("El Resplandor");
            resplandor.setDescription("Jack Torrance acepta un empleo en un hotel aislado...");
            resplandor.setTotalPages(600);
            resplandor.setPublisher("Plaza & Janés");
            resplandor.setAuthors(Set.of(king));
            resplandor.setGenres(Set.of(terror));

            bookRepository.saveAll(List.of(mistborn, fundacion, resplandor));

            // 4. Crear un Usuario de Prueba para poder hacer Login
            if (userRepository.findByEmail("admin@booktracker.com").isEmpty()) {
                User testUser = new User();
                testUser.setUsername("Administrador");
                testUser.setEmail("admin@booktracker.com");
                // Es vital usar el PasswordEncoder, o el login fallará
                testUser.setPassword(passwordEncoder.encode("1234")); 
                userRepository.save(testUser);
            }

            System.out.println("✅ ¡Base de datos poblada con éxito!");
        };
    }
}