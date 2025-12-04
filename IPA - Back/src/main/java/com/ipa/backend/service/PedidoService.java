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
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    private static final String CARACTERES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom random = new SecureRandom();

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
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com o código: " + codigo));
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
        
        // ✅ Gerar código de rastreio único
        pedido.setNumeroRastreio(gerarCodigoRastreioUnico());
        
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

    /**
     * Gera um código de rastreio único no formato: SAFRA-2025-XXXXXXXX
     * Onde XXXXXXXX são 8 caracteres alfanuméricos aleatórios
     * Garante que o código não existe no banco de dados
     */
    private String gerarCodigoRastreioUnico() {
        String codigo;
        int tentativas = 0;
        int maxTentativas = 10;

        do {
            codigo = gerarCodigoRastreio();
            tentativas++;
            
            // Proteção contra loop infinito (muito improvável)
            if (tentativas >= maxTentativas) {
                throw new RuntimeException("Erro ao gerar código de rastreio único. Tente novamente.");
            }
            
        } while (pedidoRepository.findByNumeroRastreio(codigo).isPresent());

        return codigo;
    }

    /**
     * Gera o código no formato: SAFRA-2025-XXXXXXXX
     * Exemplo: SAFRA-2025-K7L8M9N0
     */
    private String gerarCodigoRastreio() {
        int ano = LocalDateTime.now().getYear();
        StringBuilder codigo = new StringBuilder("SAFRA-");
        codigo.append(ano).append("-");
        
        // Gerar 8 caracteres alfanuméricos aleatórios
        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(CARACTERES.length());
            codigo.append(CARACTERES.charAt(index));
        }
        
        return codigo.toString();
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