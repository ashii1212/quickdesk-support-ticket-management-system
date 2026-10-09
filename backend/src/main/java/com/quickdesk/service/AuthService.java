package com.quickdesk.service;

import com.quickdesk.dto.AuthResponse;
import com.quickdesk.dto.LoginRequest;
import com.quickdesk.dto.RegisterRequest;

public interface AuthService {

    AuthResponse login(LoginRequest request);

    AuthResponse register(RegisterRequest request);

    AuthResponse getUserById(Long id);
}
