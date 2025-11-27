import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSolicitacao } from "./SolicitacaoContext";

const DadosAgricultor = () => {
  const navigate = useNavigate();
  const { solicitacao, atualizarSolicitacao } = useSolicitacao();

  const [formData, setFormData ] = useState({
beneficiarioNome: solicitacao.beneficiarioNome || "",
beneficiarioCpf: solicitacao.beneficiarioCpf || "",
beneficiarioCaf: solicitacao.beneficiarioCaf || "",
tipoPropriedade: solicitacao.tipoPropriedade || "",
beneficiarioCep: solicitacao.beneficiarioCep || "",
beneficiarioComplemento: solicitacao.beneficiarioComplemento || "",
pontoReferencia: solicitacao.pontoReferencia || ""
});
useEffect(() => {
// Atualizar form quando o contexto mudar
setFormData({
beneficiarioNome: solicitacao.beneficiarioNome || "",
beneficiarioCpf: solicitacao.beneficiarioCpf || "",
beneficiarioCaf: solicitacao.beneficiarioCaf || "",
tipoPropriedade: solicitacao.tipoPropriedade || "",
beneficiarioCep: solicitacao.beneficiarioCep || "",
beneficiarioComplemento: solicitacao.beneficiarioComplemento || "",
pontoReferencia: solicitacao.pontoReferencia || ""
});
}, [solicitacao]);
const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
// Validação básica
if (!formData.beneficiarioNome || !formData.beneficiarioCpf || !formData.tipoPropriedade || !formData.beneficiarioCep) {
  toast.error("Preencha todos os campos obrigatórios");
  return;
}

// Atualizar contexto
atualizarSolicitacao(formData);

toast.success("Dados do agricultor salvos!");
navigate("/solicitar/detalhes");
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
        {/* User Section */}
        <div className="bg-muted/50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-foreground mb-6">DADOS DO USUÁRIO SOLICITANTE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome completo</Label>
              <Input value={solicitacao.solicitanteNome} disabled className="bg-white" />
            </div>
            <div>
              <Label>CPF/CNPJ</Label>
              <Input value={solicitacao.solicitanteCpf} disabled className="bg-white" />
            </div>
            <div>
              <Label>Matrícula IPA (ou DAP/CAF)</Label>
              <Input value={solicitacao.solicitanteMatricula} disabled className="bg-white" />
            </div>
            <div>
              <Label>Telefone de contato</Label>
              <Input value={solicitacao.solicitanteTelefone} disabled className="bg-white" />
            </div>
            <div className="md:col-span-2">
              <Label>Local de Atuação</Label>
              <div className="flex gap-2">
                <Input value={solicitacao.localAtuacao} disabled className="bg-white flex-1" />
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
              <Label htmlFor="beneficiarioNome">Nome completo *</Label>
              <Input
                id="beneficiarioNome"
                placeholder="João Silva"
                value={formData.beneficiarioNome}
                onChange={(e) => handleChange('beneficiarioNome', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="beneficiarioCpf">CPF *</Label>
              <Input
                id="beneficiarioCpf"
                placeholder="000.000.000-00"
                value={formData.beneficiarioCpf}
                onChange={(e) => handleChange('beneficiarioCpf', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="beneficiarioCaf">CAF (Cadastro Nacional da Agricultura Familiar)</Label>
              <Input
                id="beneficiarioCaf"
                placeholder="00.000.000/0"
                value={formData.beneficiarioCaf}
                onChange={(e) => handleChange('beneficiarioCaf', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tipoPropriedade">Tipo de Propriedade *</Label>
              <Input
                id="tipoPropriedade"
                placeholder="Sítio, Fazenda, Assentamento, etc."
                value={formData.tipoPropriedade}
                onChange={(e) => handleChange('tipoPropriedade', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="beneficiarioCep">CEP *</Label>
              <Input
                id="beneficiarioCep"
                placeholder="00000-000"
                value={formData.beneficiarioCep}
                onChange={(e) => handleChange('beneficiarioCep', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="beneficiarioComplemento">Complemento</Label>
              <Input
                id="beneficiarioComplemento"
                value={formData.beneficiarioComplemento}
                onChange={(e) => handleChange('beneficiarioComplemento', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="pontoReferencia">Ponto de Referência (opcional)</Label>
              <Input
                id="pontoReferencia"
                placeholder="Ex: Próximo ao mercado central"
                value={formData.pontoReferencia}
                onChange={(e) => handleChange('pontoReferencia', e.target.value)}
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