import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Logistica = () => {
  const navigate = useNavigate();
  const [formaEntrega, setFormaEntrega] = useState("retirada");
  const [formData, setFormData] = useState({
    variacaoDestino: "",
    endereco: "",
    cep: "",
    complemento: "",
    nomeDestinatario: "",
    telefone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/solicitar/resumo");
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
                <Label>Variação de Destino</Label>
                <Input
                  placeholder="Arcoverde - PE"
                  value={formData.variacaoDestino}
                  onChange={(e) => setFormData({...formData, variacaoDestino: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label className="mb-3 block">Forma de Entrega</Label>
                <RadioGroup value={formaEntrega} onValueChange={setFormaEntrega} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="retirada" id="retirada" />
                    <Label htmlFor="retirada" className="cursor-pointer">Retirada</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="entrega" id="entrega" />
                    <Label htmlFor="entrega" className="cursor-pointer">Entrega a Domicílio</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    placeholder="Rua, Bairro, etc."
                    value={formData.endereco}
                    onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label>CEP</Label>
                  <Input
                    placeholder="00000-000"
                    value={formData.cep}
                    onChange={(e) => setFormData({...formData, cep: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label>Complemento</Label>
                  <Input
                    value={formData.complemento}
                    onChange={(e) => setFormData({...formData, complemento: e.target.value})}
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-foreground">Contato do Destinatário</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nome do Destinatário</Label>
                    <Input
                      placeholder="José Almeida"
                      value={formData.nomeDestinatario}
                      onChange={(e) => setFormData({...formData, nomeDestinatario: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <Input
                      placeholder="(00) 0000-0000"
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="novo-endereco" className="rounded" />
                <Label htmlFor="novo-endereco" className="cursor-pointer text-sm">
                  Tornar esse novo endereço padrão
                </Label>
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
