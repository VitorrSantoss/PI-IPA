package com.ipa.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ipa.backend.dto.UsuarioDTO;
import com.ipa.backend.service.UsuarioServiceIpa;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioControllerIpa {

    @Autowired
    private UsuarioServiceIpa usuarioService;

    // ✅ GET - Listar todos os usuários
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listarTodos() {
        List<UsuarioDTO> usuarios = usuarioService.listarTodos();
        return ResponseEntity.ok(usuarios);
    }

    // ✅ GET - Buscar usuário por ID
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscarPorId(@PathVariable Long id) {
        try {
            UsuarioDTO usuario = usuarioService.buscarPorId(id);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ GET - Buscar usuário por CPF
    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<UsuarioDTO> buscarPorCpf(@PathVariable String cpf) {
        try {
            UsuarioDTO usuario = usuarioService.buscarPorCpf(cpf);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ POST - Criar novo usuário
    @PostMapping
    public ResponseEntity<?> criar(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            UsuarioDTO novoUsuario = usuarioService.criar(usuarioDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ PUT - Atualizar usuário existente
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(
            @PathVariable Long id,
            @RequestBody UsuarioDTO usuarioDTO) {
        try {
            UsuarioDTO usuarioAtualizado = usuarioService.atualizar(id, usuarioDTO);
            return ResponseEntity.ok(usuarioAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ DELETE - Deletar usuário
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            usuarioService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ GET - Verificar se CPF já existe
    @GetMapping("/verificar-cpf/{cpf}")
    public ResponseEntity<Boolean> verificarCpf(@PathVariable String cpf) {
        boolean existe = usuarioService.existePorCpf(cpf);
        return ResponseEntity.ok(existe);
    }
}