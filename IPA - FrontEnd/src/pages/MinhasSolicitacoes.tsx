import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search, Package, Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";
import { buscarSolicitacoesPorSolicitante } from "@/services/solicitacaoservice";
import { format } from "date-fns";

interface Solicitacao {
  id: number;
  codigoRastreio: string;
  status: string;
  dataCriacao: string;
  tipoInsumo: string;
  cultura: string;
  quantidade: number;
  unidadeMedida: string;
  beneficiarioNome: string;
  municipioDestino: string;
}

const MinhasSolicitacoes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  const carregarSolicitacoes = async () => {
    if (!user?.cpf) {
      toast.error("Usuário não autenticado");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      console.log("🔍 Buscando solicitações do CPF:", user.cpf);
      const dados = await buscarSolicitacoesPorSolicitante(user.cpf);
      console.log("✅ Solicitações carregadas:", dados);
      setSolicitacoes(dados);
    } catch (error: any) {
      console.error("❌ Erro ao carregar solicitações:", error);
      toast.error("Erro ao carregar suas solicitações");
    } finally {
      setLoading(false);
    }
  };

  const solicitacoesFiltradas = solicitacoes.filter(
    (s) =>
      s.codigoRastreio?.toLowerCase().includes(filtro.toLowerCase()) ||
      s.cultura?.toLowerCase().includes(filtro.toLowerCase()) ||
      s.beneficiarioNome?.toLowerCase().includes(filtro.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const cores: Record<string, string> = {
      RASCUNHO: "bg-gray-500",
      EM_ANALISE: "bg-blue-500",
      APROVADA: "bg-green-500",
      EM_PREPARACAO: "bg-yellow-500",
      DESPACHADA: "bg-purple-500",
      ENTREGUE: "bg-emerald-500",
      CANCELADA: "bg-red-500",
    };
    return cores[status] || "bg-gray-500";
  };

  const formatStatus = (status: string) => {
    const nomes: Record<string, string> = {
      RASCUNHO: "Rascunho",
      EM_ANALISE: "Em Análise",
      APROVADA: "Aprovada",
      EM_PREPARACAO: "Em Preparação",
      DESPACHADA: "Despachada",
      ENTREGUE: "Entregue",
      CANCELADA: "Cancelada",
    };
    return nomes[status] || status;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Minhas Solicitações
            </h1>
            <p className="text-muted-foreground">
              Acompanhe todas as suas solicitações de insumos agrícolas
            </p>
          </div>

          {/* Barra de busca */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por código, cultura ou beneficiário..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : solicitacoesFiltradas.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {filtro
                    ? "Nenhuma solicitação encontrada"
                    : "Você ainda não fez nenhuma solicitação"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {filtro
                    ? "Tente buscar com outros termos"
                    : "Comece criando sua primeira solicitação de insumos"}
                </p>
                {!filtro && (
                  <Button onClick={() => navigate("/solicitar/dados-agricultor")}>
                    Nova Solicitação
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Resumo */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-primary">
                      {solicitacoes.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-blue-500">
                      {
                        solicitacoes.filter((s) => s.status === "EM_ANALISE")
                          .length
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Em Análise
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-green-500">
                      {
                        solicitacoes.filter((s) => s.status === "APROVADA")
                          .length
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Aprovadas
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-emerald-500">
                      {
                        solicitacoes.filter((s) => s.status === "ENTREGUE")
                          .length
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Entregues
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lista de solicitações */}
              <div className="space-y-4">
                {solicitacoesFiltradas.map((solicitacao) => (
                  <Card
                    key={solicitacao.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() =>
                      navigate(`/rastreamento?codigo=${solicitacao.codigoRastreio}`)
                    }
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg font-mono">
                            {solicitacao.codigoRastreio}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {format(
                              new Date(solicitacao.dataCriacao),
                              "dd/MM/yyyy 'às' HH:mm"
                            )}
                          </div>
                        </div>
                        <Badge
                          className={`${getStatusColor(
                            solicitacao.status
                          )} text-white`}
                        >
                          {formatStatus(solicitacao.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-semibold text-primary mb-1">
                            Insumo
                          </div>
                          <div>
                            {solicitacao.tipoInsumo} - {solicitacao.cultura}
                          </div>
                          <div className="text-muted-foreground">
                            {solicitacao.quantidade} {solicitacao.unidadeMedida}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-primary mb-1">
                            Beneficiário
                          </div>
                          <div>{solicitacao.beneficiarioNome}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-primary mb-1 flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            Destino
                          </div>
                          <div>{solicitacao.municipioDestino}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Botão de nova solicitação */}
          {!loading && solicitacoes.length > 0 && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => navigate("/solicitar/dados-agricultor")}
                size="lg"
              >
                Nova Solicitação
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MinhasSolicitacoes;