import { useState, useEffect } from "react";
import {
  Search,
  CheckCircle,
  Package,
  Truck,
  Check,
  Loader2,
  Download,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

  // Função auxiliar para formatar datas
  const formatarData = (dataString: string | undefined | null): string => {
    if (!dataString) return "Não informado";
    
    try {
      const data = new Date(dataString);
      
      // Verifica se a data é válida
      if (isNaN(data.getTime())) {
        return "Data inválida";
      }
      
      return data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };

  // Função auxiliar para formatar data completa
  const formatarDataCompleta = (dataString: string | undefined | null): string => {
    if (!dataString) return "Não informado";
    
    try {
      const data = new Date(dataString);
      
      if (isNaN(data.getTime())) {
        return "Data inválida";
      }
      
      return data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      return "Data inválida";
    }
  };

  // Função para garantir que o valor não seja undefined/null
  const exibirValor = (valor: any, valorPadrao: string = "Não informado"): string => {
    if (valor === undefined || valor === null || valor === "") {
      return valorPadrao;
    }
    return String(valor);
  };

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
        // Log detalhado dos dados recebidos
        console.log("📋 Campos recebidos:", {
          numeroRastreio: response.data.numeroRastreio,
          codigoRastreio: response.data.codigoRastreio,
          dataSolicitacao: response.data.dataSolicitacao,
          dataAtualizacao: response.data.dataAtualizacao,
          previsaoDespacho: response.data.previsaoDespacho,
          prazoFinal: response.data.prazoFinal,
          produtor: response.data.produtor,
          beneficiarioNome: response.data.beneficiarioNome,
          solicitanteNome: response.data.solicitanteNome,
        });

        setPedido(response.data);
      } else {
        setError("Pedido não encontrado");
      }
    } catch (err: any) {
      console.error("❌ Erro capturado:", err);

      if (err.request) {
        setError(
          "Servidor não está respondendo. Verifique se o backend está rodando na porta 8080"
        );
      } else if (err.response) {
        const message = err.response.data?.message || err.message || "Pedido não encontrado";
        setError(message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Erro desconhecido ao buscar pedido");
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

      const addLine = () => {
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 5;
      };

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

      // Informações Gerais
      checkNewPage(40);
      doc.setFontSize(12);
      doc.setTextColor(0, 128, 0);
      doc.text("INFORMAÇÕES GERAIS", margin, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      const infoGeral = [
        { 
          label: "Número de Rastreio:", 
          value: exibirValor(pedido.numeroRastreio || pedido.codigoRastreio)
        },
        {
          label: "Data da Solicitação:",
          value: formatarData(pedido.dataSolicitacao || pedido.dataAtualizacao),
        },
        { label: "Status:", value: exibirValor(pedido.status).replace("_", " ") },
        {
          label: "Previsão de Despacho:",
          value: formatarData(pedido.previsaoDespacho),
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

      // Detalhes do Insumo
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
          value: `${exibirValor(pedido.cultura)} (${exibirValor(pedido.variedade)})`,
        },
        {
          label: "Quantidade:",
          value: `${exibirValor(pedido.quantidade)} ${exibirValor(pedido.unidade, "un")}`,
        },
        { label: "Status de Estoque:", value: exibirValor(pedido.statusEstoque) },
      ];

      infoInsumo.forEach((info) => {
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

      // Local de Retirada/Entrega
      checkNewPage(50);
      doc.setFontSize(12);
      doc.setTextColor(0, 128, 0);
      doc.text("LOCAL DE RETIRADA / ENTREGA", margin, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      const infoLogistica = [
        { 
          label: "Produtor/Destinatário:", 
          value: exibirValor(
            pedido.produtor || 
            pedido.beneficiarioNome || 
            pedido.solicitanteNome
          )
        },
        { 
          label: "Endereço:", 
          value: exibirValor(pedido.enderecoEntrega || pedido.localAtuacao) 
        },
        { 
          label: "Município:", 
          value: exibirValor(pedido.municipio || pedido.municipioDestino) 
        },
        {
          label: "Prazo Final:",
          value: formatarData(pedido.prazoFinal),
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

      // Status das Etapas
      if (pedido.etapas && pedido.etapas.length > 0) {
        checkNewPage(50);
        doc.setFontSize(12);
        doc.setTextColor(0, 128, 0);
        doc.text("ETAPAS DO RASTREAMENTO", margin, yPosition);
        yPosition += 8;

        doc.setFontSize(9);

        pedido.etapas.forEach((etapa, index) => {
          checkNewPage(15);

          const status = etapa.concluida ? "✓" : "○";
          const statusColor = etapa.concluida
            ? { r: 0, g: 128, b: 0 }
            : { r: 150, g: 150, b: 150 };

          doc.setTextColor(statusColor.r, statusColor.g, statusColor.b);
          doc.setFont("Helvetica", "bold");
          doc.text(
            `${index + 1}. ${status} ${etapa.nome}`,
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
      }

      // Rodapé
      yPosition += 5;
      addLine();

      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      const dataGeracao = new Date().toLocaleDateString("pt-BR");
      doc.text(
        `Documento gerado em: ${dataGeracao} às ${new Date().toLocaleTimeString("pt-BR")}`,
        margin,
        yPosition
      );

      // Salvar PDF
      const numeroRastreio = pedido.numeroRastreio || pedido.codigoRastreio || "SemCodigo";
      doc.save(`Rastreamento_${numeroRastreio}.pdf`);
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
      ENVIADA: "bg-blue-600",
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
            {pedido && ` - Nº ${exibirValor(pedido.numeroRastreio || pedido.codigoRastreio)}`}
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
                  onChange={(e) => setCodigoBusca(e.target.value.toUpperCase())}
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading || !codigoBusca.trim()}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Buscar"
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Exemplo: SAFRA-2025-F2QYAVLO
            </p>
          </form>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro ao buscar pedido</AlertTitle>
              <AlertDescription>
                <p className="mt-2">{error}</p>
                {error.includes("porta 8080") && (
                  <div className="mt-3 text-xs bg-red-100 text-red-900 p-3 rounded">
                    <p className="font-semibold mb-2">Verifique:</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>O backend está rodando? (mvn spring-boot:run)</li>
                      <li>A URL está correta? (http://localhost:8080)</li>
                      <li>O banco de dados está configurado?</li>
                    </ul>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-12 space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <div className="text-center">
                <p className="font-semibold text-lg">Buscando pedido...</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Aguarde enquanto consultamos o banco de dados
                </p>
              </div>
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
                  variant="outline"
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
              <div className="mb-8">
                <div className="bg-primary text-primary-foreground rounded-t-lg p-4 mb-0">
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    INFORMAÇÕES DA SOLICITAÇÃO
                  </h2>
                </div>
                <div className="bg-[hsl(var(--light-green))] p-6 rounded-b-lg space-y-4 border-x-2 border-b-2 border-primary/20">
                  <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
                    <span className="text-primary font-semibold min-w-[200px] text-sm">
                      Número de Rastreio:
                    </span>
                    <span className="font-mono bg-primary/10 px-4 py-2 rounded-lg border-2 border-primary text-sm font-bold text-primary">
                      {exibirValor(pedido.numeroRastreio || pedido.codigoRastreio)}
                    </span>
                  </div>
                  <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
                    <span className="text-primary font-semibold min-w-[200px] text-sm">
                      Data da Solicitação:
                    </span>
                    <span className="text-sm">
                      {formatarDataCompleta(pedido.dataSolicitacao || pedido.dataAtualizacao)}
                    </span>
                  </div>
                  <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
                    <span className="text-primary font-semibold min-w-[200px] text-sm">
                      Status de Processamento:
                    </span>
                    <Badge
                      className={`${getStatusColor(
                        pedido.status
                      )} hover:opacity-90 text-white`}
                    >
                      {exibirValor(pedido.status).replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-primary font-semibold min-w-[200px] text-sm">
                      Previsão de Despacho:
                    </span>
                    <span className="text-sm">
                      {formatarData(pedido.previsaoDespacho)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="bg-primary text-primary-foreground rounded-t-lg p-4 mb-0">
                <h2 className="font-bold text-lg">DETALHES DO INSUMO</h2>
              </div>
              <div className="bg-[hsl(var(--light-green))] p-6 rounded-b-lg mb-8 space-y-4 border-x-2 border-b-2 border-primary/20">
                <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
                  <span className="text-primary font-semibold min-w-[180px] text-sm">
                    Cultura Solicitada:
                  </span>
                  <span className="text-sm font-medium">
                    {exibirValor(pedido.cultura)} ({exibirValor(pedido.variedade)})
                  </span>
                </div>
                <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
                  <span className="text-primary font-semibold min-w-[180px] text-sm">
                    Quantidade:
                  </span>
                  <span className="text-sm font-medium">
                    {exibirValor(pedido.quantidade)} {exibirValor(pedido.unidade, "un")}
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-primary font-semibold min-w-[180px] text-sm">
                    Status de Estoque:
                  </span>
                  <Badge
                    variant={
                      pedido.statusEstoque === "DISPONIVEL"
                        ? "default"
                        : "destructive"
                    }
                    className="text-xs"
                  >
                    {exibirValor(pedido.statusEstoque)}
                  </Badge>
                </div>
              </div>

              {/* Logistics */}
              <div className="bg-primary text-primary-foreground rounded-t-lg p-4 mb-0">
                <h2 className="font-bold text-lg">LOCAL DE RETIRADA / ENTREGA</h2>
              </div>
              <div className="bg-[hsl(var(--light-green))] p-6 rounded-b-lg mb-12 space-y-4 border-x-2 border-b-2 border-primary/20">
                <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
                  <span className="text-primary font-semibold min-w-[200px] text-sm">
                    Produtor/Destinatário:
                  </span>
                  <span className="text-sm font-medium">
                    {exibirValor(
                      pedido.produtor || 
                      pedido.beneficiarioNome || 
                      pedido.solicitanteNome
                    )}
                  </span>
                </div>
                <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
                  <span className="text-primary font-semibold min-w-[200px] text-sm">
                    Endereço:
                  </span>
                  <span className="text-sm">
                    {exibirValor(pedido.enderecoEntrega || pedido.localAtuacao)}
                  </span>
                </div>
                <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
                  <span className="text-primary font-semibold min-w-[200px] text-sm">
                    Município:
                  </span>
                  <span className="text-sm">
                    {exibirValor(pedido.municipio || pedido.municipioDestino)}
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-primary font-semibold min-w-[200px] text-sm">
                    Prazo Final:
                  </span>
                  <span className="text-sm">
                    {formatarData(pedido.prazoFinal)}
                  </span>
                </div>
              </div>

              {/* Progress Timeline */}
              {pedido.etapas && pedido.etapas.length > 0 && (
                <div className="bg-white p-6 rounded-lg border-2 border-primary/20">
                  <h2 className="text-xl font-bold text-primary mb-6">
                    Linha do Tempo do Rastreamento
                  </h2>
                  <div className="relative">
                    {pedido.etapas.map((etapa, index) => {
                      const Icon = trackingIcons[index] || CheckCircle;
                      return (
                        <div
                          key={index}
                          className="flex items-start gap-4 mb-8 relative"
                        >
                          {index < pedido.etapas.length - 1 && (
                            <div
                              className={`absolute left-6 top-12 w-0.5 h-16 ${
                                etapa.concluida ? "bg-primary" : "bg-border"
                              }`}
                            ></div>
                          )}
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                              etapa.concluida
                                ? "bg-primary border-primary"
                                : "bg-muted border-border"
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
                          <div className="pt-2 flex-1">
                            <p
                              className={`font-semibold text-lg ${
                                etapa.concluida
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {etapa.nome}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {etapa.descricao}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!pedido && !loading && !error && (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2 font-semibold">
                Digite um código de rastreamento para começar
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rastreamento;