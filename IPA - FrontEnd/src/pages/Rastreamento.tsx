import { Search, CheckCircle, Package, Truck, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import vegetablesHero from "@/assets/vegetables-hero.jpg";

const Rastreamento = () => {
  const trackingSteps = [
    { icon: CheckCircle, label: "Solicitação Registrada", sublabel: "(Entrada no sistema S.A.F.R.A.)", active: true },
    { icon: Package, label: "Em Análise Fiscal", sublabel: "(IPA)", active: true },
    { icon: Package, label: "Sementes e Liberação de Estoque", sublabel: "(Preparação física do insumo)", active: false },
    { icon: Truck, label: "Em Rota Logística", sublabel: "(Insumo está a caminho do ponto de entrega/retirada)", active: false },
    { icon: Check, label: "Entregue/Retirado", sublabel: "(Conclusão do processo)", active: false }
  ];

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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Rastreamento de Insumos - Nº #13131313</h1>
          <p className="text-lg">Acompanhe a logística, o status de fiscalização e o trajeto</p>
          <p className="text-lg">da sua solicitação de sementes e mudas.</p>
        </div>
      </section>

      <main className="flex-1 bg-white px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <div className="mb-12">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Buscar por lote"
                className="pl-10 bg-[hsl(var(--light-green))]"
              />
            </div>
          </div>

          {/* Status Overview */}
          <div className="mb-8 space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-primary font-semibold">Número de Rastreio:</span>
              <span>#13131313</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-primary font-semibold">Data da Solicitação:</span>
              <span>25/10/2025</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-primary font-semibold">Status de Processamento:</span>
              <Badge className="bg-blue-500 hover:bg-blue-600">Em Análise Fiscal</Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-primary font-semibold">Previsão de Despacho (Logística):</span>
              <span>Aprovado para despacho em 13/12/2025</span>
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-primary text-primary-foreground rounded-t-lg p-4 mb-4">
            <h2 className="font-bold">DETALHES DO INSUMO (O que foi solicitado)</h2>
          </div>
          <div className="bg-[hsl(var(--light-green))] p-6 rounded-b-lg mb-8 space-y-2">
            <p><span className="text-primary font-semibold">Cultura Solicitada:</span> Milho (Variedade IPA-123)</p>
            <p><span className="text-primary font-semibold">Quantidade:</span> 200 kg de Sementes</p>
            <p><span className="text-primary font-semibold">Status de Estoque:</span> <Badge variant="destructive">Disponível para Separação</Badge></p>
          </div>

          {/* Logistics */}
          <div className="bg-primary text-primary-foreground rounded-t-lg p-4 mb-4">
            <h2 className="font-bold">LOCAL DE RETIRADA / ENTREGA (Rota Logística)</h2>
          </div>
          <div className="bg-[hsl(var(--light-green))] p-6 rounded-b-lg mb-12 space-y-2">
            <p><span className="text-primary font-semibold">Produtor/Destinatário:</span> José Almeida</p>
            <p><span className="text-primary font-semibold">Endereço do Ponto de Entrega:</span> Sítio Palmeiras, Zona Rural</p>
            <p><span className="text-primary font-semibold">Município de Destino:</span> Arcoverde/PE</p>
            <p><span className="text-primary font-semibold">Prazo Final Estimado:</span> Recebimento até 23 de agosto</p>
          </div>

          {/* Progress Timeline */}
          <div className="relative">
            {trackingSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-start gap-4 mb-8 relative">
                  {index < trackingSteps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
                  )}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.active ? 'bg-primary' : 'bg-muted'
                  }`}>
                    <Icon className={`w-6 h-6 ${step.active ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="pt-2">
                    <p className={`font-semibold ${step.active ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.sublabel}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rastreamento;
