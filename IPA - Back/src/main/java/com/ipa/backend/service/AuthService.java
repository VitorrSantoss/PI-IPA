package com.ipa.backend.service;

import com.ipa.backend.dto.LoginDTO;
import com.ipa.backend.dto.UsuarioIpaDTO;
import com.ipa.backend.model.UsuarioIpa;
import com.ipa.backend.repository.UsuarioIpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UsuarioIpaRepository usuarioIpaRepository;

    @Transactional
    public Map<String, Object> authenticate(LoginDTO loginDTO) {
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
        if (usuarioIpaRepository.existsByCpf(usuarioDTO.getCpf())) {
            throw new RuntimeException("CPF já cadastrado no sistema");
        }

        if (usuarioDTO.getEmail() != null && !usuarioDTO.getEmail().isEmpty()) {
            if (usuarioIpaRepository.findByEmail(usuarioDTO.getEmail()).isPresent()) {
                throw new RuntimeException("Email já cadastrado no sistema");
            }
        }

        UsuarioIpa usuario = convertToEntity(usuarioDTO);
        UsuarioIpa usuarioSalvo = usuarioIpaRepository.save(usuario);

        return convertToDTO(usuarioSalvo);
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