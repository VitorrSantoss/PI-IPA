package com.ipa.backend.repository;

import com.ipa.backend.model.UsuarioIpa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioIpaRepository extends JpaRepository<UsuarioIpa, Long> {
  Optional<UsuarioIpa> findByCpf(String cpf);

  boolean existsByCpf(String cpf);

  Optional<UsuarioIpa> findByEmail(String email);
}