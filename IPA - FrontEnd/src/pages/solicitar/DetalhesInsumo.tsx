import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DetalhesInsumo = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    tipo: "",
    cultura: "",
    quantidade: "",
    unidade: "",
    area: "",
    areaUnidade: "",
    variedade: "",
    finalidade: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/solicitar/logistica");
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
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sementes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sementes">Sementes</SelectItem>
                    <SelectItem value="mudas">Mudas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cultura">Cultura Desejada</Label>
                <Select value={formData.cultura} onValueChange={(value) => setFormData({...formData, cultura: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Milho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="milho">Milho</SelectItem>
                    <SelectItem value="feijao">Feijão</SelectItem>
                    <SelectItem value="mandioca">Mandioca</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input
                  id="quantidade"
                  type="number"
                  placeholder="200"
                  value={formData.quantidade}
                  onChange={(e) => setFormData({...formData, quantidade: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="unidade">Unidade de Medida</Label>
                <Select value={formData.unidade} onValueChange={(value) => setFormData({...formData, unidade: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kg" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kg</SelectItem>
                    <SelectItem value="unidade">Unidade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="area">Área a Ser Plantada</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="5.000"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label>Unidade (área)</Label>
                <Select value={formData.areaUnidade} onValueChange={(value) => setFormData({...formData, areaUnidade: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="M2 (Quadrados)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m2">M2 (Quadrados)</SelectItem>
                    <SelectItem value="ha">Hectares</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="variedade">Variedade Específica</Label>
                <Input
                  id="variedade"
                  placeholder="Ex: IPA-100, etc."
                  value={formData.variedade}
                  onChange={(e) => setFormData({...formData, variedade: e.target.value})}
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
                <Label htmlFor="finalidade">Finalidade da Solicitação</Label>
                <Select value={formData.finalidade} onValueChange={(value) => setFormData({...formData, finalidade: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Plantio Comercial" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comercial">Plantio Comercial</SelectItem>
                    <SelectItem value="subsistencia">Subsistência</SelectItem>
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
