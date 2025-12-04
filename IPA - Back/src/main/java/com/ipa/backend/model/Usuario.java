package com.ipa.backend.model;

import com.ipa.backend.constants.TipoPropriedade;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    // ✅ Removida validação @CPF para permitir criação automática
    @Column(nullable = false, unique = true, length = 14, name = "CPF")
    private String cpf;

    @Column(length = 9, name = "CadastroNacional")
    private String caf;

    @Enumerated(EnumType.STRING)
    private TipoPropriedade tipoPropriedade;

    @Column(length = 10)
    private String cep;

    @Email
    @Column(unique = true)
    private String email;

    @Column(length = 2, name = "UF")
    private String estado;

}