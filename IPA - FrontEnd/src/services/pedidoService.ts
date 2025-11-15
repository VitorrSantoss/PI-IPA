import api from './Api';

export interface Pedido {
  id: number;
  numeroRastreio: string;
  dataSolicitacao: string;
  status: string;
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
  etapas: {
    nome: string;
    descricao: string;
    concluida: boolean;
  }[];
}

export const pedidoService = {
  rastrear: (codigo: string) => api.get<Pedido>(`/pedidos/rastrear/${codigo}`),
  listarTodos: () => api.get<Pedido[]>('/pedidos')
};