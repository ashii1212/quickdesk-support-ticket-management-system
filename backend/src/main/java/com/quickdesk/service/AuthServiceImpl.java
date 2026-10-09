package com.quickdesk.service;

import com.quickdesk.dto.AuthResponse;
import com.quickdesk.dto.LoginRequest;
import com.quickdesk.dto.RegisterRequest;
import com.quickdesk.exception.ResourceNotFoundException;
import com.quickdesk.model.User;
import com.quickdesk.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        boolean matches = BCrypt.checkpw(request.getPassword(), user.getPassword());
        if (!matches) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = "qd_auth_" + UUID.randomUUID().toString().replace("-", "");
        return new AuthResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                "Login successful"
        );
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(cleanEmail)) {
            throw new IllegalArgumentException("An account with this email already exists");
        }

        String hashedPassword = BCrypt.hashpw(request.getPassword(), BCrypt.gensalt(10));
        String role = (request.getRole() != null && !request.getRole().trim().isEmpty())
                ? request.getRole().trim().toUpperCase()
                : "SUPPORT_AGENT";

        User user = new User(request.getName().trim(), cleanEmail, hashedPassword, role);
        User saved = userRepository.save(user);

        String token = "qd_auth_" + UUID.randomUUID().toString().replace("-", "");
        return new AuthResponse(
                token,
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getRole(),
                "Account registered successfully"
        );
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        return new AuthResponse(
                null,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                "User profile found"
        );
    }
}
