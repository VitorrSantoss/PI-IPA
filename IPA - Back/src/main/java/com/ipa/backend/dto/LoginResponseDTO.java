package com.ipa.backend.dto;

import com.ipa.backend.model.UsuarioIpa;

public class LoginResponseDTO {
    
    private String token;
    private UsuarioIpa usuario;
    private String message;

    public LoginResponseDTO() {}

    public LoginResponseDTO(String token, UsuarioIpa usuario, String message) {
        this.token = token;
        this.usuario = usuario;
        this.message = message;
    }

    // Getters e Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UsuarioIpa getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioIpa usuario) {
        this.usuario = usuario;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}