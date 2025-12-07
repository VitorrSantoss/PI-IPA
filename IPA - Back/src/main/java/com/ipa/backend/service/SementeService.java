package com.ipa.backend.service;

import com.ipa.backend.dto.SementeDTO;
import com.ipa.backend.model.Semente;
import com.ipa.backend.repository.SementeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SementeService {

    @Autowired
    private SementeRepository sementeRepository;

    public List<SementeDTO> listarTodas() {
        return sementeRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SementeDTO> listarAtivas() {
        return sementeRepository.findByAtivoTrueOrderByNomeAsc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SementeDTO> listarPorTipo(String tipo) {
        return sementeRepository.findByTipo(tipo)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SementeDTO> listarPorCultura(String cultura) {
        return sementeRepository.findByCultura(cultura)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SementeDTO> buscarPorNome(String nome) {
        return sementeRepository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SementeDTO buscarPorId(Long id) {
        Semente semente = sementeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Semente não encontrada"));
        return convertToDTO(semente);
    }

    @Transactional
    public SementeDTO criar(SementeDTO dto) {
        Semente semente = convertToEntity(dto);
        Semente salva = sementeRepository.save(semente);
        return convertToDTO(salva);
    }

    @Transactional
    public SementeDTO atualizar(Long id, SementeDTO dto) {
        Semente semente = sementeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Semente não encontrada"));

        atualizarDados(semente, dto);
        Semente atualizada = sementeRepository.save(semente);
        return convertToDTO(atualizada);
    }

    @Transactional
    public void deletar(Long id) {
        if (!sementeRepository.existsById(id)) {
            throw new RuntimeException("Semente não encontrada");
        }
        sementeRepository.deleteById(id);
    }

    @Transactional
    public SementeDTO alternarStatus(Long id) {
        Semente semente = sementeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Semente não encontrada"));
        
        semente.setAtivo(!semente.getAtivo());
        Semente atualizada = sementeRepository.save(semente);
        return convertToDTO(atualizada);
    }

    @Transactional
    public SementeDTO atualizarEstoque(Long id, Integer quantidade) {
        Semente semente = sementeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Semente não encontrada"));
        
        semente.setEstoqueDisponivel(quantidade);
        Semente atualizada = sementeRepository.save(semente);
        return convertToDTO(atualizada);
    }

    // Conversões
    private SementeDTO convertToDTO(Semente semente) {
        SementeDTO dto = new SementeDTO();
        dto.setId(semente.getId());
        dto.setNome(semente.getNome());
        dto.setTipo(semente.getTipo());
        dto.setCultura(semente.getCultura());
        dto.setVariedade(semente.getVariedade());
        dto.setDescricao(semente.getDescricao());
        dto.setEstoqueDisponivel(semente.getEstoqueDisponivel());
        dto.setUnidadeMedida(semente.getUnidadeMedida());
        dto.setPesoUnidade(semente.getPesoUnidade());
        dto.setAtivo(semente.getAtivo());
        dto.setImagemUrl(semente.getImagemUrl());
        dto.setDataCriacao(semente.getDataCriacao());
        dto.setDataAtualizacao(semente.getDataAtualizacao());
        dto.setObservacoes(semente.getObservacoes());
        return dto;
    }

    private Semente convertToEntity(SementeDTO dto) {
        Semente semente = new Semente();
        atualizarDados(semente, dto);
        return semente;
    }

    private void atualizarDados(Semente semente, SementeDTO dto) {
        semente.setNome(dto.getNome());
        semente.setTipo(dto.getTipo());
        semente.setCultura(dto.getCultura());
        semente.setVariedade(dto.getVariedade());
        semente.setDescricao(dto.getDescricao());
        semente.setEstoqueDisponivel(dto.getEstoqueDisponivel());
        semente.setUnidadeMedida(dto.getUnidadeMedida());
        semente.setPesoUnidade(dto.getPesoUnidade());
        
        if (dto.getAtivo() != null) {
            semente.setAtivo(dto.getAtivo());
        }
        
        semente.setImagemUrl(dto.getImagemUrl());
        semente.setObservacoes(dto.getObservacoes());
    }
}