// src/services/pedidoService.ts

export interface Etapa {
  nome: string;
  descricao: string;
  concluida: boolean;
}

export interface Pedido {
  // Identificadores
  id?: number;
  numeroRastreio?: string;
  codigoRastreio?: string;
  
  // Datas
  dataSolicitacao?: string;
  dataAtualizacao?: string;
  previsaoDespacho?: string;
  prazoFinal?: string;
  
  // Status
  status: string;
  statusEstoque?: string;
  
  // Insumo
  cultura?: string;
  variedade?: string;
  tipoInsumo?: string;
  quantidade?: number;
  unidade?: string;
  
  // Pessoas
  produtor?: string;
  beneficiarioNome?: string;
  beneficiarioCpf?: string;
  beneficiarioCaf?: string;
  solicitanteNome?: string;
  nomeFicticioCpl?: string;
  
  // Localização
  enderecoEntrega?: string;
  municipio?: string;
  municipioDestino?: string;
  localAtuacao?: string;
  
  // Etapas
  etapas?: Etapa[];
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

const API_BASE_URL = "http://localhost:8080/api";

class PedidoService {
  /**
   * Rastreia um pedido pelo código de rastreamento
   * @param codigoRastreio - Código único do pedido (ex: SAFRA-2025-A1B2C3D4)
   * @returns Promise com os dados do pedido
   */
  async rastrear(codigoRastreio: string): Promise<ApiResponse<Pedido>> {
    try {
      console.log(`🔍 Buscando pedido: ${codigoRastreio}`);
      
      const response = await fetch(
        `${API_BASE_URL}/solicitacoes/rastrear/${codigoRastreio}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      console.log(`📡 Status da resposta: ${response.status}`);

      // CORREÇÃO: Aceitar tanto 200 quanto 201 como sucesso
      if (response.ok || response.status === 201) {
        const data = await response.json();
        console.log("✅ Dados recebidos:", data);

        return {
          data: data,
          status: response.status,
        };
      }

      // Tratamento de erros específicos
      if (response.status === 404) {
        throw new Error("Pedido não encontrado. Verifique o código de rastreamento.");
      }

      if (response.status === 500) {
        throw new Error("Erro no servidor. Tente novamente mais tarde.");
      }

      // Tentar ler mensagem de erro do backend
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || `Erro ${response.status}: ${response.statusText}`;
      
      throw new Error(errorMessage);

    } catch (error) {
      console.error("❌ Erro ao rastrear pedido:", error);

      // Se for um erro de rede
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw {
          message: "Não foi possível conectar ao servidor. Verifique se o backend está rodando.",
          request: true,
        };
      }

      // Re-lançar o erro para ser tratado no componente
      throw error;
    }
  }

  /**
   * Lista todos os pedidos (para uso futuro)
   */
  async listarTodos(): Promise<ApiResponse<Pedido[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitacoes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok || response.status === 201) {
        const data = await response.json();
        return {
          data: data,
          status: response.status,
        };
      }

      throw new Error(`Erro ao listar pedidos: ${response.statusText}`);
    } catch (error) {
      console.error("Erro ao listar pedidos:", error);
      throw error;
    }
  }

  /**
   * Busca pedido por ID (para uso futuro)
   */
  async buscarPorId(id: number): Promise<ApiResponse<Pedido>> {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitacoes/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok || response.status === 201) {
        const data = await response.json();
        return {
          data: data,
          status: response.status,
        };
      }

      throw new Error(`Erro ao buscar pedido: ${response.statusText}`);
    } catch (error) {
      console.error("Erro ao buscar pedido por ID:", error);
      throw error;
    }
  }
}

// Exportar instância única do serviço
export const pedidoService = new PedidoService();

// Exportar também a classe para uso em testes
export default PedidoService;