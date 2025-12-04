package com.ipa.backend.controller;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ipa.backend.dto.SolicitacaoDto;
import com.ipa.backend.service.SolicitacaoService;

@RestController
@RequestMapping("/api/solicitacoes")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class SolicitacaoController {

  @Autowired
  private SolicitacaoService solicitacaoService;

  @GetMapping
  public ResponseEntity<List<SolicitacaoDto>> listarTodas() {
    return ResponseEntity.ok(solicitacaoService.listarTodas());
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
    try {
      return ResponseEntity.ok(solicitacaoService.buscarPorId(id));
    } catch (RuntimeException e) {
      Map<String, String> error = new HashMap<>();
      error.put("message", e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
  }

  /**
   * 🔍 NOVO: Endpoint para rastrear solicitação por código
   * GET /api/solicitacoes/rastrear/{codigo}
   * Exemplo: /api/solicitacoes/rastrear/SAFRA-2025-K7L8M9N0
   */
  @GetMapping("/rastrear/{codigo}")
  public ResponseEntity<?> rastrearPorCodigo(@PathVariable String codigo) {
    try {
      SolicitacaoDto solicitacao = solicitacaoService.buscarPorCodigoRastreio(codigo);

      // Criar resposta detalhada para o frontend
      Map<String, Object> response = new HashMap<>();

      // ✅ Informações básicas
      response.put("id", solicitacao.getId());
      response.put("codigoRastreio", solicitacao.getCodigoRastreio());
      response.put("status", solicitacao.getStatus());

      // ✅ Datas formatadas
      DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
      response.put("dataSolicitacao", solicitacao.getDataCriacao().format(formatter));
      if (solicitacao.getDataAtualizacao() != null) {
        response.put("dataAtualizacao", solicitacao.getDataAtualizacao().format(formatter));
      }

      // ✅ Informações do insumo
      response.put("tipoInsumo", solicitacao.getTipoInsumo());
      response.put("cultura", solicitacao.getCultura());
      response.put("variedade", solicitacao.getVariedade());
      response.put("quantidade", solicitacao.getQuantidade());
      response.put("unidadeMedida", solicitacao.getUnidadeMedida());

      // ✅ Informações do beneficiário
      response.put("beneficiarioNome", solicitacao.getBeneficiarioNome());
      response.put("beneficiarioCpf", solicitacao.getBeneficiarioCpf());
      response.put("municipioDestino", solicitacao.getMunicipioDestino());

      // ✅ Informações do solicitante
      response.put("solicitanteNome", solicitacao.getSolicitanteNome());
      response.put("localAtuacao", solicitacao.getLocalAtuacao());

      // ✅ Etapas de rastreamento
      response.put("etapas", gerarEtapasRastreamento(solicitacao.getStatus()));

      // ✅ Observações
      if (solicitacao.getObservacoes() != null) {
        response.put("observacoes", solicitacao.getObservacoes());
      }

      return ResponseEntity.ok(response);

    } catch (RuntimeException e) {
      Map<String, String> error = new HashMap<>();
      error.put("message", "Solicitação não encontrada com o código: " + codigo);
      error.put("codigo", codigo);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
  }

  @GetMapping("/status/{status}")
  public ResponseEntity<List<SolicitacaoDto>> listarPorStatus(@PathVariable String status) {
    return ResponseEntity.ok(solicitacaoService.listarPorStatus(status));
  }

  @GetMapping("/solicitante/{cpf}")
  public ResponseEntity<List<SolicitacaoDto>> buscarPorSolicitante(@PathVariable String cpf) {
    return ResponseEntity.ok(solicitacaoService.buscarPorSolicitante(cpf));
  }

  @PostMapping
  public ResponseEntity<?> criar(@RequestBody SolicitacaoDto SolicitacaoDto) {
    try {
      SolicitacaoDto nova = solicitacaoService.criar(SolicitacaoDto);

      // ✅ Retornar resposta destacando o código de rastreio
      Map<String, Object> response = new HashMap<>();
      response.put("message", "Solicitação criada com sucesso!");
      response.put("solicitacao", nova);
      response.put("codigoRastreio", nova.getCodigoRastreio());

      return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (RuntimeException e) {
      Map<String, String> error = new HashMap<>();
      error.put("message", e.getMessage());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> atualizar(
      @PathVariable Long id,
      @RequestBody SolicitacaoDto SolicitacaoDto) {
    try {
      return ResponseEntity.ok(solicitacaoService.atualizar(id, SolicitacaoDto));
    } catch (RuntimeException e) {
      Map<String, String> error = new HashMap<>();
      error.put("message", e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
  }

  @PatchMapping("/{id}/status")
  public ResponseEntity<?> atualizarStatus(
      @PathVariable Long id,
      @RequestParam String status) {
    try {
      return ResponseEntity.ok(solicitacaoService.atualizarStatus(id, status));
    } catch (RuntimeException e) {
      Map<String, String> error = new HashMap<>();
      error.put("message", e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deletar(@PathVariable Long id) {
    try {
      solicitacaoService.deletar(id);
      return ResponseEntity.noContent().build();
    } catch (RuntimeException e) {
      Map<String, String> error = new HashMap<>();
      error.put("message", e.getMessage());
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
  }

  /**
   * Gera as etapas de rastreamento com base no status atual
   */
  private List<Map<String, Object>> gerarEtapasRastreamento(String status) {
    return List.of(
        Map.of(
            "etapa", "Solicitação Registrada",
            "descricao", "Solicitação criada no sistema",
            "concluida", true,
            "icone", "📝"),
        Map.of(
            "etapa", "Em Análise",
            "descricao", "Verificação de requisitos e disponibilidade",
            "concluida", !status.equals("RASCUNHO"),
            "icone", "🔍"),
        Map.of(
            "etapa", "Aprovada",
            "descricao", "Solicitação aprovada pelo IPA",
            "concluida", status.equals("APROVADA") || status.equals("EM_PREPARACAO") || status.equals("DESPACHADA")
                || status.equals("ENTREGUE"),
            "icone", "✅"),
        Map.of(
            "etapa", "Em Preparação",
            "descricao", "Separação e embalagem do insumo",
            "concluida", status.equals("EM_PREPARACAO") || status.equals("DESPACHADA") || status.equals("ENTREGUE"),
            "icone", "📦"),
        Map.of(
            "etapa", "Despachada",
            "descricao", "Insumo em rota de entrega",
            "concluida", status.equals("DESPACHADA") || status.equals("ENTREGUE"),
            "icone", "🚚"),
        Map.of(
            "etapa", "Entregue",
            "descricao", "Insumo recebido pelo beneficiário",
            "concluida", status.equals("ENTREGUE"),
            "icone", "🎉"));
  }
}