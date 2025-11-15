import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
  ativo: boolean;
}

const usuarioService = {
  listarUsuarios: async (): Promise<Usuario[]> => {
    try {
      const response = await axios.get<Usuario[]>(`${API_URL}/usuarios`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw error;
    }
  },

  buscarPorId: async (id: number): Promise<Usuario> => {
    const response = await axios.get<Usuario>(`${API_URL}/usuarios/${id}`);
    return response.data;
  },

  criar: async (usuario: Omit<Usuario, 'id'>): Promise<Usuario> => {
    const response = await axios.post<Usuario>(`${API_URL}/usuarios`, usuario);
    return response.data;
  },

  atualizar: async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
    const response = await axios.put<Usuario>(`${API_URL}/usuarios/${id}`, usuario);
    return response.data;
  },

  deletar: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/usuarios/${id}`);
  }
};

export default usuarioService;