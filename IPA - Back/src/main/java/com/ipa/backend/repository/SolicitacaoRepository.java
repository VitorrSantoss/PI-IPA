package com.ipa.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ipa.backend.model.Solicitacao;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

  List<Solicitacao> findByStatus(String status);

  List<Solicitacao> findBySolicitanteCpf(String cpf);

  List<Solicitacao> findByBeneficiarioCpf(String cpf);

  Optional<Solicitacao> findByPedidoId(Long pedidoId);

  List<Solicitacao> findByStatusOrderByDataCriacaoDesc(String status);

  // ✅ NOVO: Buscar por código de rastreio
  Optional<Solicitacao> findByCodigoRastreio(String codigoRastreio);
}