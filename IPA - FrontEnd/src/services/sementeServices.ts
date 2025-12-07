// src/services/sementeService.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export interface Semente {
  id?: number;
  nome: string;
  tipo: string;
  cultura: string;
  variedade?: string;
  descricao?: string;
  estoqueDisponivel: number;
  unidadeMedida: string;
  pesoUnidade?: number;
  ativo?: boolean;
  imagemUrl?: string;
  dataCriacao?: string;
  dataAtualizacao?: string;
  observacoes?: string;
}

class SementeService {
  private getAuthToken(): string | null {
    return localStorage.getItem("safra_token");
  }

  private getHeaders(): any {
    const token = this.getAuthToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async listarTodas(): Promise<Semente[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/sementes`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao listar sementes");
    }
  }

  async listarAtivas(): Promise<Semente[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/sementes/ativas`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao listar sementes ativas");
    }
  }

  async listarPorTipo(tipo: string): Promise<Semente[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/sementes/tipo/${tipo}`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao listar sementes por tipo");
    }
  }

  async listarPorCultura(cultura: string): Promise<Semente[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/sementes/cultura/${cultura}`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao listar sementes por cultura");
    }
  }

  async buscarPorNome(nome: string): Promise<Semente[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/sementes/buscar`, {
        params: { nome },
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao buscar sementes");
    }
  }

  async buscarPorId(id: number): Promise<Semente> {
    try {
      const response = await axios.get(`${API_BASE_URL}/sementes/${id}`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Semente não encontrada");
    }
  }

  async criar(semente: Semente): Promise<any> {
    try {
      const response = await axios.post(`${API_BASE_URL}/sementes`, semente, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao cadastrar semente");
    }
  }

  async atualizar(id: number, semente: Semente): Promise<any> {
    try {
      const response = await axios.put(`${API_BASE_URL}/sementes/${id}`, semente, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao atualizar semente");
    }
  }

  async alternarStatus(id: number): Promise<any> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/sementes/${id}/status`, {}, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao alterar status");
    }
  }

  async atualizarEstoque(id: number, quantidade: number): Promise<any> {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/sementes/${id}/estoque`,
        null,
        {
          params: { quantidade },
          headers: this.getHeaders()
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao atualizar estoque");
    }
  }

  async deletar(id: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/sementes/${id}`, {
        headers: this.getHeaders()
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao deletar semente");
    }
  }
}

export const sementeService = new SementeService();
export default SementeService;