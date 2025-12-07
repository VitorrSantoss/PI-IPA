package com.ipa.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_sementes")
public class Semente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 50)
    private String tipo; // SEMENTE, MUDA, FERTILIZANTE, etc.

    @Column(nullable = false, length = 100)
    private String cultura; // Milho, Feijão, Tomate, etc.

    @Column(length = 100)
    private String variedade; // Variedade específica

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false)
    private Integer estoqueDisponivel;

    @Column(nullable = false, length = 20)
    private String unidadeMedida; // KG, UNIDADE, SACO, LITRO

    @Column
    private BigDecimal pesoUnidade; // Peso de cada unidade (kg)

    @Column(nullable = false)
    private Boolean ativo;

    @Column
    private String imagemUrl;

    @Column(name = "data_criacao", nullable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @PrePersist
    protected void onCreate() {
        this.dataCriacao = LocalDateTime.now();
        this.dataAtualizacao = LocalDateTime.now();
        if (this.ativo == null) {
            this.ativo = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.dataAtualizacao = LocalDateTime.now();
    }
}