package com.ipa.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_usuarios_ipa")
public class UsuarioIpa {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 150, nullable = false)
  private String nome;

  // ✅ Removida validação @CPF para permitir criação automática
  @Column(nullable = false, unique = true, length = 14)
  private String cpf;

  @Column(length = 20)
  private String telefone;

  @Column(unique = true)
  private String email;

  @Column(length = 20)
  private String matriculaIpa;

  @Column
  private String localAtuacao;

  @Column(nullable = false)
  private String senha;

  @Column
  private String cidade;

  @Column(length = 2)
  private String uf;
}