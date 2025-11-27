package com.ipa.backend.controller;

import com.ipa.backend.dto.SolicitacaoDTO;
import com.ipa.backend.service.SolicitacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/solicitacoes")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class SolicitacaoController {

    @Autowired
    private SolicitacaoService solicitacaoService;

    @GetMapping
    public ResponseEntity<List<SolicitacaoDTO>> listarTodas() {
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

    @GetMapping("/status/{status}")
    public ResponseEntity<List<SolicitacaoDTO>> listarPorStatus(@PathVariable String status) {
        return ResponseEntity.ok(solicitacaoService.listarPorStatus(status));
    }

    @GetMapping("/solicitante/{cpf}")
    public ResponseEntity<List<SolicitacaoDTO>> buscarPorSolicitante(@PathVariable String cpf) {
        return ResponseEntity.ok(solicitacaoService.buscarPorSolicitante(cpf));
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody SolicitacaoDTO solicitacaoDTO) {
        try {
            SolicitacaoDTO nova = solicitacaoService.criar(solicitacaoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(nova);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(
            @PathVariable Long id,
            @RequestBody SolicitacaoDTO solicitacaoDTO) {
        try {
            return ResponseEntity.ok(solicitacaoService.atualizar(id, solicitacaoDTO));
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
}