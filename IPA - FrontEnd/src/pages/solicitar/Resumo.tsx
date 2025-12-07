import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSolicitacao } from "./SolicitacaoContext";
import { criarSolicitacao } from "@/services/solicitacaoservice";
import { format } from "date-fns";

const Resumo = () => {
  const navigate = useNavigate();
  const { solicitacao, limparSolicitacao } = useSolicitacao();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);

    try {
      // Preparar dados completos
      const dadosCompletos = {
        ...solicitacao,
        status: "ENVIADA", // Status inicial após envio
      };

      console.log("📤 Enviando solicitação:", dadosCompletos);

      // Enviar para o backend
      const resultado = await criarSolicitacao(dadosCompletos as any);

      console.log("✅ Solicitação criada:", resultado);

      toast.success("Solicitação enviada com sucesso!", {
        description: "Solicitação enviada com sucesso.",
      });

      // Limpar contexto
      limparSolicitacao();

      // Redirecionar para sucesso
      navigate("/sucesso");
    } catch (error: any) {
      console.error("❌ Erro ao enviar solicitação:", error);

      toast.error("Erro ao enviar solicitação", {
        description: error.response?.data?.message || error.message || "Tente novamente",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (data?: string) => {
    if (!data) return "-";
    try {
      return format(new Date(data), "dd/MM/yyyy");
    } catch {
      return data;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-white px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="border-4 border-primary rounded-lg p-8">
            <h1 className="text-2xl font-bold text-primary mb-8">RESUMO DO PEDIDO</h1>

            {/* Beneficiary Data */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-primary mb-4">DADOS DO AGRICULTOR BENEFICIADO</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-primary">Nome completo</Label>
                  <Input value={solicitacao.beneficiarioNome || "-"} disabled />
                </div>
                <div>
                  <Label className="text-primary">CPF</Label>
                  <Input value={solicitacao.beneficiarioCpf || "-"} disabled />
                </div>
                <div>
                  <Label className="text-primary">Tipo de Propriedade</Label>
                  <Input value={solicitacao.tipoPropriedade || "-"} disabled />
                </div>
                <div>
                  <Label className="text-primary">CAF</Label>
                  <Input value={solicitacao.beneficiarioCaf || "-"} disabled />
                </div>
                <div>
                  <Label className="text-primary">CEP</Label>
                  <Input value={solicitacao.beneficiarioCep || "-"} disabled />
                </div>
                <div>
                  <Label className="text-primary">Complemento</Label>
                  <Input value={solicitacao.beneficiarioComplemento || "-"} disabled />
                </div>
              </div>
            </section>

            {/* Request Details */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-primary mb-4">DETALHES DA SOLICITAÇÃO (INSUMO)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-primary">Tipo</Label>
                  <Input value={solicitacao.tipoInsumo || "-"} disabled />
                </div>
                <div>
                  <Label className="text-primary">Cultura</Label>
                  <Input value={solicitacao.cultura || "-"} disabled />
                </div>
                <div>
                  <Label className="text-primary">Variedade Específica</Label>
                  <Input value={solicitacao.variedade || "-"} disabled />
                </div>
                <div>
                  <Label className="text-primary">Quantidade</Label>
                  <Input value={solicitacao.quantidade || "-"} disabled />
                </div>
                <div>
                  <Label className="text-primary">Unidade</Label>
                  <Input value={solicitacao.unidadeMedida || "-"} disabled />
                </div>
                <div>
                  <Label className="text-primary">Finalidade</Label>
                  <Input value={solicitacao.finalidade || "-"} disabled />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-primary">Área a Ser Plantada</Label>
                  <Input
                    value={
                      solicitacao.areaPlantada
                        ? `${solicitacao.areaPlantada} ${solicitacao.areaUnidade}`
                        : "-"
                    }
                    disabled
                  />
                </div>
                <div>
                  <Label className="text-primary">Data Ideal de Plantio</Label>
                  <Input value={formatarData(solicitacao.dataIdealPlantio)} disabled />
                </div>
              </div>
            </section>

            {/* Logistics */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-primary mb-4">LOGÍSTICA E LOCAL DE ENTREGA</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-primary">Município</Label>
                  <Input value={solicitacao.municipioDestino || "-"} disabled />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-primary">Forma de Entrega</Label>
                  <Input
                    value={
                      solicitacao.formaEntrega === "RETIRADA"
                        ? "Retirada no Armazém"
                        : "Entrega a Domicílio"
                    }
                    disabled
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-primary">Endereço</Label>
                  <Input value={solicitacao.enderecoEntrega || "-"} disabled />
            </div>
            <div>
              <Label className="text-primary">CEP</Label>
              <Input value={solicitacao.cepEntrega || "-"} disabled />
            </div>
            <div className="md:col-span-2">
              <Label className="text-primary">Complemento</Label>
              <Input value={solicitacao.complementoEntrega || "-"} disabled />
            </div>
            <div className="md:col-span-2">
              <Label className="text-primary">Nome do Destinatário</Label>
              <Input value={solicitacao.nomeDestinatario || "-"} disabled />
            </div>
            <div>
              <Label className="text-primary">Telefone</Label>
              <Input value={solicitacao.telefoneDestinatario || "-"} disabled />
            </div>
          </div>
        </section>

        <div className="flex gap-4 justify-center">
          <Button type="button" variant="outline" onClick={() => navigate("/solicitar/logistica")}>
            EDITAR
          </Button>
          <Button onClick={handleConfirm} disabled={loading} className="bg-primary hover:bg-accent">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "CONFIRMAR"
            )}
          </Button>
        </div>
      </div>
    </div>
  </main>

  <Footer />
</div>
);
};
export default Resumo;