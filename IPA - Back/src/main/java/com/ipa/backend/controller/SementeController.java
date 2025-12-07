package com.ipa.backend.controller;

import com.ipa.backend.dto.SementeDTO;
import com.ipa.backend.service.SementeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sementes")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class SementeController {

    @Autowired
    private SementeService sementeService;

    @GetMapping
    public ResponseEntity<List<SementeDTO>> listarTodas() {
        return ResponseEntity.ok(sementeService.listarTodas());
    }

    @GetMapping("/ativas")
    public ResponseEntity<List<SementeDTO>> listarAtivas() {
        return ResponseEntity.ok(sementeService.listarAtivas());
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<SementeDTO>> listarPorTipo(@PathVariable String tipo) {
        return ResponseEntity.ok(sementeService.listarPorTipo(tipo));
    }

    @GetMapping("/cultura/{cultura}")
    public ResponseEntity<List<SementeDTO>> listarPorCultura(@PathVariable String cultura) {
        return ResponseEntity.ok(sementeService.listarPorCultura(cultura));
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<SementeDTO>> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(sementeService.buscarPorNome(nome));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(sementeService.buscarPorId(id));
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody SementeDTO sementeDTO) {
        try {
            SementeDTO nova = sementeService.criar(sementeDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Semente cadastrada com sucesso!");
            response.put("semente", nova);
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
            @RequestBody SementeDTO sementeDTO) {
        try {
            SementeDTO atualizada = sementeService.atualizar(id, sementeDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Semente atualizada com sucesso!");
            response.put("semente", atualizada);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> alternarStatus(@PathVariable Long id) {
        try {
            SementeDTO atualizada = sementeService.alternarStatus(id);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Status alterado com sucesso!");
            response.put("semente", atualizada);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @PatchMapping("/{id}/estoque")
    public ResponseEntity<?> atualizarEstoque(
            @PathVariable Long id,
            @RequestParam Integer quantidade) {
        try {
            SementeDTO atualizada = sementeService.atualizarEstoque(id, quantidade);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Estoque atualizado com sucesso!");
            response.put("semente", atualizada);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            sementeService.deletar(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Semente deletada com sucesso!");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
}