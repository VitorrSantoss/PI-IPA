import api from './Api';

export interface Semente {
  id?: number;
  nome: string;
  variedade: string;
  quantidade: number;
  preco: number;
  descricao?: string;
}

export const sementeService = {
  listarTodas: async () => {
    const response = await api.get<Semente[]>('/sementes');
    return response.data;
  },

  buscarPorId: async (id: number) => {
    const response = await api.get<Semente>(`/sementes/${id}`);
    return response.data;
  },

  criar: async (semente: Semente) => {
    const response = await api.post<Semente>('/sementes', semente);
    return response.data;
  },

  atualizar: async (id: number, semente: Semente) => {
    const response = await api.put<Semente>(`/sementes/${id}`, semente);
    return response.data;
  },

  deletar: async (id: number) => {
    await api.delete(`/sementes/${id}`);
  }
};