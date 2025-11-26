package com.ipa.backend.controller;

import com.ipa.backend.dto.PedidoDTO;
import com.ipa.backend.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(originPatterns = "*", allowCredentials = "true") // Adiciona CORS explícito
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

    @GetMapping("/rastrear/{codigo}")
    public ResponseEntity<?> rastrear(@PathVariable String codigo) {
        try {
            PedidoDTO pedido = pedidoService.rastrearPorCodigo(codigo);

            // Adiciona informações extras para rastreamento
            Map<String, Object> response = new HashMap<>();
            response.put("id", pedido.getId());
            response.put("numeroRastreio", pedido.getNumeroRastreio());
            response.put("dataSolicitacao", pedido.getDataPedido());
            response.put("previsaoDespacho", pedido.getDataPedido()); // Simular previsão
            response.put("cultura", pedido.getProdutoNome());
            response.put("variedade", "Padrão"); // Adicionar campo se necessário
            response.put("quantidade", pedido.getQuantidade());
            response.put("unidade", "KG");
            response.put("statusEstoque", "DISPONIVEL");
            response.put("produtor", pedido.getUsuarioNome());
            response.put("enderecoEntrega", "Endereço em processamento");
            response.put("municipio", "Recife - PE");
            response.put("prazoFinal", pedido.getDataPedido());
            response.put("status", pedido.getStatus());

            // Etapas de rastreamento
            List<Map<String, Object>> etapas = List.of(
                    Map.of("nome", "Solicitação Recebida", "descricao", "Pedido registrado no sistema", "concluida", true),
                    Map.of("nome", "Análise e Aprovação", "descricao", "Verificação de estoque e documentação", "concluida", pedido.getStatus().equals("APROVADO") || pedido.getStatus().equals("EM_ROTA") || pedido.getStatus().equals("ENTREGUE")),
                    Map.of("nome", "Preparação do Insumo", "descricao", "Separação e embalagem", "concluida", pedido.getStatus().equals("EM_ROTA") || pedido.getStatus().equals("ENTREGUE")),
                    Map.of("nome", "Em Rota de Entrega", "descricao", "Produto a caminho do destino", "concluida", pedido.getStatus().equals("EM_ROTA") || pedido.getStatus().equals("ENTREGUE")),
                    Map.of("nome", "Entregue", "descricao", "Produto recebido pelo agricultor", "concluida", pedido.getStatus().equals("ENTREGUE"))
            );

            response.put("etapas", etapas);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Pedido não encontrado com o código: " + codigo);
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
            return ResponseEntity.status(HttpStatus.CREATED).body(pedidoService.criar(pedidoDTO));
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
}