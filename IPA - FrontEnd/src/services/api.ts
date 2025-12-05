// src/services/api.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// ✅ Mesma chave usada no authService
const TOKEN_KEY = 'safra_token';

// Criar instância do Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ INTERCEPTOR: Adiciona o token automaticamente em TODAS as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token adicionado ao header:', token.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ Nenhum token encontrado no localStorage');
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Erro no interceptor de requisição:', error);
    return Promise.reject(error);
  }
);

// ✅ INTERCEPTOR de RESPOSTA: Trata erros de autenticação
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se receber 401 (Unauthorized) ou 403 (Forbidden)
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error('🚫 Acesso negado. Token inválido ou expirado.');
      
      // Limpar localStorage e redirecionar para login
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('safra_user');
      
      // Redirecionar para login
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;