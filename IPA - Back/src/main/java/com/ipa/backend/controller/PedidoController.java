package com.ipa.backend.controller;

import com.ipa.backend.dto.PedidoDTO;
import com.ipa.backend.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public ResponseEntity<Page<PedidoDTO>> listarTodos(Pageable pageable) {
        return ResponseEntity.ok(pedidoService.listarTodos(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(pedidoService.buscarPorId(id));
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    /**
     * 🔍 ENDPOINT PRINCIPAL DE RASTREAMENTO
     * GET /api/pedidos/rastrear/{codigo}
     * Exemplo: /api/pedidos/rastrear/SAFRA-2025-K7L8M9N0
     */
    @GetMapping("/rastrear/{codigo}")
    public ResponseEntity<?> rastrear(@PathVariable String codigo) {
        try {
            PedidoDTO pedido = pedidoService.rastrearPorCodigo(codigo);

            // Criar resposta detalhada para o frontend
            Map<String, Object> response = new HashMap<>();
            
            // ✅ Informações básicas do pedido
            response.put("id", pedido.getId());
            response.put("numeroRastreio", pedido.getNumeroRastreio());
            response.put("status", pedido.getStatus());
            
            // ✅ Datas formatadas
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
            response.put("dataSolicitacao", pedido.getDataPedido().format(formatter));
            
            if (pedido.getDataEntrega() != null) {
                response.put("dataEntrega", pedido.getDataEntrega().format(formatter));
            }
            
            // ✅ Informações do produto
            response.put("produto", pedido.getProdutoNome());
            response.put("quantidade", pedido.getQuantidade());
            response.put("valorTotal", pedido.getValorTotal());
            
            // ✅ Informações do solicitante
            response.put("solicitante", pedido.getUsuarioNome());
            
            // ✅ Etapas de rastreamento com base no status
            response.put("etapas", gerarEtapasRastreamento(pedido.getStatus()));
            
            // ✅ Observações
            if (pedido.getObservacoes() != null) {
                response.put("observacoes", pedido.getObservacoes());
            }

            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Pedido não encontrado com o código: " + codigo);
            error.put("codigo", codigo);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<PedidoDTO>> listarPorStatus(@PathVariable String status) {
        return ResponseEntity.ok(pedidoService.listarPorStatus(status));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<PedidoDTO>> listarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(pedidoService.listarPorUsuario(usuarioId));
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody PedidoDTO pedidoDTO) {
        try {
            PedidoDTO pedidoCriado = pedidoService.criar(pedidoDTO);
            
            // ✅ Retornar resposta com código de rastreio destacado
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Pedido criado com sucesso!");
            response.put("pedido", pedidoCriado);
            response.put("codigoRastreio", pedidoCriado.getNumeroRastreio());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        try {
            return ResponseEntity.ok(pedidoService.atualizarStatus(id, status));
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            pedidoService.deletar(id);
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
                "etapa", "Solicitação Recebida",
                "descricao", "Pedido registrado no sistema",
                "concluida", true,
                "icone", "📝"
            ),
            Map.of(
                "etapa", "Análise e Aprovação",
                "descricao", "Verificação de estoque e documentação",
                "concluida", status.equals("APROVADO") || status.equals("EM_ROTA") || status.equals("ENTREGUE"),
                "icone", "✅"
            ),
            Map.of(
                "etapa", "Preparação do Insumo",
                "descricao", "Separação e embalagem",
                "concluida", status.equals("EM_ROTA") || status.equals("ENTREGUE"),
                "icone", "📦"
            ),
            Map.of(
                "etapa", "Em Rota de Entrega",
                "descricao", "Produto a caminho do destino",
                "concluida", status.equals("EM_ROTA") || status.equals("ENTREGUE"),
                "icone", "🚚"
            ),
            Map.of(
                "etapa", "Entregue",
                "descricao", "Produto recebido pelo agricultor",
                "concluida", status.equals("ENTREGUE"),
                "icone", "🎉"
            )
        );
    }
}