// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  nome: string;
  email: string;
  cpf?: string;
  tipo?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("safra_token");
    const storedUser = localStorage.getItem("safra_user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        console.log("✅ Sessão restaurada do localStorage");
      } catch (error) {
        console.error("❌ Erro ao restaurar sessão:", error);
        localStorage.removeItem("safra_token");
        localStorage.removeItem("safra_user");
      }
    }
  }, []);

  const login = (data: any) => {
    console.log("🔐 Dados recebidos do backend:", data);

    // O backend pode retornar { token, usuario } ou { token, user }
    const userToken = data.token;
    const userData = data.usuario || data.user;

    if (!userToken || !userData) {
      console.error("❌ Dados de login incompletos:", data);
      throw new Error("Dados de autenticação inválidos");
    }

    // Normalizar o objeto do usuário
    const normalizedUser: User = {
      id: String(userData.id),
      nome: userData.nome,
      email: userData.email,
      cpf: userData.cpf,
      tipo: userData.tipo,
    };

    // Salvar no estado
    setToken(userToken);
    setUser(normalizedUser);

    // Salvar no localStorage
    localStorage.setItem("safra_token", userToken);
    localStorage.setItem("safra_user", JSON.stringify(normalizedUser));

    console.log("✅ Login realizado com sucesso:", normalizedUser);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("safra_token");
    localStorage.removeItem("safra_user");
    console.log("👋 Usuário deslogado");
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}