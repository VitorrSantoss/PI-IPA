package com.ipa.backend.controller;

import com.ipa.backend.config.JwtUtil;
import com.ipa.backend.dto.LoginDTO;
import com.ipa.backend.dto.LoginResponseDTO;
import com.ipa.backend.dto.UsuarioIpaDTO;
import com.ipa.backend.model.UsuarioIpa;
import com.ipa.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UsuarioIpaDTO usuarioDTO) {
        System.out.println("📝 Tentativa de registro - CPF: " + usuarioDTO.getCpf());
        
        try {
            UsuarioIpa usuario = authService.registrarUsuario(usuarioDTO);
            System.out.println("✅ Usuário registrado: " + usuario.getNome());
            return ResponseEntity.ok().body(new Response("Usuário cadastrado com sucesso!", usuario));
        } catch (Exception e) {
            System.out.println("❌ Erro no registro: " + e.getMessage());
            return ResponseEntity.badRequest().body(new Response(e.getMessage(), null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        System.out.println("🔐 Tentativa de login - CPF: " + loginDTO.getCpf());
        
        try {
            UsuarioIpa usuario = authService.autenticarUsuario(loginDTO.getCpf(), loginDTO.getSenha());
            
            System.out.println("✅ Usuário autenticado: " + usuario.getNome());
            
            // 🔑 Gerar token JWT
            String token = jwtUtil.generateToken(usuario.getCpf());
            System.out.println("🎫 Token gerado: " + token.substring(0, 20) + "...");
            
            LoginResponseDTO response = new LoginResponseDTO(
                token,
                usuario,
                "Login realizado com sucesso"
            );
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("❌ Erro na autenticação: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(401).body(new Response(e.getMessage(), null));
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok().body(new Response("API Auth funcionando!", null));
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