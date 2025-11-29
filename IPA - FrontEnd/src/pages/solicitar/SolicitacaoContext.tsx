import React, { createContext, useContext, useState, ReactNode } from "react";
import { SolicitacaoDTO } from "@/services/solicitacaoservice";
import authService from "@/services/authService";

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
