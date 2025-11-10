import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rastreamento" element={<Rastreamento />} />
          <Route path="/solicitar/dados-agricultor" element={<DadosAgricultor />} />
          <Route path="/solicitar/detalhes" element={<DetalhesInsumo />} />
          <Route path="/solicitar/logistica" element={<Logistica />} />
          <Route path="/solicitar/resumo" element={<Resumo />} />
          <Route path="/sucesso" element={<Sucesso />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/projeto" element={<Projeto />} />
          <Route path="/projeto/beneficiarios" element={<Beneficiarios />} />
          <Route path="/sustentabilidade" element={<Sustentabilidade />} />
          <Route path="/ajuda" element={<Ajuda />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
