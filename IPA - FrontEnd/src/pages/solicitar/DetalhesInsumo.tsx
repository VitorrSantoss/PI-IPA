import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSolicitacao } from "./SolicitacaoContext";

const DetalhesInsumo = () => {
  const navigate = useNavigate();
  const { solicitacao, atualizarSolicitacao } = useSolicitacao();

  const [date, setDate] = useState<Date | undefined>(
    solicitacao.dataIdealPlantio ? new Date(solicitacao.dataIdealPlantio) : undefined
  );

  const [formData, setFormData] = useState({
    tipoInsumo: solicitacao.tipoInsumo || "SEMENTES",
    cultura: solicitacao.cultura || "",
    quantidade: solicitacao.quantidade?.toString() || "",
    unidadeMedida: solicitacao.unidadeMedida || "KG",
    areaPlantada: solicitacao.areaPlantada?.toString() || "",
    areaUnidade: solicitacao.areaUnidade || "M2",
    variedade: solicitacao.variedade || "",
    finalidade: solicitacao.finalidade || "COMERCIAL"
  });

  useEffect(() => {
    setFormData({
      tipoInsumo: solicitacao.tipoInsumo || "SEMENTES",
      cultura: solicitacao.cultura || "",
      quantidade: solicitacao.quantidade?.toString() || "",
      unidadeMedida: solicitacao.unidadeMedida || "KG",
      areaPlantada: solicitacao.areaPlantada?.toString() || "",
      areaUnidade: solicitacao.areaUnidade || "M2",
      variedade: solicitacao.variedade || "",
      finalidade: solicitacao.finalidade || "COMERCIAL"
    });
  }, [solicitacao]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.cultura || !formData.quantidade || !formData.areaPlantada) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    atualizarSolicitacao({
      ...formData,
      quantidade: parseInt(formData.quantidade),
      areaPlantada: parseFloat(formData.areaPlantada),
      dataIdealPlantio: date ? format(date, "yyyy-MM-dd") : undefined
    });

    toast.success("Detalhes do insumo salvos!");
    navigate("/solicitar/logistica");
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
            <h1 className="text-2xl font-bold text-foreground mb-6">DETALHES DA SOLICITAÇÃO (INSUMO)</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="tipoInsumo">Tipo *</Label>
                <Select value={formData.tipoInsumo} onValueChange={(value) => handleChange('tipoInsumo', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SEMENTES">Sementes</SelectItem>
                    <SelectItem value="MUDAS">Mudas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cultura">Cultura Desejada *</Label>
                <Select value={formData.cultura} onValueChange={(value) => handleChange('cultura', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Milho">Milho</SelectItem>
                    <SelectItem value="Feijão">Feijão</SelectItem>
                    <SelectItem value="Mandioca">Mandioca</SelectItem>
                    <SelectItem value="Tomate">Tomate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantidade">Quantidade *</Label>
                <Input
                  id="quantidade"
                  type="number"
                  placeholder="200"
                  value={formData.quantidade}
                  onChange={(e) => handleChange('quantidade', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="unidadeMedida">Unidade de Medida *</Label>
                <Select value={formData.unidadeMedida} onValueChange={(value) => handleChange('unidadeMedida', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KG">Kg</SelectItem>
                    <SelectItem value="UNIDADE">Unidade</SelectItem>
                    <SelectItem value="SACO">Saco</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="areaPlantada">Área a Ser Plantada *</Label>
                <Input
                  id="areaPlantada"
                  type="number"
                  step="0.01"
                  placeholder="5.000"
                  value={formData.areaPlantada}
                  onChange={(e) => handleChange('areaPlantada', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Unidade (área) *</Label>
                <Select value={formData.areaUnidade} onValueChange={(value) => handleChange('areaUnidade', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M2">M² (Metros Quadrados)</SelectItem>
                    <SelectItem value="HECTARES">Hectares</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="variedade">Variedade Específica</Label>
                <Input
                  id="variedade"
                  placeholder="Ex: IPA-100, etc."
                  value={formData.variedade}
                  onChange={(e) => handleChange('variedade', e.target.value)}
                />
              </div>

              <div>
                <Label>Data Ideal de Plantio</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd/MM/yyyy") : "Selecione a data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="finalidade">Finalidade da Solicitação *</Label>
                <Select value={formData.finalidade} onValueChange={(value) => handleChange('finalidade', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COMERCIAL">Plantio Comercial</SelectItem>
                    <SelectItem value="SUBSISTENCIA">Subsistência</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button type="button" variant="outline" onClick={() => navigate("/solicitar/dados-agricultor")}>
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

export default DetalhesInsumo;