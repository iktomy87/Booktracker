package com.booktracker.demo.service.User;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.booktracker.demo.model.User;
import com.booktracker.demo.repository.User.UserRepository;
import com.booktracker.demo.service.Jwt.EmailService;


@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }
}