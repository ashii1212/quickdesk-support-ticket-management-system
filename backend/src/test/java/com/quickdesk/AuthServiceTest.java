package com.quickdesk;

import com.quickdesk.dto.AuthResponse;
import com.quickdesk.dto.LoginRequest;
import com.quickdesk.dto.RegisterRequest;
import com.quickdesk.model.User;
import com.quickdesk.repository.UserRepository;
import com.quickdesk.service.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthServiceImpl authService;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        String hashedPassword = BCrypt.hashpw("secret123", BCrypt.gensalt(10));
        sampleUser = new User("Jane Agent", "jane@quickdesk.com", hashedPassword, "SUPPORT_AGENT");
        sampleUser.setId(10L);
    }

    @Test
    void testLogin_Success() {
        when(userRepository.findByEmail("jane@quickdesk.com")).thenReturn(Optional.of(sampleUser));

        LoginRequest request = new LoginRequest("jane@quickdesk.com", "secret123");
        AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals("Jane Agent", response.getName());
        assertEquals("jane@quickdesk.com", response.getEmail());
        assertEquals("SUPPORT_AGENT", response.getRole());
    }

    @Test
    void testLogin_InvalidPassword_ThrowsException() {
        when(userRepository.findByEmail("jane@quickdesk.com")).thenReturn(Optional.of(sampleUser));

        LoginRequest request = new LoginRequest("jane@quickdesk.com", "wrongpassword");
        assertThrows(IllegalArgumentException.class, () -> authService.login(request));
    }

    @Test
    void testRegister_Success() {
        when(userRepository.existsByEmail("new@quickdesk.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setId(11L);
            return u;
        });

        RegisterRequest request = new RegisterRequest("New User", "new@quickdesk.com", "password123", "ADMIN");
        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals("New User", response.getName());
        assertEquals("ADMIN", response.getRole());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testRegister_DuplicateEmail_ThrowsException() {
        when(userRepository.existsByEmail("jane@quickdesk.com")).thenReturn(true);

        RegisterRequest request = new RegisterRequest("Jane Copy", "jane@quickdesk.com", "password123", "SUPPORT_AGENT");
        assertThrows(IllegalArgumentException.class, () -> authService.register(request));
    }
}
