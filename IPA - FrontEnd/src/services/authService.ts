import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// ✅ Usar as MESMAS chaves do AuthContext
const TOKEN_KEY = "safra_token";
const USER_KEY = "safra_user";

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
  matriculaIpa?: string;
  localAtuacao?: string;
  cidade?: string;
  uf?: string;
}

export interface AuthResponse {
  token: string;
  usuario: {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    matriculaIpa?: string;
    localAtuacao?: string;
    cidade?: string;
    uf?: string;
  };
  message: string;
}

const authService = {
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);

    if (response.data.token) {
      // ✅ Usar as mesmas chaves do AuthContext
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.usuario));
      
      console.log("✅ Dados salvos no localStorage:", {
        token: response.data.token,
        usuario: response.data.usuario
      });
    }

    return response.data;
  },

  register: async (userData: RegisterData): Promise<any> => {
    const response = await axios.post(`${API_URL}/auth/register`, {
      nome: userData.nome,
      cpf: userData.cpf,
      telefone: userData.telefone,
      email: userData.email,
      matriculaIpa: userData.matriculaIpa,
      localAtuacao: userData.localAtuacao,
      senha: userData.senha,
      cidade: userData.cidade,
      uf: userData.uf,
    });
    return response.data;
  },

  logout: () => {
    // ✅ Limpar as mesmas chaves do AuthContext
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    console.log("👋 Logout realizado, localStorage limpo");
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  },

  getCurrentUser: () => {
    const usuario = localStorage.getItem(USER_KEY);
    const user = usuario ? JSON.parse(usuario) : null;
    
    console.log("🔍 getCurrentUser chamado:", user);
    
    return user;
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  validateToken: async (): Promise<boolean> => {
    try {
      const token = authService.getToken();
      if (!token) return false;

      const response = await axios.get(`${API_URL}/auth/validate`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.valid;
    } catch {
      return false;
    }
  },
};

export default authService;