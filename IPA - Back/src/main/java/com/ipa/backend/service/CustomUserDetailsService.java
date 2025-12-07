package com.ipa.backend.service;

import com.ipa.backend.model.UsuarioIpa;
import com.ipa.backend.repository.UsuarioIpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioIpaRepository usuarioIpaRepository;

    @Override
    public UserDetails loadUserByUsername(String cpf) throws UsernameNotFoundException {
        // Limpar CPF
        String cpfLimpo = cpf.replaceAll("[^0-9]", "");
        System.out.println("🔍 CustomUserDetailsService - Buscando CPF: " + cpfLimpo);
        
        UsuarioIpa usuario = usuarioIpaRepository.findByCpf(cpfLimpo)
                .orElseThrow(() -> {
                    System.out.println("❌ Usuário não encontrado: " + cpfLimpo);
                    return new UsernameNotFoundException("Usuário não encontrado: " + cpf);
                });

        System.out.println("✅ Usuário carregado: " + usuario.getNome());

        return new User(
                usuario.getCpf(),
                usuario.getSenha(),
                new ArrayList<>() // Authorities vazias
        );
    }
}