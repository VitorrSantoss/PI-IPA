package com.ipa.backend.controller;

<<<<<<< HEAD
import com.ipa.backend.dto.SolicitacaoDto;
import com.ipa.backend.service.SolicitacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

=======
>>>>>>> 232c1ce1c3cee1cf103803aeb1c985ffe18f40e3
import java.util.HashMap;
import java.util.List;
import java.util.Map;

<<<<<<< HEAD
=======
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ipa.backend.dto.SolicitacaoDto;
import com.ipa.backend.service.SolicitacaoService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

>>>>>>> 232c1ce1c3cee1cf103803aeb1c985ffe18f40e3
@RestController
@RequestMapping("/api/solicitacoes")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class SolicitacaoController {

<<<<<<< HEAD
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

    @GetMapping("/status/{status}")
    public ResponseEntity<List<SolicitacaoDto>> listarPorStatus(@PathVariable String status) {
        return ResponseEntity.ok(solicitacaoService.listarPorStatus(status));
    }

    @GetMapping("/solicitante/{cpf}")
    public ResponseEntity<List<SolicitacaoDto>> buscarPorSolicitante(@PathVariable String cpf) {
        return ResponseEntity.ok(solicitacaoService.buscarPorSolicitante(cpf));
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody SolicitacaoDto solicitacaoDto) {
        try {
            SolicitacaoDto nova = solicitacaoService.criar(solicitacaoDto);
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
            @RequestBody SolicitacaoDto solicitacaoDto) {
        try {
            return ResponseEntity.ok(solicitacaoService.atualizar(id, solicitacaoDto));
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
=======
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

  @GetMapping("/status/{status}")
  public ResponseEntity<List<SolicitacaoDto>> listarPorStatus(@PathVariable String status) {
    return ResponseEntity.ok(solicitacaoService.listarPorStatus(status));
  }

  @GetMapping("/solicitante/{cpf}")
  public ResponseEntity<List<SolicitacaoDto>> buscarPorSolicitante(@PathVariable String cpf) {
    return ResponseEntity.ok(solicitacaoService.buscarPorSolicitante(cpf));
  }

  @PostMapping
  public ResponseEntity<?> criar(@RequestBody SolicitacaoDto solicitacaoDTO) {
    try {
      SolicitacaoDto nova = solicitacaoService.criar(solicitacaoDTO);
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
      @RequestBody SolicitacaoDto solicitacaoDTO) {
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
>>>>>>> 232c1ce1c3cee1cf103803aeb1c985ffe18f40e3
}