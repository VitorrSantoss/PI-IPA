package com.ipa.backend.controller;

import com.ipa.backend.dto.PedidoDTO;
import com.ipa.backend.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public ResponseEntity<Page<PedidoDTO>> listarTodos(Pageable pageable) {
        return ResponseEntity.ok(pedidoService.listarTodos(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.buscarPorId(id));
    }

    @GetMapping("/rastrear/{codigo}")
    public ResponseEntity<PedidoDTO> rastrear(@PathVariable String codigo) {
        return ResponseEntity.ok(pedidoService.rastrearPorCodigo(codigo));
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
    public ResponseEntity<PedidoDTO> criar(@RequestBody PedidoDTO pedidoDTO) {
        return ResponseEntity.ok(pedidoService.criar(pedidoDTO));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<PedidoDTO> atualizarStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(pedidoService.atualizarStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        pedidoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}