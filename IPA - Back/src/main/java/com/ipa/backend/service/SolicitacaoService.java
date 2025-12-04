package com.ipa.backend.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ipa.backend.dto.SolicitacaoDto;
import com.ipa.backend.dto.SolicitacaoDto;
import com.ipa.backend.model.Solicitacao;
import com.ipa.backend.model.Usuario;
import com.ipa.backend.model.UsuarioIpa;
import com.ipa.backend.repository.SolicitacaoRepository;
import com.ipa.backend.repository.UsuarioRepository;
import com.ipa.backend.repository.UsuarioIpaRepository;

import jakarta.transaction.Transactional;

@Service
public class SolicitacaoService {

  @Autowired
  private SolicitacaoRepository solicitacaoRepository;

  @Autowired
  private UsuarioIpaRepository usuarioIpaRepository;

  @Autowired
  private UsuarioRepository usuarioRepository;

  private static final String CARACTERES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  private static final SecureRandom random = new SecureRandom();

  public List<SolicitacaoDto> listarTodas() {
    return solicitacaoRepository.findAll()
        .stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());
  }

  public List<SolicitacaoDto> listarPorStatus(String status) {
    return solicitacaoRepository.findByStatus(status)
        .stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());
  }

  public SolicitacaoDto buscarPorId(Long id) {
    Solicitacao solicitacao = solicitacaoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
    return convertToDTO(solicitacao);
  }

  public List<SolicitacaoDto> buscarPorSolicitante(String cpf) {
    return solicitacaoRepository.findBySolicitanteCpf(cpf)
        .stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());
  }

  /**
   * 🔍 NOVO: Buscar solicitação por código de rastreio
   */
  public SolicitacaoDto buscarPorCodigoRastreio(String codigoRastreio) {
    Solicitacao solicitacao = solicitacaoRepository.findByCodigoRastreio(codigoRastreio)
        .orElseThrow(() -> new RuntimeException("Solicitação não encontrada com o código: " + codigoRastreio));
    return convertToDTO(solicitacao);
  }

  @Transactional
  public SolicitacaoDto criar(SolicitacaoDto dto) {
    // Buscar ou criar UsuarioIpa (solicitante)
    UsuarioIpa solicitante = buscarOuCriarUsuarioIpa(dto);

    // Buscar ou criar Usuario (beneficiário)
    Usuario beneficiario = buscarOuCriarUsuario(dto);

    // Criar solicitação
    Solicitacao solicitacao = convertToEntity(dto);
    solicitacao.setSolicitante(solicitante);
    solicitacao.setBeneficiario(beneficiario);

    // ✅ NOVO: Gerar código de rastreio único automaticamente
    solicitacao.setCodigoRastreio(gerarCodigoRastreioUnico());

    Solicitacao salva = solicitacaoRepository.save(solicitacao);
    return convertToDTO(salva);
  }

  @Transactional
  public SolicitacaoDto atualizar(Long id, SolicitacaoDto dto) {
    Solicitacao solicitacao = solicitacaoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

    // Atualizar relacionamentos se necessário
    if (dto.getSolicitanteCpf() != null) {
      UsuarioIpa solicitante = buscarOuCriarUsuarioIpa(dto);
      solicitacao.setSolicitante(solicitante);
    }

    if (dto.getBeneficiarioCpf() != null) {
      Usuario beneficiario = buscarOuCriarUsuario(dto);
      solicitacao.setBeneficiario(beneficiario);
    }

    atualizarDados(solicitacao, dto);

    Solicitacao atualizada = solicitacaoRepository.save(solicitacao);
    return convertToDTO(atualizada);
  }

  @Transactional
  public SolicitacaoDto atualizarStatus(Long id, String novoStatus) {
    Solicitacao solicitacao = solicitacaoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

    solicitacao.setStatus(novoStatus);

    Solicitacao atualizada = solicitacaoRepository.save(solicitacao);
    return convertToDTO(atualizada);
  }

  @Transactional
  public void deletar(Long id) {
    if (!solicitacaoRepository.existsById(id)) {
      throw new RuntimeException("Solicitação não encontrada");
    }
    solicitacaoRepository.deleteById(id);
  }

  // ===== MÉTODOS DE GERAÇÃO DE CÓDIGO =====

  /**
   * Gera um código de rastreio único no formato: SAFRA-2025-XXXXXXXX
   */
  private String gerarCodigoRastreioUnico() {
    String codigo;
    int tentativas = 0;
    int maxTentativas = 10;

    do {
      codigo = gerarCodigoRastreio();
      tentativas++;

      if (tentativas >= maxTentativas) {
        throw new RuntimeException("Erro ao gerar código de rastreio único. Tente novamente.");
      }

    } while (solicitacaoRepository.findByCodigoRastreio(codigo).isPresent());

    return codigo;
  }

  /**
   * Gera o código no formato: SAFRA-2025-XXXXXXXX
   */
  private String gerarCodigoRastreio() {
    int ano = LocalDateTime.now().getYear();
    StringBuilder codigo = new StringBuilder("SAFRA-");
    codigo.append(ano).append("-");

    // Gerar 8 caracteres alfanuméricos aleatórios
    for (int i = 0; i < 8; i++) {
      int index = random.nextInt(CARACTERES.length());
      codigo.append(CARACTERES.charAt(index));
    }

    return codigo.toString();
  }

  // ===== MÉTODOS AUXILIARES =====

  private UsuarioIpa buscarOuCriarUsuarioIpa(SolicitacaoDto dto) {
    return usuarioIpaRepository.findByCpf(dto.getSolicitanteCpf())
        .orElseGet(() -> {
          UsuarioIpa novo = new UsuarioIpa();
          novo.setNome(dto.getSolicitanteNome());
          novo.setCpf(dto.getSolicitanteCpf());
          novo.setTelefone(dto.getSolicitanteTelefone());
          novo.setMatriculaIpa(dto.getSolicitanteMatricula());
          novo.setLocalAtuacao(dto.getLocalAtuacao());
          novo.setSenha("senha123"); // Senha padrão - deve ser alterada
          return usuarioIpaRepository.save(novo);
        });
  }

  private Usuario buscarOuCriarUsuario(SolicitacaoDto dto) {
    return usuarioRepository.findByCpf(dto.getBeneficiarioCpf())
        .orElseGet(() -> {
          Usuario novo = new Usuario();
          novo.setNome(dto.getBeneficiarioNome());
          novo.setCpf(dto.getBeneficiarioCpf());
          novo.setCep(dto.getBeneficiarioCep());
          novo.setCaf(dto.getBeneficiarioCaf());
          // Converter String para Enum
          try {
            novo.setTipoPropriedade(
                com.ipa.backend.constants.TipoPropriedade.valueOf(dto.getTipoPropriedade()));
          } catch (Exception e) {
            novo.setTipoPropriedade(com.ipa.backend.constants.TipoPropriedade.SITIO);
          }
          return usuarioRepository.save(novo);
        });
  }

  // ===== CONVERSÕES =====

  private SolicitacaoDto convertToDTO(Solicitacao solicitacao) {
    SolicitacaoDto dto = new SolicitacaoDto();

    dto.setId(solicitacao.getId());

    // IDs dos relacionamentos
    if (solicitacao.getSolicitante() != null) {
      dto.setSolicitanteId(solicitacao.getSolicitante().getId());
    }
    if (solicitacao.getBeneficiario() != null) {
      dto.setBeneficiarioId(solicitacao.getBeneficiario().getId());
    }

    // Solicitante
    dto.setSolicitanteNome(solicitacao.getSolicitanteNome());
    dto.setSolicitanteCpf(solicitacao.getSolicitanteCpf());
    dto.setSolicitanteMatricula(solicitacao.getSolicitanteMatricula());
    dto.setSolicitanteTelefone(solicitacao.getSolicitanteTelefone());
    dto.setLocalAtuacao(solicitacao.getLocalAtuacao());

    // Beneficiário
    dto.setBeneficiarioNome(solicitacao.getBeneficiarioNome());
    dto.setBeneficiarioCpf(solicitacao.getBeneficiarioCpf());
    dto.setBeneficiarioCaf(solicitacao.getBeneficiarioCaf());
    dto.setTipoPropriedade(solicitacao.getTipoPropriedade());
    dto.setBeneficiarioCep(solicitacao.getBeneficiarioCep());
    dto.setBeneficiarioComplemento(solicitacao.getBeneficiarioComplemento());
    dto.setPontoReferencia(solicitacao.getPontoReferencia());

    // Insumo
    dto.setTipoInsumo(solicitacao.getTipoInsumo());
    dto.setCultura(solicitacao.getCultura());
    dto.setVariedade(solicitacao.getVariedade());
    dto.setQuantidade(solicitacao.getQuantidade());
    dto.setUnidadeMedida(solicitacao.getUnidadeMedida());
    dto.setAreaPlantada(solicitacao.getAreaPlantada());
    dto.setAreaUnidade(solicitacao.getAreaUnidade());
    dto.setDataIdealPlantio(solicitacao.getDataIdealPlantio());
    dto.setFinalidade(solicitacao.getFinalidade());

    // Logística
    dto.setFormaEntrega(solicitacao.getFormaEntrega());
    dto.setMunicipioDestino(solicitacao.getMunicipioDestino());
    dto.setEnderecoEntrega(solicitacao.getEnderecoEntrega());
    dto.setCepEntrega(solicitacao.getCepEntrega());
    dto.setComplementoEntrega(solicitacao.getComplementoEntrega());
    dto.setNomeDestinatario(solicitacao.getNomeDestinatario());
    dto.setTelefoneDestinatario(solicitacao.getTelefoneDestinatario());

    // Controle
    dto.setStatus(solicitacao.getStatus());
    dto.setDataCriacao(solicitacao.getDataCriacao());
    dto.setDataAtualizacao(solicitacao.getDataAtualizacao());
    dto.setPedidoId(solicitacao.getPedidoId());
    dto.setCodigoRastreio(solicitacao.getCodigoRastreio()); // ✅ NOVO
    dto.setObservacoes(solicitacao.getObservacoes());

    return dto;
  }

  private Solicitacao convertToEntity(SolicitacaoDto dto) {
    Solicitacao solicitacao = new Solicitacao();
    atualizarDados(solicitacao, dto);
    return solicitacao;
  }

  private void atualizarDados(Solicitacao solicitacao, SolicitacaoDto dto) {
    // Insumo
    solicitacao.setTipoInsumo(dto.getTipoInsumo());
    solicitacao.setCultura(dto.getCultura());
    solicitacao.setVariedade(dto.getVariedade());
    solicitacao.setQuantidade(dto.getQuantidade());
    solicitacao.setUnidadeMedida(dto.getUnidadeMedida());
    solicitacao.setAreaPlantada(dto.getAreaPlantada());
    solicitacao.setAreaUnidade(dto.getAreaUnidade());
    solicitacao.setDataIdealPlantio(dto.getDataIdealPlantio());
    solicitacao.setFinalidade(dto.getFinalidade());

    // Logística
    solicitacao.setFormaEntrega(dto.getFormaEntrega());
    solicitacao.setMunicipioDestino(dto.getMunicipioDestino());
    solicitacao.setEnderecoEntrega(dto.getEnderecoEntrega());
    solicitacao.setCepEntrega(dto.getCepEntrega());
    solicitacao.setComplementoEntrega(dto.getComplementoEntrega());
    solicitacao.setNomeDestinatario(dto.getNomeDestinatario());
    solicitacao.setTelefoneDestinatario(dto.getTelefoneDestinatario());

    // Beneficiário (campos adicionais)
    solicitacao.setBeneficiarioComplemento(dto.getBeneficiarioComplemento());
    solicitacao.setPontoReferencia(dto.getPontoReferencia());
    solicitacao.setTipoPropriedade(dto.getTipoPropriedade());

    // Controle
    if (dto.getStatus() != null) {
      solicitacao.setStatus(dto.getStatus());
    }
    solicitacao.setObservacoes(dto.getObservacoes());
  }
}