// src/services/solicitacaoService.ts
import api from './api';

// ===== INTERFACES =====

export interface Etapa {
  etapa: string;
  descricao: string;
  concluida: boolean;
  icone: string;
}

export interface SolicitacaoRastreio {
  id: number;
  codigoRastreio: string;
  status: string;
  dataSolicitacao: string;
  dataAtualizacao?: string;
  tipoInsumo: string;
  cultura: string;
  variedade?: string;
  quantidade: number;
  unidadeMedida: string;
  beneficiarioNome: string;
  beneficiarioCpf: string;
  municipioDestino?: string;
  solicitanteNome: string;
  localAtuacao?: string;
  observacoes?: string;
  etapas: Etapa[];
}

export interface SolicitacaoResponse {
  message: string;
  codigoRastreio: string;
  solicitacao: any;
}

// ===== FUNÇÕES DO SERVICE =====

/**
 * 🔍 Rastrear solicitação por código
 * @param codigoRastreio - Código no formato SAFRA-2025-XXXXXXXX
 * @returns Dados completos da solicitação
 */
export const rastrearSolicitacao = async (
  codigoRastreio: string
): Promise<SolicitacaoRastreio> => {
  try {
    const response = await api.get<SolicitacaoRastreio>(
      `/solicitacoes/rastrear/${codigoRastreio}`,
      {
        validateStatus: (status) => status >= 200 && status < 300
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Código de rastreio não encontrado');
    }
    console.error('Erro completo:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 
      'Erro ao buscar solicitação. Tente novamente.'
    );
  }
};

/**
 * 📋 Listar todas as solicitações
 * @returns Lista de todas as solicitações
 */
export const listarSolicitacoes = async () => {
  try {
    const response = await api.get('/solicitacoes');
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 
      'Erro ao listar solicitações'
    );
  }
};

/**
 * 📄 Buscar solicitação por ID
 * @param id - ID da solicitação
 * @returns Dados da solicitação
 */
export const buscarSolicitacaoPorId = async (id: number) => {
  try {
    const response = await api.get(`/solicitacoes/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 
      'Solicitação não encontrada'
    );
  }
};

/**
 * ✅ Criar nova solicitação
 * @param solicitacao - Dados da solicitação
 * @returns Solicitação criada com código de rastreio
 */
export const criarSolicitacao = async (
  solicitacao: any
): Promise<SolicitacaoResponse> => {
  try {
    const response = await api.post<SolicitacaoResponse>(
      '/solicitacoes',
      solicitacao,
      {
        validateStatus: (status) => status >= 200 && status < 300
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 
      'Erro ao criar solicitação'
    );
  }
};

/**
 * 🔄 Atualizar status da solicitação
 * @param id - ID da solicitação
 * @param status - Novo status
 * @returns Solicitação atualizada
 */
export const atualizarStatusSolicitacao = async (
  id: number,
  status: string
) => {
  try {
    const response = await api.patch(
      `/solicitacoes/${id}/status?status=${status}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 
      'Erro ao atualizar status'
    );
  }
};

/**
 * 🗑️ Deletar solicitação
 * @param id - ID da solicitação
 */
export const deletarSolicitacao = async (id: number) => {
  try {
    await api.delete(`/solicitacoes/${id}`);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 
      'Erro ao deletar solicitação'
    );
  }
};

/**
 * 📊 Buscar solicitações por status
 * @param status - Status das solicitações
 * @returns Lista filtrada
 */
export const buscarSolicitacoesPorStatus = async (status: string) => {
  try {
    const response = await api.get(`/solicitacoes/status/${status}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 
      'Erro ao buscar solicitações por status'
    );
  }
};

/**
 * 👤 Buscar solicitações por CPF do solicitante
 * @param cpf - CPF do solicitante
 * @returns Lista de solicitações
 */
export const buscarSolicitacoesPorSolicitante = async (cpf: string) => {
  try {
    const response = await api.get(`/solicitacoes/solicitante/${cpf}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 
      'Erro ao buscar solicitações do solicitante'
    );
  }
};

// ===== FUNÇÕES AUXILIARES =====

/**
 * 🎨 Obter cor do status
 */
export const getStatusColor = (status: string): string => {
  const cores: Record<string, string> = {
    'RASCUNHO': 'gray',
    'EM_ANALISE': 'blue',
    'APROVADA': 'green',
    'EM_PREPARACAO': 'yellow',
    'DESPACHADA': 'purple',
    'ENTREGUE': 'emerald',
    'CANCELADA': 'red'
  };
  return cores[status] || 'gray';
};

/**
 * 📝 Formatar nome do status
 */
export const formatStatus = (status: string): string => {
  const nomes: Record<string, string> = {
    'RASCUNHO': 'Rascunho',
    'EM_ANALISE': 'Em Análise',
    'APROVADA': 'Aprovada',
    'EM_PREPARACAO': 'Em Preparação',
    'DESPACHADA': 'Despachada',
    'ENTREGUE': 'Entregue',
    'CANCELADA': 'Cancelada'
  };
  return nomes[status] || status;
};

/**
 * ✅ Validar código de rastreio
 */
export const validarCodigoRastreio = (codigo: string): boolean => {
  // Formato: SAFRA-2025-XXXXXXXX
  const regex = /^SAFRA-\d{4}-[A-Z0-9]{8}$/;
  return regex.test(codigo);
};