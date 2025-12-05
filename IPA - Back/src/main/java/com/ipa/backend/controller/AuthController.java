package com.ipa.backend.controller;

import com.ipa.backend.config.JwtUtil;
import com.ipa.backend.dto.LoginDTO;
import com.ipa.backend.dto.LoginResponseDTO;
import com.ipa.backend.dto.UsuarioDTO;
import com.ipa.backend.model.Usuario;
import com.ipa.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario usuario = authService.registrarUsuario(usuarioDTO);
            return ResponseEntity.ok().body(new Response("Usuário cadastrado com sucesso!", usuario));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new Response(e.getMessage(), null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            Usuario usuario = authService.autenticarUsuario(loginDTO.getCpf(), loginDTO.getSenha());
            
            // 🔑 Gerar token JWT
            String token = jwtUtil.generateToken(usuario.getCpf());
            
            LoginResponseDTO response = new LoginResponseDTO(
                token,
                usuario,
                "Login realizado com sucesso"
            );
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new Response(e.getMessage(), null));
        }
    }

    // Classe auxiliar para respostas
    static class Response {
        private String message;
        private Object data;

        public Response(String message, Object data) {
            this.message = message;
            this.data = data;
        }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public Object getData() { return data; }
        public void setData(Object data) { this.data = data; }
    }
}