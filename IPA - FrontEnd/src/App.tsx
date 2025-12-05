// App.tsx
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProtectedRoute from "@/components/ProtectedRoute";

// Providers
import { SolicitacaoProvider } from "./pages/solicitar/SolicitacaoContext";

// Páginas
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Registro";
import Rastreamento from "./pages/Rastreamento";
import DadosAgricultor from "./pages/solicitar/DadosAgricultor";
import DetalhesInsumo from "./pages/solicitar/DetalhesInsumo";
import Logistica from "./pages/solicitar/Logistica";
import Resumo from "./pages/solicitar/Resumo";
import Sucesso from "./pages/Sucesso";
import Contato from "./pages/Contato";
import Projeto from "./pages/Projeto";
import Beneficiarios from "./pages/Beneficiarios";
import Sustentabilidade from "./pages/Sustentabilidade";
import Ajuda from "./pages/Ajuda";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SolicitacaoProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/rastreamento" element={<Rastreamento />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/projeto" element={<Projeto />} />
            <Route path="/projeto/beneficiarios" element={<Beneficiarios />} />
            <Route path="/sustentabilidade" element={<Sustentabilidade />} />
            <Route path="/ajuda" element={<Ajuda />} />

            {/* ROTAS PROTEGIDAS */}
            <Route
              path="/solicitar/dados-agricultor"
              element={
                <ProtectedRoute>
                  <DadosAgricultor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/solicitar/detalhes"
              element={
                <ProtectedRoute>
                  <DetalhesInsumo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/solicitar/logistica"
              element={
                <ProtectedRoute>
                  <Logistica />
                </ProtectedRoute>
              }
            />
            <Route
              path="/solicitar/resumo"
              element={
                <ProtectedRoute>
                  <Resumo />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </SolicitacaoProvider>
    </QueryClientProvider>
  );
}
