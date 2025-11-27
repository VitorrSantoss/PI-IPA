import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface SolicitacaoDTO {
  id?: number;

  // Dados do Solicitante
  solicitanteNome: string;
  solicitanteCpf: string;
  solicitanteMatricula?: string;
  solicitanteTelefone: string;
  localAtuacao: string;

  // Dados do Beneficiário
  beneficiarioNome: string;
  beneficiarioCpf: string;
  beneficiarioCaf?: string;
  tipoPropriedade: string;
  beneficiarioCep: string;
  beneficiarioComplemento?: string;
  pontoReferencia?: string;

  // Detalhes do Insumo
  tipoInsumo: string;
  cultura: string;
  variedade?: string;
  quantidade: number;
  unidadeMedida: string;
  areaPlantada?: number;
  areaUnidade?: string;
  dataIdealPlantio?: string;
  finalidade: string;

  // Logística
  formaEntrega: string;
  municipioDestino: string;
  enderecoEntrega: string;
  cepEntrega: string;
  complementoEntrega?: string;
  nomeDestinatario: string;
  telefoneDestinatario: string;

  // Controle
  status?: string;
  dataCriacao?: string;
  dataAtualizacao?: string;
  pedidoId?: number;
  observacoes?: string;
}

const solicitacaoService = {
  listarTodas: async (): Promise<SolicitacaoDTO[]> => {
    const response = await axios.get(`${API_URL}/solicitacoes`);
    return response.data;
  },

  buscarPorId: async (id: number): Promise<SolicitacaoDTO> => {
    const response = await axios.get(`${API_URL}/solicitacoes/${id}`);
    return response.data;
  },

  criar: async (solicitacao: SolicitacaoDTO): Promise<SolicitacaoDTO> => {
    const response = await axios.post(`${API_URL}/solicitacoes`, solicitacao);
    return response.data;
  },

  atualizar: async (id: number, solicitacao: SolicitacaoDTO): Promise<SolicitacaoDTO> => {
    const response = await axios.put(`${API_URL}/solicitacoes/${id}`, solicitacao);
    return response.data;
  },

  atualizarStatus: async (id: number, status: string): Promise<SolicitacaoDTO> => {
    const response = await axios.patch(`${API_URL}/solicitacoes/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  },

  deletar: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/solicitacoes/${id}`);
  },
};

export default solicitacaoService;