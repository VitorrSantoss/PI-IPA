import api from './api';

// ✅ Objeto com todos os métodos do serviço
const usuarioService = {
  // Listar todos os usuários
  listarUsuarios: async () => {
    try {
      const response = await api.get('/usuarios');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw error;
    }
  },

  // Buscar usuário por ID
  buscarUsuarioPorId: async (id) => {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error);
      throw error;
    }
  },

  // Criar novo usuário
  criarUsuario: async (usuario) => {
    try {
      const response = await api.post('/usuarios', usuario);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },

  // Atualizar usuário
  atualizarUsuario: async (id, usuario) => {
    try {
      const response = await api.put(`/usuarios/${id}`, usuario);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário ${id}:`, error);
      throw error;
    }
  },

  // Deletar usuário
  deletarUsuario: async (id) => {
    try {
      const response = await api.delete(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar usuário ${id}:`, error);
      throw error;
    }
  }
};

// ✅ EXPORT DEFAULT - IMPORTANTE!
export default usuarioService;