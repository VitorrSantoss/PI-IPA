import { useState, useEffect } from "react";
import { Search, CheckCircle, Package, Truck, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import vegetablesHero from "@/assets/vegetables-hero.jpg";
import { pedidoService, Pedido } from "@/services/pedidoService";

const Rastreamento = () => {
  const [codigoBusca, setCodigoBusca] = useState("");
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar pedido da URL (se houver)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get('codigo');
    if (codigo) {
      setCodigoBusca(codigo);
      buscarPedido(codigo);
    }
  }, []);

  const buscarPedido = async (codigo: string) => {
    if (!codigo.trim()) {
      setError('Digite um código de rastreamento');
      return;
    }

    console.log('🔍 Iniciando busca por:', codigo);
    
    try {
      setLoading(true);
      setError(null);
      setPedido(null); // Limpa pedido anterior
      
      const response = await pedidoService.rastrear(codigo);
      
      console.log('✅ Resposta completa:', response);
      console.log('📦 Dados do pedido:', response.data);
      
      if (response.data) {
        setPedido(response.data);
      } else {
        setError('Pedido não encontrado');
      }
      
    } catch (err: any) {
      console.error('❌ Erro capturado:', err);
      
      // Tratamento de erros mais específico
      if (err.response) {
        // O servidor respondeu com erro
        const message = err.response.data?.message || 'Pedido não encontrado';
        setError(message);
      } else if (err.request) {
        // A requisição foi feita mas não houve resposta
        setError('Servidor não está respondendo. Verifique se o backend está rodando na porta 8080');
      } else {
        // Erro ao configurar a requisição
        setError('Erro ao buscar pedido: ' + err.message);
      }
      
      setPedido(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    buscarPedido(codigoBusca);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'PENDENTE': 'bg-yellow-500',
      'EM_ANALISE': 'bg-blue-500',
      'APROVADO': 'bg-green-500',
      'EM_ROTA': 'bg-purple-500',
      'ENTREGUE': 'bg-emerald-500',
      'CANCELADO': 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const trackingIcons = [CheckCircle, Package, Package, Truck, Check];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative h-64 flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${vegetablesHero})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-primary-foreground px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Rastreamento de Insumos
            {pedido && ` - Nº ${pedido.numeroRastreio}`}
          </h1>
          <p className="text-lg">Acompanhe a logística, o status de fiscalização e o trajeto</p>
          <p className="text-lg">da sua solicitação de sementes e mudas.</p>
        </div>
      </section>

      <main className="flex-1 bg-white px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <form onSubmit={handleBuscar} className="mb-12">
            <div className="relative max-w-md flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Digite o código de rastreamento"
                  className="pl-10 bg-[hsl(var(--light-green))]"
                  value={codigoBusca}
                  onChange={(e) => setCodigoBusca(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Buscar'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Exemplo: SAFRA-2025-A1B2C3D4
            </p>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <div className="flex items-start gap-2">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-semibold">Erro ao buscar pedido</p>
                  <p className="text-sm mt-1">{error}</p>
                  {error.includes('porta 8080') && (
                    <div className="mt-2 text-xs bg-red-100 p-2 rounded">
                      <p className="font-semibold">Verifique:</p>
                      <ul className="list-disc ml-4 mt-1">
                        <li>O backend está rodando? (mvn spring-boot:run)</li>
                        <li>A URL está correta? (http://localhost:8080)</li>
                        <li>O banco de dados está configurado?</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2">Buscando pedido...</span>
            </div>
          )}

          {/* Pedido Details */}
          {pedido && !loading && (
            <>
              {/* Status Overview */}
              <div className="mb-8 space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-primary font-semibold">Número de Rastreio:</span>
                  <span className="font-mono">{pedido.numeroRastreio}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary font-semibold">Data da Solicitação:</span>
                  <span>{new Date(pedido.dataSolicitacao).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary font-semibold">Status de Processamento:</span>
                  <Badge className={`${getStatusColor(pedido.status)} hover:opacity-90`}>
                    {pedido.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary font-semibold">Previsão de Despacho:</span>
                  <span>{new Date(pedido.previsaoDespacho).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              {/* Request Details */}
              <div className="bg-primary text-primary-foreground rounded-t-lg p-4 mb-4">
                <h2 className="font-bold">DETALHES DO INSUMO</h2>
              </div>
              <div className="bg-[hsl(var(--light-green))] p-6 rounded-b-lg mb-8 space-y-2">
                <p>
                  <span className="text-primary font-semibold">Cultura Solicitada:</span>{' '}
                  {pedido.cultura} ({pedido.variedade})
                </p>
                <p>
                  <span className="text-primary font-semibold">Quantidade:</span>{' '}
                  {pedido.quantidade} {pedido.unidade}
                </p>
                <p>
                  <span className="text-primary font-semibold">Status de Estoque:</span>{' '}
                  <Badge variant={pedido.statusEstoque === 'DISPONIVEL' ? 'default' : 'destructive'}>
                    {pedido.statusEstoque}
                  </Badge>
                </p>
              </div>

              {/* Logistics */}
              <div className="bg-primary text-primary-foreground rounded-t-lg p-4 mb-4">
                <h2 className="font-bold">LOCAL DE RETIRADA / ENTREGA</h2>
              </div>
              <div className="bg-[hsl(var(--light-green))] p-6 rounded-b-lg mb-12 space-y-2">
                <p>
                  <span className="text-primary font-semibold">Produtor/Destinatário:</span>{' '}
                  {pedido.produtor}
                </p>
                <p>
                  <span className="text-primary font-semibold">Endereço:</span>{' '}
                  {pedido.enderecoEntrega}
                </p>
                <p>
                  <span className="text-primary font-semibold">Município:</span>{' '}
                  {pedido.municipio}
                </p>
                <p>
                  <span className="text-primary font-semibold">Prazo Final:</span>{' '}
                  {new Date(pedido.prazoFinal).toLocaleDateString('pt-BR')}
                </p>
              </div>

              {/* Progress Timeline */}
              <div className="relative">
                {pedido.etapas.map((etapa, index) => {
                  const Icon = trackingIcons[index] || CheckCircle;
                  return (
                    <div key={index} className="flex items-start gap-4 mb-8 relative">
                      {index < pedido.etapas.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
                      )}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        etapa.concluida ? 'bg-primary' : 'bg-muted'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          etapa.concluida ? 'text-primary-foreground' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="pt-2">
                        <p className={`font-semibold ${
                          etapa.concluida ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          {etapa.nome}
                        </p>
                        <p className="text-sm text-muted-foreground">{etapa.descricao}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Empty State */}
          {!pedido && !loading && !error && (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Digite um código de rastreamento para começar</p>
              <p className="text-sm">
                Você pode testar com os códigos de exemplo do banco de dados:
              </p>
              <div className="mt-4 space-y-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setCodigoBusca('SAFRA-2025-A1B2C3D4');
                    buscarPedido('SAFRA-2025-A1B2C3D4');
                  }}
                >
                  Testar: SAFRA-2025-A1B2C3D4
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rastreamento;