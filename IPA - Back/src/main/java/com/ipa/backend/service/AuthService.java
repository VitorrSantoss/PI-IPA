package com.ipa.backend.service;

import com.ipa.backend.dto.LoginDTO;
import com.ipa.backend.dto.UsuarioDTO;
import com.ipa.backend.model.Usuario;
import com.ipa.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Transactional
    public Map<String, Object> authenticate(LoginDTO loginDTO) {
        // Buscar usuário por CPF
        Usuario usuario = usuarioRepository.findByCpf(loginDTO.getCpf())
                .orElseThrow(() -> new RuntimeException("CPF ou senha inválidos"));

        // Verificar senha (em produção, usar BCrypt)
        if (!loginDTO.getSenha().equals(usuario.getSenha())) {
            throw new RuntimeException("CPF ou senha inválidos");
        }

        // Gerar token simples (em produção, usar JWT)
        String token = UUID.randomUUID().toString();

        // Preparar resposta
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("usuario", convertToDTO(usuario));
        response.put("message", "Login realizado com sucesso!");

        return response;
    }

    @Transactional
    public UsuarioDTO register(UsuarioDTO usuarioDTO) {
        // Verificar se CPF já existe
        if (usuarioRepository.existsByCpf(usuarioDTO.getCpf())) {
            throw new RuntimeException("CPF já cadastrado no sistema");
        }

        // Verificar se email já existe
        if (usuarioDTO.getEmail() != null && !usuarioDTO.getEmail().isEmpty()) {
            if (usuarioRepository.findByEmail(usuarioDTO.getEmail()).isPresent()) {
                throw new RuntimeException("Email já cadastrado no sistema");
            }
        }

        // Validar senha
        if (usuarioDTO.getSenha() == null || usuarioDTO.getSenha().length() < 6) {
            throw new RuntimeException("A senha deve ter no mínimo 6 caracteres");
        }

        // Criar usuário
        Usuario usuario = convertToEntity(usuarioDTO);
        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        return convertToDTO(usuarioSalvo);
    }

    public boolean validateToken(String token) {
        // Em produção, implementar validação JWT real
        return token != null && !token.isEmpty();
    }

    private UsuarioDTO convertToDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setCpf(usuario.getCpf());
        dto.setTelefone(usuario.getTelefone());
        dto.setEmail(usuario.getEmail());
        dto.setEndereco(usuario.getEndereco());
        dto.setCidade(usuario.getCidade());
        dto.setEstado(usuario.getEstado());
        dto.setCep(usuario.getCep());
        // Não retornar senha no DTO
        return dto;
    }

    private Usuario convertToEntity(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setCpf(dto.getCpf());
        usuario.setSenha(dto.getSenha()); // Em produção, fazer hash com BCrypt
        usuario.setTelefone(dto.getTelefone());
        usuario.setEmail(dto.getEmail());
        usuario.setEndereco(dto.getEndereco());
        usuario.setCidade(dto.getCidade());
        usuario.setEstado(dto.getEstado());
        usuario.setCep(dto.getCep());
        return usuario;
    }
}