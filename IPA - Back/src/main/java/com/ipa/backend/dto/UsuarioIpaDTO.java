package com.ipa.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioIpaDTO {
  private Long id;
  private String nome;
  private String cpf;
  private String telefone;
  private String email;
  private String matriculaIpa;
  private String localAtuacao;
  private String senha;
  private String cidade;
  private String uf;
}