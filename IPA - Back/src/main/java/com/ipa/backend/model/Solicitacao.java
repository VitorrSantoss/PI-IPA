package com.ipa.backend.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tb_solicitacoes")
public class Solicitacao {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // ===== RELACIONAMENTOS COM USUÁRIOS =====

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "solicitante_id", nullable = false)
  private Usuario solicitante;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "beneficiario_id", nullable = false)
  private Usuario beneficiario;

  // ===== DADOS DO USUÁRIO SOLICITANTE (mantidos para compatibilidade) =====
  @Column(name = "solicitante_nome", nullable = false)
  private String solicitanteNome;

  @Column(name = "solicitante_cpf", nullable = false, length = 14)
  private String solicitanteCpf;

  @Column(name = "solicitante_matricula")
  private String solicitanteMatricula;

  @Column(name = "solicitante_telefone", length = 20)
  private String solicitanteTelefone;

  @Column(name = "local_atuacao")
  private String localAtuacao;

  // ===== DADOS DO AGRICULTOR BENEFICIADO (mantidos para compatibilidade) =====
  @Column(name = "beneficiario_nome", nullable = false)
  private String beneficiarioNome;

  @Column(name = "beneficiario_cpf", nullable = false, length = 14)
  private String beneficiarioCpf;

  @Column(name = "beneficiario_caf", length = 20)
  private String beneficiarioCaf;

  @Column(name = "tipo_propriedade")
  private String tipoPropriedade;

  @Column(name = "beneficiario_cep", length = 10)
  private String beneficiarioCep;

  @Column(name = "beneficiario_complemento")
  private String beneficiarioComplemento;

  @Column(name = "ponto_referencia")
  private String pontoReferencia;

  // ===== DETALHES DO INSUMO =====
  @Column(name = "tipo_insumo", nullable = false)
  private String tipoInsumo;

  @Column(name = "cultura", nullable = false)
  private String cultura;

  @Column(name = "variedade")
  private String variedade;

  @Column(nullable = false)
  private Integer quantidade;

  @Column(name = "unidade_medida", nullable = false)
  private String unidadeMedida;

  @Column(name = "area_plantada")
  private BigDecimal areaPlantada;

  @Column(name = "area_unidade")
  private String areaUnidade;

  @Column(name = "data_ideal_plantio")
  private LocalDate dataIdealPlantio;

  @Column(nullable = false)
  private String finalidade;

  // ===== LOGÍSTICA =====
  @Column(name = "forma_entrega", nullable = false)
  private String formaEntrega;

  @Column(name = "municipio_destino")
  private String municipioDestino;

  @Column(name = "endereco_entrega")
  private String enderecoEntrega;

  @Column(name = "cep_entrega", length = 10)
  private String cepEntrega;

  @Column(name = "complemento_entrega")
  private String complementoEntrega;

  @Column(name = "nome_destinatario")
  private String nomeDestinatario;

  @Column(name = "telefone_destinatario", length = 20)
  private String telefoneDestinatario;

  // ===== CONTROLE =====
  @Column(nullable = false)
  private String status;

  @Column(name = "data_criacao", nullable = false)
  private LocalDateTime dataCriacao;

  @Column(name = "data_atualizacao")
  private LocalDateTime dataAtualizacao;

  @Column(name = "pedido_id")
  private Long pedidoId;

  @Column(columnDefinition = "TEXT")
  private String observacoes;

  @PrePersist
  protected void onCreate() {
    this.dataCriacao = LocalDateTime.now();
    this.dataAtualizacao = LocalDateTime.now();
    if (this.status == null) {
      this.status = "RASCUNHO";
    }

    // Sincronizar dados do solicitante
    if (this.solicitante != null) {
      this.solicitanteNome = this.solicitante.getNome();
      this.solicitanteCpf = this.solicitante.getCpf();
    }

    // Sincronizar dados do beneficiário
    if (this.beneficiario != null) {
      this.beneficiarioNome = this.beneficiario.getNome();
      this.beneficiarioCpf = this.beneficiario.getCpf();
      this.beneficiarioCep = this.beneficiario.getCep();
    }
  }

  @PreUpdate
  protected void onUpdate() {
    this.dataAtualizacao = LocalDateTime.now();
  }
}