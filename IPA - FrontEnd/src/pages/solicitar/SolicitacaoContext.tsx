import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SolicitacaoDTO } from '../../dto/SolicitacaoDto';

interface SolicitacaoContextType {
  solicitacao: Partial<SolicitacaoDTO>;
  atualizarSolicitacao: (dados: Partial<SolicitacaoDTO>) => void;
  limparSolicitacao: () => void;
}

const SolicitacaoContext = createContext<SolicitacaoContextType | undefined>(undefined);

export const useSolicitacao = () => {
  const context = useContext(SolicitacaoContext);
  if (!context) {
    throw new Error('useSolicitacao deve ser usado dentro de SolicitacaoProvider');
  }
  return context;
};

interface SolicitacaoProviderProps {
  children: ReactNode;
}

export const SolicitacaoProvider: React.FC<SolicitacaoProviderProps> = ({ children }) => {
  const [solicitacao, setSolicitacao] = useState<Partial<SolicitacaoDTO>>({
    // Valores padrão do usuário logado (simular por enquanto)
    solicitanteNome: "Sandre Alves",
    solicitanteCpf: "000.328.847-85",
    solicitanteMatricula: "Matrícula de Servidor IPA / Técnico de Extensão Rural",
    solicitanteTelefone: "(81) 91354-7522",
    localAtuacao: "Regional de Arcoverde - PE",
  });

  const atualizarSolicitacao = (dados: Partial<SolicitacaoDTO>) => {
    setSolicitacao(prev => ({ ...prev, ...dados }));
  };

  const limparSolicitacao = () => {
    setSolicitacao({
      solicitanteNome: "Sandre Alves",
      solicitanteCpf: "000.328.847-85",
      solicitanteMatricula: "Matrícula de Servidor IPA / Técnico de Extensão Rural",
      solicitanteTelefone: "(81) 91354-7522",
      localAtuacao: "Regional de Arcoverde - PE",
    });
  };

  return (
    <SolicitacaoContext.Provider value={{ solicitacao, atualizarSolicitacao, limparSolicitacao }}>
      {children}
    </SolicitacaoContext.Provider>
  );
};