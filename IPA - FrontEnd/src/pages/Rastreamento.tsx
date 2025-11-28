import { useState, useEffect } from "react";
import {
  Search,
  CheckCircle,
  Package,
  Truck,
  Check,
  Loader2,
  Download,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import vegetablesHero from "@/assets/vegetables-hero.jpg";
import { pedidoService, Pedido } from "@/services/pedidoService";
import jsPDF from "jspdf";

const Rastreamento = () => {
  const [codigoBusca, setCodigoBusca] = useState("");
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geratingPDF, setGerandoPDF] = useState(false);

  // Carregar pedido da URL (se houver)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("codigo");
    if (codigo) {
      setCodigoBusca(codigo);
      buscarPedido(codigo);
    }
  }, []);

  const buscarPedido = async (codigo: string) => {
    if (!codigo.trim()) {
      setError("Digite um código de rastreamento");
      return;
    }

    console.log("🔍 Iniciando busca por:", codigo);

    try {
      setLoading(true);
      setError(null);
      setPedido(null);

      const response = await pedidoService.rastrear(codigo);

      console.log("✅ Resposta completa:", response);
      console.log("📦 Dados do pedido:", response.data);

      if (response.data) {
        setPedido(response.data);
      } else {
        setError("Pedido não encontrado");
      }
    } catch (err: any) {
      console.error("❌ Erro capturado:", err);

      if (err.response) {
        const message = err.response.data?.message || "Pedido não encontrado";
        setError(message);
      } else if (err.request) {
        setError(
          "Servidor não está respondendo. Verifique se o backend está rodando na porta 8080"
        );
      } else {
        setError("Erro ao buscar pedido: " + err.message);
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

  const gerarPDF = () => {
    if (!pedido) return;

    try {
      setGerandoPDF(true);

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      doc.setFont("Helvetica");

      let yPosition = 15;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const maxWidth = pageWidth - 2 * margin;

      // Função auxiliar para adicionar linha
      const addLine = () => {
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 5;
      };

      // Função auxiliar para verificar se precisa nova página
      const checkNewPage = (space: number) => {
        if (yPosition + space > pageHeight - 15) {
          doc.addPage();
          yPosition = 15;
        }
      };

      // Cabeçalho
      doc.setFontSize(20);
      doc.setTextColor(0, 128, 0);
      doc.text("RASTREAMENTO DE INSUMOS", margin, yPosition);
      yPosition += 12;

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Acompanhamento de Sementes e Mudas", margin, yPosition);
      yPosition += 10;

      addLine();

      // Seção: Informações Gerais
      checkNewPage(40);
      doc.setFontSize(12);
      doc.setTextColor(0, 128, 0);
      doc.text("INFORMAÇÕES GERAIS", margin, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      const infoGeral = [
        { label: "Número de Rastreio:", value: pedido.numeroRastreio },
        {
          label: "Data da Solicitação:",
          value: new Date(pedido.dataSolicitacao).toLocaleDateString("pt-BR"),
        },
        { label: "Status:", value: pedido.status.replace("_", " ") },
        {
          label: "Previsão de Despacho:",
          value: new Date(pedido.previsaoDespacho).toLocaleDateString("pt-BR"),
        },
      ];

      infoGeral.forEach((info) => {
        doc.setFont(undefined, "bold");
        doc.text(info.label, margin, yPosition);
        doc.setFont(undefined, "normal");
        const textWidth = doc.getTextWidth(info.label) + 5;
        doc.text(info.value, margin + textWidth, yPosition);
        yPosition += 7;
      });

      yPosition += 5;
      addLine();

      // Seção: Detalhes do Insumo
      checkNewPage(40);
      doc.setFontSize(12);
      doc.setTextColor(0, 128, 0);
      doc.text("DETALHES DO INSUMO", margin, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      const infoInsumo = [
        {
          label: "Cultura Solicitada:",
          value: `${pedido.cultura} (${pedido.variedade})`,
        },
        {
          label: "Quantidade:",
          value: `${pedido.quantidade} ${pedido.unidade}`,
        },
        { label: "Status de Estoque:", value: pedido.statusEstoque },
      ];

      infoInsumo.forEach((info) => {
        doc.setFont(undefined, "bold");
        doc.text(info.label, margin, yPosition);
        doc.setFont(undefined, "normal");
        const textWidth = doc.getTextWidth(info.label) + 5;

        // Quebra texto longo
        const wrappedText = doc.splitTextToSize(
          info.value,
          maxWidth - textWidth
        );
        doc.text(wrappedText, margin + textWidth, yPosition);
        yPosition += wrappedText.length * 6 + 1;
      });

      yPosition += 5;
      addLine();

      // Seção: Local de Retirada/Entrega
      checkNewPage(50);
      doc.setFontSize(12);
      doc.setTextColor(0, 128, 0);
      doc.text("LOCAL DE RETIRADA / ENTREGA", margin, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      const infoLogistica = [
        { label: "Produtor/Destinatário:", value: pedido.produtor },
        { label: "Endereço:", value: pedido.enderecoEntrega },
        { label: "Município:", value: pedido.municipio },
        {
          label: "Prazo Final:",
          value: new Date(pedido.prazoFinal).toLocaleDateString("pt-BR"),
        },
      ];

      infoLogistica.forEach((info) => {
        doc.setFont(undefined, "bold");
        doc.text(info.label, margin, yPosition);
        doc.setFont(undefined, "normal");
        const textWidth = doc.getTextWidth(info.label) + 5;

        const wrappedText = doc.splitTextToSize(
          info.value,
          maxWidth - textWidth
        );
        doc.text(wrappedText, margin + textWidth, yPosition);
        yPosition += wrappedText.length * 6 + 1;
      });

      yPosition += 5;
      addLine();

      // Seção: Status das Etapas
      checkNewPage(50);
      doc.setFontSize(12);
      doc.setTextColor(0, 128, 0);
      doc.text("ETAPAS DO RASTREAMENTO", margin, yPosition);
      yPosition += 8;

      doc.setFontSize(9);

      pedido.etapas.forEach((etapa, index) => {
        checkNewPage(15);

        const status = etapa.concluida ? "SIM" : "NAO";
        const statusColor = etapa.concluida
          ? { r: 0, g: 128, b: 0 }
          : { r: 150, g: 150, b: 150 };

        doc.setTextColor(statusColor.r, statusColor.g, statusColor.b);
        doc.setFont("Helvetica", "bold");
        doc.text(
          `${index + 1}. [${status}] ${etapa.nome}`,
          margin + 5,
          yPosition
        );

        doc.setTextColor(100, 100, 100);
        doc.setFont("Helvetica", "normal");
        yPosition += 6;

        const wrappedDesc = doc.splitTextToSize(etapa.descricao, maxWidth - 10);
        doc.text(wrappedDesc, margin + 10, yPosition);
        yPosition += wrappedDesc.length * 5 + 3;
      });

      // Rodapé
      yPosition += 5;
      addLine();

      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      const dataGeracao = new Date().toLocaleDateString("pt-BR");
      doc.text(
        `Documento gerado em: ${dataGeracao} às ${new Date().toLocaleTimeString(
          "pt-BR"
        )}`,
        margin,
        yPosition
      );

      // Salvar PDF
      doc.save(`Rastreamento_${pedido.numeroRastreio}.pdf`);
      setGerandoPDF(false);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      alert("Erro ao gerar PDF. Tente novamente.");
      setGerandoPDF(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDENTE: "bg-yellow-500",
      EM_ANALISE: "bg-blue-500",
      APROVADO: "bg-green-500",
      EM_ROTA: "bg-purple-500",
      ENTREGUE: "bg-emerald-500",
      CANCELADO: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
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
          <p className="text-lg">
            Acompanhe a logística, o status de fiscalização e o trajeto
          </p>
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
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Buscar"
                )}
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
                  {error.includes("porta 8080") && (
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
              {/* Botão de Download PDF */}
              <div className="mb-8 flex justify-end">
                <Button
                  onClick={gerarPDF}
                  disabled={geratingPDF}
                  className="gap-2"
                >
                  {geratingPDF ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Gerando PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Baixar PDF
                    </>
                  )}
                </Button>
              </div>

              {/* Status Overview */}
              <div className="mb-8 space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-primary font-semibold">
                    Número de Rastreio:
                  </span>
                  <span className="font-mono">{pedido.numeroRastreio}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary font-semibold">
                    Data da Solicitação:
                  </span>
                  <span>
                    {new Date(pedido.dataSolicitacao).toLocaleDateString(
                      "pt-BR"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary font-semibold">
                    Status de Processamento:
                  </span>
                  <Badge
                    className={`${getStatusColor(
                      pedido.status
                    )} hover:opacity-90`}
                  >
                    {pedido.status.replace("_", " ")}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary font-semibold">
                    Previsão de Despacho:
                  </span>
                  <span>
                    {new Date(pedido.previsaoDespacho).toLocaleDateString(
                      "pt-BR"
                    )}
                  </span>
                </div>
              </div>

              {/* Request Details */}
              <div className="bg-primary text-primary-foreground rounded-t-lg p-4 mb-4">
                <h2 className="font-bold">DETALHES DO INSUMO</h2>
              </div>
              <div className="bg-[hsl(var(--light-green))] p-6 rounded-b-lg mb-8 space-y-2">
                <p>
                  <span className="text-primary font-semibold">
                    Cultura Solicitada:
                  </span>{" "}
                  {pedido.cultura} ({pedido.variedade})
                </p>
                <p>
                  <span className="text-primary font-semibold">
                    Quantidade:
                  </span>{" "}
                  {pedido.quantidade} {pedido.unidade}
                </p>
                <p>
                  <span className="text-primary font-semibold">
                    Status de Estoque:
                  </span>{" "}
                  <Badge
                    variant={
                      pedido.statusEstoque === "DISPONIVEL"
                        ? "default"
                        : "destructive"
                    }
                  >
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
                  <span className="text-primary font-semibold">
                    Produtor/Destinatário:
                  </span>{" "}
                  {pedido.produtor}
                </p>
                <p>
                  <span className="text-primary font-semibold">Endereço:</span>{" "}
                  {pedido.enderecoEntrega}
                </p>
                <p>
                  <span className="text-primary font-semibold">Município:</span>{" "}
                  {pedido.municipio}
                </p>
                <p>
                  <span className="text-primary font-semibold">
                    Prazo Final:
                  </span>{" "}
                  {new Date(pedido.prazoFinal).toLocaleDateString("pt-BR")}
                </p>
              </div>

              {/* Progress Timeline */}
              <div className="relative">
                {pedido.etapas.map((etapa, index) => {
                  const Icon = trackingIcons[index] || CheckCircle;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 mb-8 relative"
                    >
                      {index < pedido.etapas.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
                      )}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          etapa.concluida ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            etapa.concluida
                              ? "text-primary-foreground"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="pt-2">
                        <p
                          className={`font-semibold ${
                            etapa.concluida
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {etapa.nome}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {etapa.descricao}
                        </p>
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
              <p className="text-lg mb-2">
                Digite um código de rastreamento para começar
              </p>
              <p className="text-sm">
                Você pode testar com os códigos de exemplo do banco de dados:
              </p>
              <div className="mt-4 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCodigoBusca("SAFRA-2025-A1B2C3D4");
                    buscarPedido("SAFRA-2025-A1B2C3D4");
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