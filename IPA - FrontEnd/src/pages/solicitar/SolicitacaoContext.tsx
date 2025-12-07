import React, { createContext, useContext, useState, ReactNode } from "react";
import authService from "@/services/authService";

// ✅ Definir a interface localmente (não importar)
export interface SolicitacaoDTO {
  // IDs
  id?: number;
  solicitanteId?: number;
  beneficiarioId?: number;

  // Solicitante (Usuário IPA)
  solicitanteNome?: string;
  solicitanteCpf?: string;
  solicitanteMatricula?: string;
  solicitanteTelefone?: string;
  localAtuacao?: string;

  // Beneficiário (Agricultor)
  beneficiarioNome?: string;
  beneficiarioCpf?: string;
  beneficiarioCaf?: string;
  tipoPropriedade?: string;
  beneficiarioCep?: string;
  beneficiarioComplemento?: string;
  pontoReferencia?: string;

  // Insumo
  tipoInsumo?: string;
  cultura?: string;
  variedade?: string;
  quantidade?: number;
  unidadeMedida?: string;
  areaPlantada?: number;
  areaUnidade?: string;
  dataIdealPlantio?: string;
  finalidade?: string;

  // Logística
  formaEntrega?: string;
  municipioDestino?: string;
  enderecoEntrega?: string;
  cepEntrega?: string;
  complementoEntrega?: string;
  nomeDestinatario?: string;
  telefoneDestinatario?: string;

  // Controle
  status?: string;
  dataCriacao?: string;
  dataAtualizacao?: string;
  pedidoId?: string;
  codigoRastreio?: string;
  observacoes?: string;
}

interface SolicitacaoContextType {
  solicitacao: Partial<SolicitacaoDTO>;
  atualizarSolicitacao: (dados: Partial<SolicitacaoDTO>) => void;
  limparSolicitacao: () => void;
}

const SolicitacaoContext = createContext<SolicitacaoContextType | undefined>(
  undefined
);

export const useSolicitacao = () => {
  const context = useContext(SolicitacaoContext);
  if (!context) {
    throw new Error(
      "useSolicitacao deve ser usado dentro de SolicitacaoProvider"
    );
  }
  return context;
};

interface SolicitacaoProviderProps {
  children: ReactNode;
}

const getValoresIniciais = (): Partial<SolicitacaoDTO> => {
  const usuarioLogado = authService.getCurrentUser();

  if (usuarioLogado) {
    return {
      solicitanteNome: usuarioLogado.nome || "",
      solicitanteCpf: usuarioLogado.cpf || "",
      solicitanteMatricula: usuarioLogado.matriculaIpa || "",
      solicitanteTelefone: usuarioLogado.telefone || "",
      localAtuacao: usuarioLogado.localAtuacao || "",
    };
  }

  return {};
};

export const SolicitacaoProvider: React.FC<SolicitacaoProviderProps> = ({
  children,
}) => {
  const [solicitacao, setSolicitacao] = useState<Partial<SolicitacaoDTO>>(
    getValoresIniciais()
  );

  const atualizarSolicitacao = (dados: Partial<SolicitacaoDTO>) => {
    setSolicitacao((prev) => ({ ...prev, ...dados }));
  };

  const limparSolicitacao = () => {
    setSolicitacao(getValoresIniciais());
  };

  return (
    <SolicitacaoContext.Provider
      value={{ solicitacao, atualizarSolicitacao, limparSolicitacao }}
    >
      {children}
    </SolicitacaoContext.Provider>
  );
};