// src/services/pedidoService.ts
import axios from 'axios';

// Configuração da API
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // ⚠️ Porta do Spring Boot
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interface do Pedido (deve corresponder ao que o backend retorna)
export interface Pedido {
  id: number;
  numeroRastreio: string;
  dataSolicitacao: string;
  previsaoDespacho: string;
  cultura: string;
  variedade: string;
  quantidade: number;
  unidade: string;
  statusEstoque: string;
  produtor: string;
  enderecoEntrega: string;
  municipio: string;
  prazoFinal: string;
  status: string;
  etapas: Array<{
    nome: string;
    descricao: string;
    concluida: boolean;
  }>;
}

export interface PedidoDTO {
  id: number;
  numeroRastreio: string;
  usuarioId: number;
  usuarioNome: string;
  produtoId: number;
  produtoNome: string;
  quantidade: number;
  valorTotal: number;
  status: string;
  dataPedido: string;
  dataEntrega?: string;
  observacoes?: string;
}

export const pedidoService = {
  // Rastrear pedido por código
  rastrear: async (codigo: string) => {
    console.log('🔍 Buscando código:', codigo);
    
    try {
      // O backend retorna o objeto diretamente, não dentro de { data: ... }
      const response = await api.get(`/pedidos/rastrear/${codigo}`);
      
      console.log('✅ Resposta recebida:', response);
      console.log('📦 Dados do pedido:', response.data);
      
      // O Axios já coloca a resposta em response.data
      // Então retornamos { data: response.data } para manter compatibilidade
      return { data: response.data };
      
    } catch (error: any) {
      console.error('❌ Erro ao buscar pedido:', error);
      console.error('📄 Resposta do erro:', error.response);
      throw error;
    }
  },

  // Listar todos os pedidos (com paginação)
  listarTodos: async (page = 0, size = 10) => {
    const response = await api.get('/pedidos', {
      params: { page, size }
    });
    return response.data;
  },

  // Buscar pedido por ID
  buscarPorId: async (id: number) => {
    const response = await api.get(`/pedidos/${id}`);
    return response.data;
  },

  // Listar pedidos por status
  listarPorStatus: async (status: string) => {
    const response = await api.get(`/pedidos/status/${status}`);
    return response.data;
  },

  // Listar pedidos de um usuário
  listarPorUsuario: async (usuarioId: number) => {
    const response = await api.get(`/pedidos/usuario/${usuarioId}`);
    return response.data;
  },

  // Criar novo pedido
  criar: async (pedido: Partial<PedidoDTO>) => {
    const response = await api.post('/pedidos', pedido);
    return response.data;
  },

  // Atualizar status do pedido
  atualizarStatus: async (id: number, status: string) => {
    const response = await api.patch(`/pedidos/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  },

  // Deletar pedido
  deletar: async (id: number) => {
    await api.delete(`/pedidos/${id}`);
  },
};

// Adicionar interceptor para debug
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Requisição:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta recebida:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ Erro na resposta:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('❌ Sem resposta do servidor:', error.request);
    } else {
      console.error('❌ Erro:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;