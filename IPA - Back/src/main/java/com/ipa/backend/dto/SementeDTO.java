package com.ipa.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SementeDTO {

    private Long id;
    private String nome;
    private String tipo;
    private String cultura;
    private String variedade;
    private String descricao;
    private Integer estoqueDisponivel;
    private String unidadeMedida;
    private BigDecimal pesoUnidade;
    private Boolean ativo;
    private String imagemUrl;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;
    private String observacoes;
}