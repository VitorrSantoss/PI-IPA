package com.ipa.backend.repository;

<<<<<<< HEAD
import com.ipa.backend.model.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {
    
    List<Solicitacao> findByStatus(String status);
    
    List<Solicitacao> findBySolicitanteCpf(String cpf);
    
    List<Solicitacao> findByBeneficiarioCpf(String cpf);
    
    Optional<Solicitacao> findByPedidoId(Long pedidoId);
    
    List<Solicitacao> findByStatusOrderByDataCriacaoDesc(String status);
=======
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
>>>>>>> 232c1ce1c3cee1cf103803aeb1c985ffe18f40e3
}
