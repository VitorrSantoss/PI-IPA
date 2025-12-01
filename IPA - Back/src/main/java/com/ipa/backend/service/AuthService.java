package com.ipa.backend.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ipa.backend.dto.LoginDTO;
import com.ipa.backend.dto.UsuarioIpaDTO;
import com.ipa.backend.model.UsuarioIpa;
import com.ipa.backend.repository.UsuarioIpaRepository;

@Service
public class AuthService {

    @Autowired
    private UsuarioIpaRepository usuarioIpaRepository;

    @Transactional
    public Map<String, Object> authenticate(LoginDTO loginDTO) {
        // Validação de entrada
        if (loginDTO.getCpf() == null || loginDTO.getCpf().trim().isEmpty()) {
            throw new RuntimeException("CPF é obrigatório");
        }

        if (loginDTO.getSenha() == null || loginDTO.getSenha().trim().isEmpty()) {
            throw new RuntimeException("Senha é obrigatória");
        }

        UsuarioIpa usuario = usuarioIpaRepository.findByCpf(loginDTO.getCpf())
                .orElseThrow(() -> new RuntimeException("CPF ou senha inválidos"));

        // Verificar senha (adicione verificação de hash em produção)
        if (!usuario.getSenha().equals(loginDTO.getSenha())) {
            throw new RuntimeException("CPF ou senha inválidos");
        }

        String token = UUID.randomUUID().toString();

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("usuario", convertToDTO(usuario));
        response.put("message", "Login realizado com sucesso!");

        return response;
    }

    @Transactional
    public UsuarioIpaDTO register(UsuarioIpaDTO usuarioDTO) {
        // Validações de entrada
        if (usuarioDTO.getNome() == null || usuarioDTO.getNome().trim().isEmpty()) {
            throw new RuntimeException("Nome é obrigatório");
        }

        if (usuarioDTO.getCpf() == null || usuarioDTO.getCpf().trim().isEmpty()) {
            throw new RuntimeException("CPF é obrigatório");
        }

        if (usuarioDTO.getSenha() == null || usuarioDTO.getSenha().length() < 6) {
            throw new RuntimeException("A senha deve ter no mínimo 6 caracteres");
        }

        if (usuarioDTO.getEmail() == null || usuarioDTO.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email é obrigatório");
        }

        if (usuarioDTO.getTelefone() == null || usuarioDTO.getTelefone().trim().isEmpty()) {
            throw new RuntimeException("Telefone é obrigatório");
        }

        // Verificar se CPF já existe
        if (usuarioIpaRepository.existsByCpf(usuarioDTO.getCpf())) {
            throw new RuntimeException("CPF já cadastrado no sistema");
        }

        // Verificar se email já existe
        if (usuarioDTO.getEmail() != null && !usuarioDTO.getEmail().isEmpty()) {
            if (usuarioIpaRepository.findByEmail(usuarioDTO.getEmail()).isPresent()) {
                throw new RuntimeException("Email já cadastrado no sistema");
            }
        }

        try {
            UsuarioIpa usuario = convertToEntity(usuarioDTO);
            UsuarioIpa usuarioSalvo = usuarioIpaRepository.save(usuario);

            return convertToDTO(usuarioSalvo);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao cadastrar usuário: " + e.getMessage());
        }
    }

    public boolean validateToken(String token) {
        return token != null && !token.isEmpty();
    }

    private UsuarioIpaDTO convertToDTO(UsuarioIpa usuario) {
        UsuarioIpaDTO dto = new UsuarioIpaDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setCpf(usuario.getCpf());
        dto.setEmail(usuario.getEmail());
        dto.setTelefone(usuario.getTelefone());
        dto.setMatriculaIpa(usuario.getMatriculaIpa());
        dto.setLocalAtuacao(usuario.getLocalAtuacao());
        dto.setCidade(usuario.getCidade());
        dto.setUf(usuario.getUf());
        return dto;
    }

    private UsuarioIpa convertToEntity(UsuarioIpaDTO dto) {
        UsuarioIpa usuario = new UsuarioIpa();
        usuario.setNome(dto.getNome());
        usuario.setCpf(dto.getCpf());
        usuario.setEmail(dto.getEmail());
        usuario.setTelefone(dto.getTelefone());
        usuario.setMatriculaIpa(dto.getMatriculaIpa());
        usuario.setLocalAtuacao(dto.getLocalAtuacao());
        usuario.setSenha(dto.getSenha()); // Em produção, fazer hash com BCrypt
        usuario.setCidade(dto.getCidade());
        usuario.setUf(dto.getUf());
        return usuario;
    }
}