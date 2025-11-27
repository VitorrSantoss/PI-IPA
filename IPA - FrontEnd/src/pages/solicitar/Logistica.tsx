import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSolicitacao } from "./SolicitacaoContext";

const Logistica = () => {
  const navigate = useNavigate();
  const { solicitacao, atualizarSolicitacao } = useSolicitacao();

  const [formaEntrega, setFormaEntrega] = useState(solicitacao.formaEntrega || "RETIRADA");

  const [formData, setFormData] = useState({
    municipioDestino: solicitacao.municipioDestino || "",
    enderecoEntrega: solicitacao.enderecoEntrega || "",
    cepEntrega: solicitacao.cepEntrega || "",
    complementoEntrega: solicitacao.complementoEntrega || "",
    nomeDestinatario: solicitacao.nomeDestinatario || "",
    telefoneDestinatario: solicitacao.telefoneDestinatario || ""
  });

  useEffect(() => {
    setFormData({
      municipioDestino: solicitacao.municipioDestino || "",
      enderecoEntrega: solicitacao.enderecoEntrega || "",
      cepEntrega: solicitacao.cepEntrega || "",
      complementoEntrega: solicitacao.complementoEntrega || "",
      nomeDestinatario: solicitacao.nomeDestinatario || "",
      telefoneDestinatario: solicitacao.telefoneDestinatario || ""
    });
  }, [solicitacao]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.municipioDestino || !formData.enderecoEntrega || !formData.cepEntrega || !formData.nomeDestinatario || !formData.telefoneDestinatario) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    atualizarSolicitacao({
      ...formData,
      formaEntrega
    });

    toast.success("Dados de logística salvos!");
    navigate("/solicitar/resumo");
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-white px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <h1 className="text-2xl font-bold text-foreground mb-6">LOGÍSTICA E LOCAL DE ENTREGA</h1>

            <div className="space-y-6">
              <div>
                <Label>Município de Destino *</Label>
                <Input
                  placeholder="Arcoverde - PE"
                  value={formData.municipioDestino}
                  onChange={(e) => handleChange('municipioDestino', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label className="mb-3 block">Forma de Entrega *</Label>
                <RadioGroup value={formaEntrega} onValueChange={setFormaEntrega} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="RETIRADA" id="retirada" />
                    <Label htmlFor="retirada" className="cursor-pointer">Retirada no Armazém</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ENTREGA_DOMICILIO" id="entrega" />
                    <Label htmlFor="entrega" className="cursor-pointer">Entrega a Domicílio</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="enderecoEntrega">Endereço *</Label>
                  <Input
                    id="enderecoEntrega"
                    placeholder="Rua, Bairro, etc."
                    value={formData.enderecoEntrega}
                    onChange={(e) => handleChange('enderecoEntrega', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label>CEP *</Label>
                  <Input
                    placeholder="00000-000"
                    value={formData.cepEntrega}
                    onChange={(e) => handleChange('cepEntrega', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label>Complemento</Label>
                  <Input
                    value={formData.complementoEntrega}
                    onChange={(e) => handleChange('complementoEntrega', e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-foreground">Contato do Destinatário</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nome do Destinatário *</Label>
                    <Input
                      placeholder="José Almeida"
                      value={formData.nomeDestinatario}
                      onChange={(e) => handleChange('nomeDestinatario', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Telefone *</Label>
                    <Input
                      placeholder="(00) 0000-0000"
                      value={formData.telefoneDestinatario}
                      onChange={(e) => handleChange('telefoneDestinatario', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button type="button" variant="outline" onClick={() => navigate("/solicitar/detalhes")}>
                VOLTAR
              </Button>
              <Button type="submit" className="bg-primary hover:bg-accent">
                AVANÇAR
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Logistica;