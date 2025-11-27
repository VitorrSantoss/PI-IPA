package com.ipa.backend.service;

import com.ipa.backend.dto.SolicitacaoDto;
import com.ipa.backend.model.Solicitacao;
import com.ipa.backend.repository.SolicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SolicitacaoService {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    public List<SolicitacaoDto> listarTodas() {
        return solicitacaoRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SolicitacaoDto> listarPorStatus(String status) {
        return solicitacaoRepository.findByStatus(status)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SolicitacaoDto buscarPorId(Long id) {
        Solicitacao solicitacao = solicitacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
        return convertToDTO(solicitacao);
    }

    public List<SolicitacaoDto> buscarPorSolicitante(String cpf) {
        return solicitacaoRepository.findBySolicitanteCpf(cpf)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public SolicitacaoDto criar(SolicitacaoDto dto) {
        Solicitacao solicitacao = convertToEntity(dto);
        Solicitacao salva = solicitacaoRepository.save(solicitacao);
        return convertToDTO(salva);
    }

    @Transactional
    public SolicitacaoDto atualizar(Long id, SolicitacaoDto dto) {
        Solicitacao solicitacao = solicitacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        atualizarDados(solicitacao, dto);
        
        Solicitacao atualizada = solicitacaoRepository.save(solicitacao);
        return convertToDTO(atualizada);
    }

    @Transactional
    public SolicitacaoDto atualizarStatus(Long id, String novoStatus) {
        Solicitacao solicitacao = solicitacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        solicitacao.setStatus(novoStatus);
        
        Solicitacao atualizada = solicitacaoRepository.save(solicitacao);
        return convertToDTO(atualizada);
    }

    @Transactional
    public void deletar(Long id) {
        if (!solicitacaoRepository.existsById(id)) {
            throw new RuntimeException("Solicitação não encontrada");
        }
        solicitacaoRepository.deleteById(id);
    }

    // ===== CONVERSÕES =====
    
    private SolicitacaoDto convertToDTO(Solicitacao solicitacao) {
        SolicitacaoDto dto = new SolicitacaoDto();
        
        dto.setId(solicitacao.getId());
        
        // Solicitante
        dto.setSolicitanteNome(solicitacao.getSolicitanteNome());
        dto.setSolicitanteCpf(solicitacao.getSolicitanteCpf());
        dto.setSolicitanteMatricula(solicitacao.getSolicitanteMatricula());
        dto.setSolicitanteTelefone(solicitacao.getSolicitanteTelefone());
        dto.setLocalAtuacao(solicitacao.getLocalAtuacao());
        
        // Beneficiário
        dto.setBeneficiarioNome(solicitacao.getBeneficiarioNome());
        dto.setBeneficiarioCpf(solicitacao.getBeneficiarioCpf());
        dto.setBeneficiarioCaf(solicitacao.getBeneficiarioCaf());
        dto.setTipoPropriedade(solicitacao.getTipoPropriedade());
        dto.setBeneficiarioCep(solicitacao.getBeneficiarioCep());
        dto.setBeneficiarioComplemento(solicitacao.getBeneficiarioComplemento());
        dto.setPontoReferencia(solicitacao.getPontoReferencia());
        
        // Insumo
        dto.setTipoInsumo(solicitacao.getTipoInsumo());
        dto.setCultura(solicitacao.getCultura());
        dto.setVariedade(solicitacao.getVariedade());
        dto.setQuantidade(solicitacao.getQuantidade());
        dto.setUnidadeMedida(solicitacao.getUnidadeMedida());
        dto.setAreaPlantada(solicitacao.getAreaPlantada());
        dto.setAreaUnidade(solicitacao.getAreaUnidade());
        dto.setDataIdealPlantio(solicitacao.getDataIdealPlantio());
        dto.setFinalidade(solicitacao.getFinalidade());
        
        // Logística
        dto.setFormaEntrega(solicitacao.getFormaEntrega());
        dto.setMunicipioDestino(solicitacao.getMunicipioDestino());
        dto.setEnderecoEntrega(solicitacao.getEnderecoEntrega());
        dto.setCepEntrega(solicitacao.getCepEntrega());
        dto.setComplementoEntrega(solicitacao.getComplementoEntrega());
        dto.setNomeDestinatario(solicitacao.getNomeDestinatario());
        dto.setTelefoneDestinatario(solicitacao.getTelefoneDestinatario());
        
        // Controle
        dto.setStatus(solicitacao.getStatus());
        dto.setDataCriacao(solicitacao.getDataCriacao());
        dto.setDataAtualizacao(solicitacao.getDataAtualizacao());
        dto.setPedidoId(solicitacao.getPedidoId());
        dto.setObservacoes(solicitacao.getObservacoes());
        
        return dto;
    }

    private Solicitacao convertToEntity(SolicitacaoDto dto) {
        Solicitacao solicitacao = new Solicitacao();
        atualizarDados(solicitacao, dto);
        return solicitacao;
    }

    private void atualizarDados(Solicitacao solicitacao, SolicitacaoDto dto) {
        // Solicitante
        solicitacao.setSolicitanteNome(dto.getSolicitanteNome());
        solicitacao.setSolicitanteCpf(dto.getSolicitanteCpf());
        solicitacao.setSolicitanteMatricula(dto.getSolicitanteMatricula());
        solicitacao.setSolicitanteTelefone(dto.getSolicitanteTelefone());
        solicitacao.setLocalAtuacao(dto.getLocalAtuacao());
        
        // Beneficiário
        solicitacao.setBeneficiarioNome(dto.getBeneficiarioNome());
        solicitacao.setBeneficiarioCpf(dto.getBeneficiarioCpf());
        solicitacao.setBeneficiarioCaf(dto.getBeneficiarioCaf());
        solicitacao.setTipoPropriedade(dto.getTipoPropriedade());
        solicitacao.setBeneficiarioCep(dto.getBeneficiarioCep());
        solicitacao.setBeneficiarioComplemento(dto.getBeneficiarioComplemento());
        solicitacao.setPontoReferencia(dto.getPontoReferencia());
        
        // Insumo
        solicitacao.setTipoInsumo(dto.getTipoInsumo());
        solicitacao.setCultura(dto.getCultura());
        solicitacao.setVariedade(dto.getVariedade());
        solicitacao.setQuantidade(dto.getQuantidade());
        solicitacao.setUnidadeMedida(dto.getUnidadeMedida());
        solicitacao.setAreaPlantada(dto.getAreaPlantada());
        solicitacao.setAreaUnidade(dto.getAreaUnidade());
        solicitacao.setDataIdealPlantio(dto.getDataIdealPlantio());
        solicitacao.setFinalidade(dto.getFinalidade());
        
        // Logística
        solicitacao.setFormaEntrega(dto.getFormaEntrega());
        solicitacao.setMunicipioDestino(dto.getMunicipioDestino());
        solicitacao.setEnderecoEntrega(dto.getEnderecoEntrega());
        solicitacao.setCepEntrega(dto.getCepEntrega());
        solicitacao.setComplementoEntrega(dto.getComplementoEntrega());
        solicitacao.setNomeDestinatario(dto.getNomeDestinatario());
        solicitacao.setTelefoneDestinatario(dto.getTelefoneDestinatario());
        
        // Controle
        if (dto.getStatus() != null) {
            solicitacao.setStatus(dto.getStatus());
        }
        solicitacao.setObservacoes(dto.getObservacoes());
    }
}
