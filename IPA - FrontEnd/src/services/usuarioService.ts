import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
}

const usuarioService = {
  listarUsuarios: async (): Promise<Usuario[]> => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },

  buscarPorId: async (id: number): Promise<Usuario> => {
    const response = await axios.get(`${API_URL}/usuarios/${id}`);
    return response.data;
  },

  buscarPorCpf: async (cpf: string): Promise<Usuario> => {
    const response = await axios.get(`${API_URL}/usuarios/cpf/${cpf}`);
    return response.data;
  },

  criar: async (usuario: Omit<Usuario, 'id'>): Promise<Usuario> => {
    const response = await axios.post(`${API_URL}/usuarios`, usuario);
    return response.data;
  },

  atualizar: async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
    const response = await axios.put(`${API_URL}/usuarios/${id}`, usuario);
    return response.data;
  },

  deletar: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/usuarios/${id}`);
  },

  verificarCpf: async (cpf: string): Promise<boolean> => {
    const response = await axios.get(`${API_URL}/usuarios/verificar-cpf/${cpf}`);
    return response.data;
  }
};

export default usuarioService;