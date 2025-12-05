package com.ipa.backend.service;

import com.ipa.backend.dto.UsuarioIpaDTO;
import com.ipa.backend.model.UsuarioIpa;
import com.ipa.backend.repository.UsuarioIpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioIpaRepository usuarioIpaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Registrar novo usuário IPA
     */
    public UsuarioIpa registrarUsuario(UsuarioIpaDTO usuarioDTO) {
        // Limpar CPF (remover formatação)
        String cpfLimpo = usuarioDTO.getCpf().replaceAll("[^0-9]", "");
        
        // Verificar se CPF já existe
        if (usuarioIpaRepository.findByCpf(cpfLimpo).isPresent()) {
            throw new RuntimeException("CPF já cadastrado");
        }

        // Verificar se email já existe
        if (usuarioDTO.getEmail() != null && usuarioIpaRepository.findByEmail(usuarioDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }

        // Criar novo usuário
        UsuarioIpa usuario = new UsuarioIpa();
        usuario.setNome(usuarioDTO.getNome());
        usuario.setCpf(cpfLimpo); // CPF limpo (11 dígitos)
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setTelefone(usuarioDTO.getTelefone());
        usuario.setMatriculaIpa(usuarioDTO.getMatriculaIpa());
        usuario.setLocalAtuacao(usuarioDTO.getLocalAtuacao());
        usuario.setCidade(usuarioDTO.getCidade());
        usuario.setUf(usuarioDTO.getUf());
        
        // Criptografar senha
        usuario.setSenha(passwordEncoder.encode(usuarioDTO.getSenha()));

        // Salvar no banco
        return usuarioIpaRepository.save(usuario);
    }

    /**
     * Autenticar usuário (login)
     */
    public UsuarioIpa autenticarUsuario(String cpf, String senha) {
        // Limpar CPF
        String cpfLimpo = cpf.replaceAll("[^0-9]", "");
        
        // Buscar usuário por CPF
        UsuarioIpa usuario = usuarioIpaRepository.findByCpf(cpfLimpo)
                .orElseThrow(() -> new RuntimeException("CPF ou senha incorretos"));

        // Verificar senha
        if (!passwordEncoder.matches(senha, usuario.getSenha())) {
            throw new RuntimeException("CPF ou senha incorretos");
        }

        return usuario;
    }

    /**
     * Buscar usuário por CPF
     */
    public UsuarioIpa buscarPorCpf(String cpf) {
        String cpfLimpo = cpf.replaceAll("[^0-9]", "");
        return usuarioIpaRepository.findByCpf(cpfLimpo)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    /**
     * Verificar se CPF existe
     */
    public boolean cpfExiste(String cpf) {
        String cpfLimpo = cpf.replaceAll("[^0-9]", "");
        return usuarioIpaRepository.findByCpf(cpfLimpo).isPresent();
    }

    /**
     * Verificar se email existe
     */
    public boolean emailExiste(String email) {
        return usuarioIpaRepository.findByEmail(email).isPresent();
    }
}