// src/components/Header.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, FileText, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (nome: string) => {
    const names = nome.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return nome.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-[hsl(var(--dark-bg))] text-primary-foreground py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="text-2xl font-bold">IPA</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-primary font-bold text-lg">S.A.F.R.A.</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/projeto"
            className="hover:text-primary transition-colors font-medium"
          >
            O Projeto
          </Link>
          <Link
            to="/sustentabilidade"
            className="hover:text-primary transition-colors font-medium"
          >
            Sustentabilidade
          </Link>
          <Link
            to="/projeto/beneficiarios"
            className="hover:text-primary transition-colors font-medium"
          >
            Parceiros
          </Link>
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-bg rounded-full">
                  <Avatar className="w-10 h-10 bg-primary hover:bg-primary/90 transition-colors cursor-pointer border-2 border-primary-foreground/20">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      {user ? getInitials(user.nome) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white border border-gray-200 shadow-lg"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.nome}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* ✅ NOVO: Minhas Solicitações */}
                <DropdownMenuItem
                  onClick={() => navigate("/minhas-solicitacoes")}
                  className="cursor-pointer focus:bg-primary/10"
                >
                  <Package className="mr-2 h-4 w-4" />
                  <span>Minhas Solicitações</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/rastreamento")}
                  className="cursor-pointer focus:bg-primary/10"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Rastrear Pedido</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <User className="w-5 h-5 text-primary-foreground" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden mt-4 flex flex-wrap gap-4 justify-center">
        <Link
          to="/projeto"
          className="hover:text-primary transition-colors text-sm font-medium"
        >
          O Projeto
        </Link>
        <Link
          to="/sustentabilidade"
          className="hover:text-primary transition-colors text-sm font-medium"
        >
          Sustentabilidade
        </Link>
        <Link
          to="/beneficiarios"
          className="hover:text-primary transition-colors text-sm font-medium"
        >
          Parceiros
        </Link>
      </nav>
    </header>
  );
};

export default Header;