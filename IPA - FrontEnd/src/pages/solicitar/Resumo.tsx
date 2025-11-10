import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Resumo = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/sucesso");
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
                  <Input value="João Silva" disabled />
                </div>
                <div>
                  <Label className="text-primary">CPF</Label>
                  <Input value="000-828-879-25" disabled />
                </div>
                <div>
                  <Label className="text-primary">Tipo de Propriedade</Label>
                  <Input value="Assentamento" disabled />
                </div>
                <div>
                  <Label className="text-primary">CAF</Label>
                  <Input value="00.981.0980/0" disabled />
                </div>
                <div>
                  <Label className="text-primary">CEP</Label>
                  <Input value="56000-000" disabled />
                </div>
                <div>
                  <Label className="text-primary">Complemento</Label>
                  <Input disabled />
                </div>
              </div>
            </section>

            {/* Request Details */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-primary mb-4">DETALHES DA SOLICITAÇÃO (INSUMO)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-primary">Tipo</Label>
                  <Input value="Sementes" disabled />
                </div>
                <div>
                  <Label className="text-primary">Cultura</Label>
                  <Input value="Milho" disabled />
                </div>
                <div>
                  <Label className="text-primary">Variedade Específica</Label>
                  <Input value="IPA-350" disabled />
                </div>
                <div>
                  <Label className="text-primary">Quantidade</Label>
                  <Input value="200" disabled />
                </div>
                <div>
                  <Label className="text-primary">Unidade</Label>
                  <Input value="Kg" disabled />
                </div>
                <div>
                  <Label className="text-primary">Finalidade</Label>
                  <Input value="Plantio Comercial" disabled />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-primary">Área a Ser Plantada</Label>
                  <Input value="5.000 Metros Quadrados" disabled />
                </div>
                <div>
                  <Label className="text-primary">Data Ideal de Plantio</Label>
                  <Input value="07/02/25" disabled />
                </div>
              </div>
            </section>

            {/* Logistics */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-primary mb-4">LOGÍSTICA E LOCAL DE ENTREGA</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-primary">Cidade</Label>
                  <Input value="Arcoverde - PE" disabled />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-primary">Forma de Entrega</Label>
                  <Input value="Retirada (direto no armazém ou horto)" disabled />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-primary">Rua</Label>
                  <Input value="Sítio Palmeiras, SN" disabled />
                </div>
                <div>
                  <Label className="text-primary">CEP</Label>
                  <Input value="56000-000" disabled />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-primary">Complemento</Label>
                  <Input disabled />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-primary">Nome do Destinatário</Label>
                  <Input value="José Almeida" disabled />
                </div>
                <div>
                  <Label className="text-primary">Telefone</Label>
                  <Input value="(81) 0000-0000" disabled />
                </div>
              </div>
            </section>

            <div className="flex gap-4 justify-center">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate("/solicitar/logistica")}
              >
                EDITAR
              </Button>
              <Button 
                onClick={handleConfirm}
                className="bg-primary hover:bg-accent"
              >
                CONFIRMAR
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
