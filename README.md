# S.A.F.R.A. - Sistema de Aquisição, Fiscalização e Rastreamento Agrícola

<div align="center">

![S.A.F.R.A. Logo](src/assets/safra-icon.png)

**Instituto Agrônomo de Pernambuco**

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-cyan.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

</div>

---

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Problema e Solução](#-problema-e-solução)
- [Objetivos](#-objetivos)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura do Sistema](#-arquitetura-do-sistema)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Execução do Projeto](#-execução-do-projeto)
- [Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [Fluxo de Navegação](#-fluxo-de-navegação)
- [Design System](#-design-system)
- [Padrões de Código](#-padrões-de-código)
- [Testes](#-testes)
- [Deployment](#-deployment)
- [Impacto Social](#-impacto-social)
- [Contribuindo](#-contribuindo)
- [Roadmap](#-roadmap)
- [Equipe](#-equipe)
- [Licença](#-licença)
- [Referências](#-referências)

---

## 🌾 Visão Geral

O **S.A.F.R.A.** (Sistema de Aquisição, Fiscalização e Rastreamento Agrícola) é uma plataforma digital desenvolvida para o Instituto Agrônomo de Pernambuco (IPA) com o objetivo de centralizar e otimizar a logística de aquisição e distribuição de sementes e mudas de alta qualidade em todo o estado de Pernambuco.

Este sistema representa uma transformação digital no processo de gestão agrícola, integrando tecnologia, transparência e eficiência para garantir que agricultores familiares e produtores rurais tenham acesso facilitado a insumos essenciais, promovendo o aumento da produtividade e a segurança alimentar regional.

### 🎯 Missão

Democratizar o acesso a insumos agrícolas de qualidade através de uma plataforma tecnológica que garanta rastreabilidade completa, transparência nos processos e eficiência logística, fortalecendo a agricultura familiar e promovendo o desenvolvimento sustentável do agronegócio pernambucano.

---

## 🔍 Problema e Solução

### Problema Identificado

O setor agrícola pernambucano, especialmente a agricultura familiar, enfrenta diversos desafios:

1. **Dificuldade de Acesso**: Agricultores de regiões remotas têm dificuldade em acessar insumos de qualidade
2. **Falta de Rastreabilidade**: Ausência de controle sobre a origem e qualidade das sementes e mudas
3. **Processos Manuais**: Gestão de estoque e logística realizadas de forma manual e descentralizada
4. **Ineficiência Logística**: Desperdício de recursos e atrasos nas entregas
5. **Falta de Transparência**: Dificuldade em fiscalizar e auditar processos de distribuição
6. **Baixa Produtividade**: Uso de insumos de baixa qualidade ou inadequados para a região

### Solução Proposta

O S.A.F.R.A. oferece uma solução integrada que:

- ✅ **Centraliza** a gestão de solicitações, estoque e logística em uma única plataforma
- ✅ **Rastreia** cada etapa do processo, desde a solicitação até o plantio
- ✅ **Automatiza** processos de aprovação, fiscalização e distribuição
- ✅ **Otimiza** rotas logísticas e reduz desperdícios
- ✅ **Garante** transparência através de dados em tempo real
- ✅ **Democratiza** o acesso a insumos certificados de alta qualidade

---

## 🎯 Objetivos

### Objetivos Gerais

- Desenvolver uma plataforma web responsiva e acessível para gestão de distribuição de insumos agrícolas
- Implementar sistema completo de rastreabilidade desde a solicitação até o plantio
- Promover a inclusão digital e o acesso à tecnologia no meio rural

### Objetivos Específicos

1. **Gestão de Solicitações**
   - Permitir cadastro digital de solicitações de sementes e mudas
   - Validar dados de agricultores e propriedades
   - Gerenciar aprovações e fiscalizações

2. **Rastreamento Logístico**
   - Implementar sistema de tracking em tempo real
   - Gerar códigos únicos de rastreamento
   - Notificar status de pedidos

3. **Controle de Estoque**
   - Gerenciar estoque de sementes e mudas
   - Alertar sobre níveis críticos
   - Otimizar distribuição baseada em demanda

4. **Transparência e Auditoria**
   - Registrar todas as transações e movimentações
   - Gerar relatórios para análise e auditoria
   - Garantir compliance com normas fiscalizadoras

---

## ⚡ Funcionalidades

### 1. Portal Institucional
- Página inicial com informações sobre o projeto
- Seção "Sobre o Projeto" com missão e objetivos
- Página de Beneficiários (agricultores e empresas)
- Perfil de Sustentabilidade
- FAQ e Central de Ajuda

### 2. Sistema de Autenticação
- Login com CPF/CNPJ e senha
- Recuperação de senha
- Controle de acesso por perfil (Agricultor, Técnico, Gestor)

### 3. Solicitação de Insumos
- **Etapa 1**: Dados do Agricultor Beneficiado
  - Cadastro completo com validação de CPF
  - Informações de propriedade e localização
  - Validação de CAF (Cadastro da Agricultura Familiar)
- **Etapa 2**: Detalhes do Insumo
  - Seleção de tipo (sementes ou mudas)
  - Escolha de cultura e variedade
  - Especificação de quantidade e área de plantio
  - Data ideal de plantio
- **Etapa 3**: Logística
  - Escolha entre retirada ou entrega a domicílio
  - Definição de ponto de entrega/retirada
  - Contato do destinatário
- **Etapa 4**: Resumo e Confirmação
  - Revisão completa da solicitação
  - Confirmação final do pedido

### 4. Rastreamento de Pedidos
- Busca por número de rastreio
- Visualização de status em tempo real
- Timeline detalhada do processo:
  - Solicitação Registrada
  - Em Análise Fiscal (IPA)
  - Liberação de Estoque
  - Em Rota Logística
  - Entregue/Retirado
- Previsão de prazos
- Detalhes completos do pedido

### 5. Central de Contato
- Formulário de contato estruturado
- Canais de atendimento especializados:
  - Suporte Técnico
  - Logística e Rastreamento
  - Parcerias e Credenciamento

---

## 🏗️ Arquitetura do Sistema

### Arquitetura de Alto Nível

```
┌─────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   React UI   │  │  Tailwind    │  │  shadcn/ui   │  │
│  │  Components  │  │     CSS      │  │  Components  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  CAMADA DE ROTEAMENTO                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │         React Router DOM v6                      │   │
│  │  (Navegação SPA com Code Splitting)              │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                CAMADA DE GERENCIAMENTO DE ESTADO         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ React Hooks  │  │ TanStack     │  │   Context    │  │
│  │ (useState,   │  │    Query     │  │     API      │  │
│  │  useEffect)  │  │ (Cache/Sync) │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   CAMADA DE SERVIÇOS                     │
│  ┌──────────────────────────────────────────────────┐   │
│  │            API Services (Futura)                  │   │
│  │  - Autenticação JWT                              │   │
│  │  - CRUD de Solicitações                          │   │
│  │  - Rastreamento                                  │   │
│  │  - Gestão de Estoque                             │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Fluxo de Dados

```
Usuário → UI Component → Event Handler → State Update → 
Re-render → API Call (futuro) → State Update → UI Update
```

### Padrões Arquiteturais

- **Component-Based Architecture**: Componentes reutilizáveis e modulares
- **Container/Presentational Pattern**: Separação de lógica e apresentação
- **Custom Hooks**: Encapsulamento de lógica reutilizável
- **Composition over Inheritance**: Composição de componentes
- **Single Responsibility Principle**: Cada componente tem uma responsabilidade única

---

## 🛠️ Tecnologias Utilizadas

### Frontend Core

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **React** | 18.3.1 | Biblioteca JavaScript para construção de interfaces |
| **TypeScript** | 5.8.3 | Superset JavaScript com tipagem estática |
| **Vite** | 5.4.19 | Build tool e dev server ultra-rápido |
| **React Router DOM** | 6.30.1 | Roteamento para Single Page Applications |

### UI e Estilização

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Tailwind CSS** | 3.4.17 | Framework CSS utility-first |
| **shadcn/ui** | Latest | Biblioteca de componentes acessíveis |
| **Radix UI** | Latest | Primitives acessíveis para React |
| **Lucide React** | 0.462.0 | Ícones modernos e otimizados |
| **class-variance-authority** | 0.7.1 | Gerenciamento de variantes de componentes |

### Gerenciamento de Estado e Dados

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **TanStack Query** | 5.83.0 | Data fetching e cache |
| **React Hook Form** | 7.61.1 | Gerenciamento de formulários |
| **Zod** | 3.25.76 | Validação de schemas TypeScript-first |

### Utilitários

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **date-fns** | 3.6.0 | Biblioteca de manipulação de datas |
| **clsx** | 2.1.1 | Utilitário para classes condicionais |
| **tailwind-merge** | 2.6.0 | Merge inteligente de classes Tailwind |
| **sonner** | 1.7.4 | Toast notifications |

### Desenvolvimento

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **ESLint** | 9.32.0 | Linter JavaScript/TypeScript |
| **PostCSS** | 8.5.6 | Transformador de CSS |
| **Autoprefixer** | 10.4.21 | Plugin PostCSS para vendor prefixes |

---

## 📁 Estrutura do Projeto

```
IPA - FrontEnd/
│
├── public/                      # Arquivos estáticos
│   └── assets/                  # Imagens e recursos
│
├── src/
│   ├── assets/                  # Assets do projeto
│   │   ├── *.jpg               # Imagens do sistema
│   │   └── *.png               # Logos e ícones
│   │
│   ├── components/              # Componentes reutilizáveis
│   │   ├── ui/                 # Componentes da UI (shadcn/ui)
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (outros componentes)
│   │   │
│   │   ├── Header.tsx          # Cabeçalho do site
│   │   ├── Footer.tsx          # Rodapé do site
│   │   └── NavLink.tsx         # Componente de navegação
│   │
│   ├── hooks/                   # Custom React Hooks
│   │   ├── use-mobile.tsx      # Hook para detecção mobile
│   │   └── use-toast.ts        # Hook para notificações
│   │
│   ├── lib/                     # Bibliotecas e utilitários
│   │   └── utils.ts            # Funções utilitárias (cn, etc)
│   │
│   ├── pages/                   # Páginas da aplicação
│   │   ├── Index.tsx           # Página inicial
│   │   ├── Login.tsx           # Página de login
│   │   ├── Rastreamento.tsx    # Rastreamento de pedidos
│   │   ├── Contato.tsx         # Formulário de contato
│   │   ├── Projeto.tsx         # Sobre o projeto
│   │   ├── Beneficiarios.tsx   # Beneficiários do programa
│   │   ├── Sustentabilidade.tsx # Perfil de sustentabilidade
│   │   ├── Ajuda.tsx           # Central de ajuda
│   │   ├── Sucesso.tsx         # Confirmação de solicitação
│   │   ├── NotFound.tsx        # Página 404
│   │   │
│   │   └── solicitar/          # Fluxo de solicitação
│   │       ├── DadosAgricultor.tsx    # Etapa 1
│   │       ├── DetalhesInsumo.tsx     # Etapa 2
│   │       ├── Logistica.tsx          # Etapa 3
│   │       └── Resumo.tsx             # Etapa 4
│   │
│   ├── App.tsx                  # Componente raiz
│   ├── App.css                  # Estilos globais da aplicação
│   ├── index.css                # Estilos base e variáveis CSS
│   ├── main.tsx                 # Entry point da aplicação
│   └── vite-env.d.ts           # Tipos do Vite
│
├── .gitignore                   # Arquivos ignorados pelo Git
├── components.json              # Configuração shadcn/ui
├── eslint.config.js            # Configuração ESLint
├── index.html                   # HTML principal
├── package.json                 # Dependências e scripts
├── postcss.config.js           # Configuração PostCSS
├── tailwind.config.ts          # Configuração Tailwind CSS
├── tsconfig.json               # Configuração TypeScript principal
├── tsconfig.app.json           # Config TypeScript para app
├── tsconfig.node.json          # Config TypeScript para Node
├── vite.config.ts              # Configuração Vite
└── README.md                    # Este arquivo
```

### Organização de Componentes

```
components/
├── ui/                    # Componentes primitivos (shadcn/ui)
│   ├── Botões
│   ├── Formulários
│   ├── Modais
│   ├── Tabelas
│   └── Cards
│
└── layout/               # Componentes de layout
    ├── Header
    ├── Footer
    └── Navigation
```

### Organização de Pages

```
pages/
├── Institucionais        # Páginas informativas
│   ├── Index
│   ├── Projeto
│   ├── Beneficiarios
│   └── Sustentabilidade
│
├── Funcionalidades      # Páginas funcionais
│   ├── Login
│   ├── Rastreamento
│   └── solicitar/
│
└── Suporte             # Páginas de suporte
    ├── Contato
    ├── Ajuda
    └── NotFound
```

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 18.0.0 (recomendado: 20.x LTS)
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- **Git** >= 2.30.0
- Editor de código (recomendado: **VS Code**)

### VS Code Extensions Recomendadas

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

---

## 🚀 Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/ipa-pernambuco/safra-frontend.git
cd safra-frontend
```

### 2. Instale as Dependências

```bash
# Usando npm
npm install

# Ou usando yarn
yarn install
```

### 3. Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações da API (quando implementada)
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# Configurações de Ambiente
VITE_ENV=development

# Google Maps API (se necessário no futuro)
# VITE_GOOGLE_MAPS_KEY=your_key_here
```

### 4. Verificar Instalação

```bash
# Verificar versão do Node
node --version

# Verificar versão do npm
npm --version

# Listar dependências instaladas
npm list --depth=0
```

---

## 💻 Execução do Projeto

### Modo Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Ou com yarn
yarn dev
```

O projeto estará disponível em: `http://localhost:8080`

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Ou com yarn
yarn build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### Preview do Build

```bash
# Visualizar build de produção localmente
npm run preview

# Ou com yarn
yarn preview
```

### Linting

```bash
# Executar linter
npm run lint

# Ou com yarn
yarn lint
```

### Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run build:dev` | Build em modo desenvolvimento |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Executa ESLint |

---

## 🎨 Design System

### Paleta de Cores

O sistema utiliza um esquema de cores baseado em HSL (Hue, Saturation, Lightness):

```css
/* Cores Principais */
--primary: 145 100% 33%        /* Verde principal do IPA */
--primary-foreground: 0 0% 100% /* Branco */

/* Cores Secundárias */
--secondary: 145 30% 95%        /* Verde claro */
--secondary-foreground: 145 100% 25% /* Verde escuro */

/* Cores de Destaque */
--accent: 145 60% 45%           /* Verde de destaque */
--accent-foreground: 0 0% 100%  /* Branco */

/* Cores de Background */
--background: 0 0% 100%         /* Branco */
--foreground: 0 0% 15%          /* Preto suave */
--dark-bg: 0 0% 15%            /* Fundo escuro */

/* Cores Utilitárias */
--success: 145 100% 33%         /* Verde de sucesso */
--warning: 35 100% 50%          /* Laranja de aviso */
--destructive: 0 84% 60%        /* Vermelho de erro */

/* Cores Neutras */
--muted: 0 0% 96%              /* Cinza claro */
--muted-foreground: 0 0% 45%   /* Cinza médio */
--border: 0 0% 90%             /* Borda */
```

### Tipografia

```css
/* Font Families */
font-family: system-ui, -apple-system, sans-serif;

/* Tamanhos */
text-xs: 0.75rem    /* 12px */
text-sm: 0.875rem   /* 14px */
text-base: 1rem     /* 16px */
text-lg: 1.125rem   /* 18px */
text-xl: 1.25rem    /* 20px */
text-2xl: 1.5rem    /* 24px */
text-3xl: 1.875rem  /* 30px */
text-4xl: 2.25rem   /* 36px */
```

### Espaçamento

```css
/* Sistema de espaçamento baseado em 0.25rem (4px) */
p-1: 0.25rem   /* 4px */
p-2: 0.5rem    /* 8px */
p-4: 1rem      /* 16px */
p-6: 1.5rem    /* 24px */
p-8: 2rem      /* 32px */
p-12: 3rem     /* 48px */
```

### Componentes UI

Todos os componentes seguem os padrões do **shadcn/ui** com customizações:

- Acessibilidade (ARIA)
- Responsividade mobile-first
- Dark mode ready (preparado)
- Animações sutis
- Estados de hover, focus e disabled

---

## 📐 Padrões de Código

### Nomenclatura

#### Componentes React
```typescript
// PascalCase para componentes
export const UserProfile = () => { ... }
export default LoginPage;
```

#### Funções e Variáveis
```typescript
// camelCase para funções e variáveis
const handleSubmit = () => { ... }
const userData = {...}
```

#### Interfaces e Types
```typescript
// PascalCase com prefixo I para interfaces (opcional)
interface UserData { ... }
type FormState = { ... }
```

#### Arquivos
```
ComponentName.tsx        # Componentes React
utils.ts                # Utilitários
use-custom-hook.tsx     # Custom hooks
index.ts                # Barrel exports
```

### Estrutura de Componentes

```typescript
// 1. Imports
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  onSubmit: () => void;
}

// 3. Componente
export const MyComponent = ({ title, onSubmit }: ComponentProps) => {
  // 3.1 Hooks
  const [isOpen, setIsOpen] = useState(false);
  
  // 3.2 Handlers
  const handleClick = () => {
    setIsOpen(!isOpen);
    onSubmit();
  };
  
  // 3.3 Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>
        {isOpen ? "Fechar" : "Abrir"}
      </Button>
    </div>
  );
};
```

### Boas Práticas

#### 1. Componentes Pequenos e Focados
```typescript
// ❌ Evitar
const HugePage = () => {
  // 500 linhas de código
}

// ✅ Preferir
const Header = () => { ... }
const Content = () => { ... }
const Footer = () => { ... }
```

#### 2. Extrair Lógica Complexa
```typescript
// ❌ Evitar lógica complexa no JSX
<div>
  {users.filter(u => u.active)
        .map(u => ({ ...u, name: u.name.toUpperCase() }))
        .sort((a, b) => a.name.localeCompare(b.name))}
</div>

// ✅ Extrair para variável ou função
const activeUsers = getActiveUsers(users);

<div>{activeUsers}</div>
```

#### 3. Tipagem Forte
```typescript
// ❌ Evitar any
const handleData = (data: any) => { ... }

// ✅ Definir tipos específicos
interface RequestData {
  id: number;
  name: string;
}

const handleData = (data: RequestData) => { ... }
```

#### 4. Composição sobre Herança
```typescript
// ✅ Compor componentes
const Card = ({ children }) => (
  <div className="card">{children}</div>
);

const UserCard = ({ user }) => (
  <Card>
    <h2>{user.name}</h2>
  </Card>
);
```

---

## 🧪 Testes

### Estrutura de Testes (A Implementar)

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
├── pages/
│   ├── Login.tsx
│   └── Login.test.tsx
└── utils/
    ├── helpers.ts
    └── helpers.test.ts
```

### Ferramentas Recomendadas

- **Vitest**: Framework de testes
- **React Testing Library**: Testes de componentes
- **MSW**: Mock Service Worker para API mocking
- **Playwright**: Testes E2E

### Exemplo de Teste

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

---

## 🌐 Deployment

### Build de Produção

```bash
# 1. Criar build otimizado
npm run build

# 2. Verificar tamanho dos arquivos
npm run preview

#
