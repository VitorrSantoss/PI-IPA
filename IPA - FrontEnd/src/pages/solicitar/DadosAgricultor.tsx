import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DadosAgricultor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    matriculaIPA: "",
    telefone: "",
    localAtuacao: "",
    nomeBeneficiario: "",
    cpfBeneficiario: "",
    caf: "",
    tipoPropriedade: "",
    cep: "",
    complemento: "",
    pontoReferencia: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/solicitar/detalhes");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-white px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* User Section */}
            <div className="bg-muted/50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-foreground mb-6">DADOS DO USUÁRIO SOLICITANTE</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome completo</Label>
                  <Input value="Sandre Alves" disabled className="bg-white" />
                </div>
                <div>
                  <Label>CPF/CNPJ</Label>
                  <Input value="000.328.847-85" disabled className="bg-white" />
                </div>
                <div>
                  <Label>Matrícula IPA (ou DAP/CAF)</Label>
                  <Input value="Matrícula de Servidor IPA / Técnico de Extensão Rural" disabled className="bg-white" />
                </div>
                <div>
                  <Label>Telefone de contato</Label>
                  <Input value="(81) 91354-7522" disabled className="bg-white" />
                </div>
                <div className="md:col-span-2">
                  <Label>Local de Atuação</Label>
                  <div className="flex gap-2">
                    <Input value="Regional de Arcoverde - PE" disabled className="bg-white flex-1" />
                    <Button type="button" variant="outline" className="bg-primary text-primary-foreground hover:bg-accent">
                      EDITAR
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Beneficiary Section */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">DADOS DO AGRICULTOR BENEFICIADO</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="nomeBeneficiario">Nome completo</Label>
                  <Input
                    id="nomeBeneficiario"
                    placeholder="João Silva"
                    value={formData.nomeBeneficiario}
                    onChange={(e) => setFormData({...formData, nomeBeneficiario: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cpfBeneficiario">CPF</Label>
                  <Input
                    id="cpfBeneficiario"
                    placeholder="000.000.00-00"
                    value={formData.cpfBeneficiario}
                    onChange={(e) => setFormData({...formData, cpfBeneficiario: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="caf">CAF (Cadastro Nacional da Agricultura Familiar)</Label>
                  <Input
                    id="caf"
                    placeholder="00.000.000/0"
                    value={formData.caf}
                    onChange={(e) => setFormData({...formData, caf: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="tipoPropriedade">Tipo de Propriedade</Label>
                  <Input
                    id="tipoPropriedade"
                    placeholder="Sítio, Fazenda, Assentamento, etc."
                    value={formData.tipoPropriedade}
                    onChange={(e) => setFormData({...formData, tipoPropriedade: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    placeholder="00000-000"
                    value={formData.cep}
                    onChange={(e) => setFormData({...formData, cep: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    value={formData.complemento}
                    onChange={(e) => setFormData({...formData, complemento: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="pontoReferencia">Ponto de Referência (opcional)</Label>
                  <Input
                    id="pontoReferencia"
                    placeholder="Ex: Próximo ao mercado central"
                    value={formData.pontoReferencia}
                    onChange={(e) => setFormData({...formData, pontoReferencia: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button type="button" variant="outline" onClick={() => navigate("/")}>
                CANCELAR
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

export default DadosAgricultor;
