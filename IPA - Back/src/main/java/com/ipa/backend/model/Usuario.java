package com.ipa.backend.model;

import com.ipa.backend.constants.TipoPropriedade;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false)
    private String nome;

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "^\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$", message = "CPF deve estar no formato XXX.XXX.XXX-XX ou apenas números")
    @Column(nullable = false, unique = true, length = 14, name = "CPF")
    private String cpf;

    @Column(length = 9, name = "CadastroNacional")
    private String caf;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_propriedade")
    private TipoPropriedade tipoPropriedade; // Pode ser NULL no cadastro inicial

    @Column(length = 10)
    private String cep;

    @Email(message = "Email deve ser válido")
    @Column(unique = true)
    private String email;

    @Column(length = 2, name = "UF")
    private String estado;

    @Column
    private String telefone;

    @Column
    private String endereco;

    @Column
    private String cidade;

    /**
     * Método para limpar/formatar o CPF antes de salvar
     */
    @PrePersist
    @PreUpdate
    public void formatarCpf() {
        if (this.cpf != null) {
            // Remove pontos e traços, mantendo apenas números
            String cpfLimpo = this.cpf.replaceAll("[^0-9]", "");

            // Formata no padrão XXX.XXX.XXX-XX se tiver 11 dígitos
            if (cpfLimpo.length() == 11) {
                this.cpf = String.format("%s.%s.%s-%s",
                        cpfLimpo.substring(0, 3),
                        cpfLimpo.substring(3, 6),
                        cpfLimpo.substring(6, 9),
                        cpfLimpo.substring(9, 11));
            }
        }
    }
}