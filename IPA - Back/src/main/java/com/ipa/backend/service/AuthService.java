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
    
    System.out.println("=================================");
    System.out.println("🔐 AUTENTICAÇÃO");
    System.out.println("📥 CPF recebido: [" + cpf + "]");
    System.out.println("🧹 CPF limpo: [" + cpfLimpo + "]");
    System.out.println("🔑 Senha recebida: [" + senha + "]");
    System.out.println("=================================");
    
    // Buscar usuário por CPF
    UsuarioIpa usuario = usuarioIpaRepository.findByCpf(cpfLimpo)
            .orElseThrow(() -> {
                System.out.println("❌ ERRO: Usuário não encontrado com CPF: [" + cpfLimpo + "]");
                return new RuntimeException("CPF ou senha incorretos");
            });

    System.out.println("✅ Usuário encontrado!");
    System.out.println("👤 Nome: " + usuario.getNome());
    System.out.println("📧 Email: " + usuario.getEmail());
    System.out.println("🔑 Senha no banco: [" + usuario.getSenha() + "]"); // ✅ Mostrar senha completa
    System.out.println("🔑 Tamanho da senha no banco: " + usuario.getSenha().length() + " chars");

    // Verificar se a senha está criptografada
    boolean isSenhaCriptografada = usuario.getSenha().startsWith("$2a$") || usuario.getSenha().startsWith("$2b$");
    System.out.println("🔒 Senha está criptografada com BCrypt? " + isSenhaCriptografada);

    // Verificar senha
    if (isSenhaCriptografada) {
        System.out.println("🔒 Verificando com BCrypt...");
        boolean senhaCorreta = passwordEncoder.matches(senha, usuario.getSenha());
        System.out.println("🔒 Resultado: " + (senhaCorreta ? "✅ SENHA CORRETA" : "❌ SENHA INCORRETA"));
        
        if (!senhaCorreta) {
            throw new RuntimeException("CPF ou senha incorretos");
        }
    } else {
        System.out.println("⚠️ Comparação direta (senha em texto plano)");
        System.out.println("🔍 Senha banco: [" + usuario.getSenha() + "]");
        System.out.println("🔍 Senha digitada: [" + senha + "]");
        boolean senhaCorreta = usuario.getSenha().equals(senha);
        System.out.println("🔍 Resultado: " + (senhaCorreta ? "✅ SENHA CORRETA" : "❌ SENHA INCORRETA"));
        
        if (!senhaCorreta) {
            throw new RuntimeException("CPF ou senha incorretos");
        }
    }

    System.out.println("✅ AUTENTICAÇÃO BEM-SUCEDIDA!");
    System.out.println("=================================");

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