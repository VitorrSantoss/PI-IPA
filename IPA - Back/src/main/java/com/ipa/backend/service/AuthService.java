package com.ipa.backend.service;

import com.ipa.backend.dto.UsuarioDTO;
import com.ipa.backend.model.Usuario;
import com.ipa.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Registrar novo usuário
     */
    public Usuario registrarUsuario(UsuarioDTO usuarioDTO) {
        // Verificar se CPF já existe
        if (usuarioRepository.findByCpf(usuarioDTO.getCpf()).isPresent()) {
            throw new RuntimeException("CPF já cadastrado");
        }

        // Verificar se email já existe
        if (usuarioRepository.findByEmail(usuarioDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }

        // Criar novo usuário
        Usuario usuario = new Usuario();
        usuario.setNome(usuarioDTO.getNome());
        usuario.setCpf(usuarioDTO.getCpf());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setTelefone(usuarioDTO.getTelefone());
        usuario.setMatriculaIpa(usuarioDTO.getMatriculaIpa());
        usuario.setLocalAtuacao(usuarioDTO.getLocalAtuacao());
        usuario.setCidade(usuarioDTO.getCidade());
        usuario.setUf(usuarioDTO.getUf());
        
        // Criptografar senha
        usuario.setSenha(passwordEncoder.encode(usuarioDTO.getSenha()));

        // Salvar no banco
        return usuarioRepository.save(usuario);
    }

    /**
     * Autenticar usuário (login)
     */
    public Usuario autenticarUsuario(String cpf, String senha) {
        // Buscar usuário por CPF
        Usuario usuario = usuarioRepository.findByCpf(cpf)
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
    public Usuario buscarPorCpf(String cpf) {
        return usuarioRepository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    /**
     * Verificar se CPF existe
     */
    public boolean cpfExiste(String cpf) {
        return usuarioRepository.findByCpf(cpf).isPresent();
    }

    /**
     * Verificar se email existe
     */
    public boolean emailExiste(String email) {
        return usuarioRepository.findByEmail(email).isPresent();
    }
}