package com.ipa.backend.repository;

import com.ipa.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // ✅ Método correto - retorna Optional<Usuario>
    Optional<Usuario> findByCpf(String cpf);

    // Método adicional para verificar existência
    boolean existsByCpf(String cpf);

    // Método para buscar por email
    Optional<Usuario> findByEmail(String email);
}