import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface LoginData {
  cpf: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  cpf: string;
  senha: string;
  telefone: string;
  email: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
}

export interface AuthResponse {
  token: string;
  usuario: {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
  };
  message: string;
}

const authService = {
  // Login
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    // Salvar token e dados do usuário no localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    }
    
    return response.data;
  },

  // Cadastro
  register: async (userData: RegisterData): Promise<any> => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },

  // Verificar se está autenticado
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Obter usuário atual
  getCurrentUser: () => {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  },

  // Obter token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Validar token
  validateToken: async (): Promise<boolean> => {
    try {
      const token = authService.getToken();
      if (!token) return false;
      
      const response = await axios.get(`${API_URL}/auth/validate`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data.valid;
    } catch {
      return false;
    }
  }
};

export default authService;