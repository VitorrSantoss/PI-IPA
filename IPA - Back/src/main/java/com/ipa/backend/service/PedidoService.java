package com.ipa.backend.service;

import com.ipa.backend.dto.PedidoDTO;
import com.ipa.backend.model.Pedido;
import com.ipa.backend.model.Produto;
import com.ipa.backend.model.Usuario;
import com.ipa.backend.repository.PedidoRepository;
import com.ipa.backend.repository.ProdutoRepository;
import com.ipa.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public Page<PedidoDTO> listarTodos(Pageable pageable) {
        return pedidoRepository.findAll(pageable).map(this::convertToDTO);
    }

    public PedidoDTO buscarPorId(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
        return convertToDTO(pedido);
    }

    public PedidoDTO rastrearPorCodigo(String codigo) {
        Pedido pedido = pedidoRepository.findByNumeroRastreio(codigo)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
        return convertToDTO(pedido);
    }

    public List<PedidoDTO> listarPorStatus(String status) {
        return pedidoRepository.findByStatus(status)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PedidoDTO> listarPorUsuario(Long usuarioId) {
        return pedidoRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PedidoDTO criar(PedidoDTO pedidoDTO) {
        Usuario usuario = usuarioRepository.findById(pedidoDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Produto produto = produtoRepository.findById(pedidoDTO.getProdutoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // Verificar estoque
        if (produto.getEstoque() < pedidoDTO.getQuantidade()) {
            throw new RuntimeException("Estoque insuficiente");
        }

        Pedido pedido = new Pedido();
        pedido.setNumeroRastreio(gerarCodigoRastreio());
        pedido.setUsuario(usuario);
        pedido.setProduto(produto);
        pedido.setQuantidade(pedidoDTO.getQuantidade());
        pedido.setValorTotal(produto.getPreco().multiply(new BigDecimal(pedidoDTO.getQuantidade())));
        pedido.setStatus("PENDENTE");
        pedido.setDataPedido(LocalDateTime.now());
        pedido.setObservacoes(pedidoDTO.getObservacoes());

        // Atualizar estoque
        produto.setEstoque(produto.getEstoque() - pedidoDTO.getQuantidade());
        produtoRepository.save(produto);

        Pedido pedidoSalvo = pedidoRepository.save(pedido);
        return convertToDTO(pedidoSalvo);
    }

    @Transactional
    public PedidoDTO atualizarStatus(Long id, String novoStatus) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        pedido.setStatus(novoStatus);

        if ("ENTREGUE".equals(novoStatus)) {
            pedido.setDataEntrega(LocalDateTime.now());
        }

        Pedido pedidoAtualizado = pedidoRepository.save(pedido);
        return convertToDTO(pedidoAtualizado);
    }

    @Transactional
    public void deletar(Long id) {
        pedidoRepository.deleteById(id);
    }

    private String gerarCodigoRastreio() {
        return "SAFRA-" + LocalDateTime.now().getYear() + "-" +
                UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private PedidoDTO convertToDTO(Pedido pedido) {
        PedidoDTO dto = new PedidoDTO();
        dto.setId(pedido.getId());
        dto.setNumeroRastreio(pedido.getNumeroRastreio());
        dto.setUsuarioId(pedido.getUsuario().getId());
        dto.setUsuarioNome(pedido.getUsuario().getNome());
        dto.setProdutoId(pedido.getProduto().getId());
        dto.setProdutoNome(pedido.getProduto().getNome());
        dto.setQuantidade(pedido.getQuantidade());
        dto.setValorTotal(pedido.getValorTotal());
        dto.setStatus(pedido.getStatus());
        dto.setDataPedido(pedido.getDataPedido());
        dto.setDataEntrega(pedido.getDataEntrega());
        dto.setObservacoes(pedido.getObservacoes());
        return dto;
    }
}