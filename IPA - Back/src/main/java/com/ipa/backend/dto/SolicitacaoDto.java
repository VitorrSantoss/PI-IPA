package com.ipa.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolicitacaoDto {

  private Long id;

  // IDs dos relacionamentos
  private Long solicitanteId;
  private Long beneficiarioId;

  // Dados do Solicitante
  private String solicitanteNome;
  private String solicitanteCpf;
  private String solicitanteMatricula;
  private String solicitanteTelefone;
  private String localAtuacao;

  // Dados do Beneficiário
  private String beneficiarioNome;
  private String beneficiarioCpf;
  private String beneficiarioCaf;
  private String tipoPropriedade;
  private String beneficiarioCep;
  private String beneficiarioComplemento;
  private String pontoReferencia;

  // Detalhes do Insumo
  private String tipoInsumo;
  private String cultura;
  private String variedade;
  private Integer quantidade;
  private String unidadeMedida;
  private BigDecimal areaPlantada;
  private String areaUnidade;
  private LocalDate dataIdealPlantio;
  private String finalidade;

  // Logística
  private String formaEntrega;
  private String municipioDestino;
  private String enderecoEntrega;
  private String cepEntrega;
  private String complementoEntrega;
  private String nomeDestinatario;
  private String telefoneDestinatario;

  // Controle
  private String status;
  private LocalDateTime dataCriacao;
  private LocalDateTime dataAtualizacao;
  private Long pedidoId;
  private String observacoes;
}