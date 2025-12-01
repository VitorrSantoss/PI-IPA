package com.ipa.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ipa.backend.dto.UsuarioDTO;
import com.ipa.backend.model.Usuario;
import com.ipa.backend.repository.UsuarioRepository;

@Service
public class UsuarioServiceIpa {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioDTO buscarPorCpf(String cpf) {
        Usuario usuario = usuarioRepository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return convertToDTO(usuario);
    }

    public List<UsuarioDTO> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UsuarioDTO buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return convertToDTO(usuario);
    }

    // ✅ NOVO - Verificar se CPF existe
    public boolean existePorCpf(String cpf) {
        return usuarioRepository.existsByCpf(cpf);
    }

    @Transactional
    public UsuarioDTO criar(UsuarioDTO usuarioDTO) {
        if (usuarioRepository.existsByCpf(usuarioDTO.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }

        Usuario usuario = convertToEntity(usuarioDTO);
        Usuario usuarioSalvo = usuarioRepository.save(usuario);
        return convertToDTO(usuarioSalvo);
    }

    @Transactional
    public UsuarioDTO atualizar(Long id, UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(usuarioDTO.getNome());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setEstado(usuarioDTO.getEstado());

        Usuario usuarioAtualizado = usuarioRepository.save(usuario);
        return convertToDTO(usuarioAtualizado);
    }

    @Transactional
    public void deletar(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado");
        }
        usuarioRepository.deleteById(id);
    }

    private UsuarioDTO convertToDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setCpf(usuario.getCpf());
        dto.setEmail(usuario.getEmail());
        dto.setEstado(usuario.getEstado());
        return dto;
    }

    private Usuario convertToEntity(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setCpf(dto.getCpf());
        usuario.setEmail(dto.getEmail());
        usuario.setEstado(dto.getEstado());
        return usuario;
    }
}