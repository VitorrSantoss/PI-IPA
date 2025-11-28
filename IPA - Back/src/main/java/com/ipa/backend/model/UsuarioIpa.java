package com.ipa.backend.model;

import org.hibernate.validator.constraints.br.CPF;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tb_usuarios_ipa")
public class UsuarioIpa {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 150)
  private String nome;

  @CPF
  @Column
  private String cpf;

  @Column(length = 20)
  private String telefone;

  @Column
  private String email;

  @Column(length = 9)
  private String matriculaIpa;

  @Column
  private String localAtuacao;

  @Column(nullable = false)
  private String senha; // Em produção, fazer hash com BCrypt

  @Column
  private String cidade;

  @Column(nullable = false, name = "UF")
  private String uf;


}
