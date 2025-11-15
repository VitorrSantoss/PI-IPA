package com.ipa.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Setter
@Getter
public class PedidoDTO {
    // Getters e Setters
    private Long id;
    private String numeroRastreio;
    private Long usuarioId;
    private String usuarioNome;
    private Long produtoId;
    private String produtoNome;
    private Integer quantidade;
    private BigDecimal valorTotal;
    private String status;
    private LocalDateTime dataPedido;
    private LocalDateTime dataEntrega;
    private String observacoes;

    // Construtores
    public PedidoDTO() {}

}