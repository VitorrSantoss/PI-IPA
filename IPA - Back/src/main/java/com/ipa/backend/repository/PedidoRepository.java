package com.ipa.backend.repository;

import com.ipa.backend.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    Optional<Pedido> findByNumeroRastreio(String numeroRastreio);
    List<Pedido> findByStatus(String status);
    List<Pedido> findByUsuarioId(Long usuarioId);
}