// src/pages/admin/GerenciarSementes.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, EyeOff, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sementeService, Semente } from "@/services/sementeServices";

const GerenciarSementes = () => {
  const [sementes, setSementes] = useState<Semente[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [sementeEditando, setSementeEditando] = useState<Semente | null>(null);

  // Estado do formulário
  const [formData, setFormData] = useState<Semente>({
    nome: "",
    tipo: "SEMENTE",
    cultura: "",
    variedade: "",
    descricao: "",
    estoqueDisponivel: 0,
    unidadeMedida: "KG",
    pesoUnidade: 0,
    ativo: true,
    imagemUrl: "",
    observacoes: ""
  });

  useEffect(() => {
    carregarSementes();
  }, []);

  const carregarSementes = async () => {
    try {
      setLoading(true);
      const dados = await sementeService.listarTodas();
      setSementes(dados);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (sementeEditando) {
        await sementeService.atualizar(sementeEditando.id!, formData);
        toast.success("Semente atualizada com sucesso!");
      } else {
        await sementeService.criar(formData);
        toast.success("Semente cadastrada com sucesso!");
      }
      
      setModalAberto(false);
      limparFormulario();
      carregarSementes();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEditar = (semente: Semente) => {
    setSementeEditando(semente);
    setFormData(semente);
    setModalAberto(true);
  };

  const handleDeletar = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar esta semente?")) return;
    
    try {
      await sementeService.deletar(id);
      toast.success("Semente deletada com sucesso!");
      carregarSementes();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleAlternarStatus = async (id: number) => {
    try {
      await sementeService.alternarStatus(id);
      toast.success("Status alterado com sucesso!");
      carregarSementes();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const limparFormulario = () => {
    setFormData({
      nome: "",
      tipo: "SEMENTE",
      cultura: "",
      variedade: "",
      descricao: "",
      estoqueDisponivel: 0,
      unidadeMedida: "KG",
      pesoUnidade: 0,
      ativo: true,
      imagemUrl: "",
      observacoes: ""
    });
    setSementeEditando(null);
  };

  const sementesFiltradas = sementes.filter(s =>
    s.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    s.cultura.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Gerenciar Sementes</h1>
            
            <Dialog open={modalAberto} onOpenChange={setModalAberto}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-accent" onClick={limparFormulario}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Semente
                </Button>
              </DialogTrigger>
              
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {sementeEditando ? "Editar Semente" : "Cadastrar Nova Semente"}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label>Nome *</Label>
                      <Input
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        placeholder="Ex: Milho Híbrido IPA-100"
                        required
                      />
                    </div>

                    <div>
                      <Label>Tipo *</Label>
                      <Select 
                        value={formData.tipo} 
                        onValueChange={(value) => setFormData({...formData, tipo: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SEMENTE">Semente</SelectItem>
                          <SelectItem value="MUDA">Muda</SelectItem>
                          <SelectItem value="FERTILIZANTE">Fertilizante</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Cultura *</Label>
                      <Input
                        value={formData.cultura}
                        onChange={(e) => setFormData({...formData, cultura: e.target.value})}
                        placeholder="Ex: Milho"
                        required
                      />
                    </div>

                    <div>
                      <Label>Variedade</Label>
                      <Input
                        value={formData.variedade}
                        onChange={(e) => setFormData({...formData, variedade: e.target.value})}
                        placeholder="Ex: IPA-100"
                      />
                    </div>

                    <div>
                      <Label>Estoque Disponível *</Label>
                      <Input
                        type="number"
                        value={formData.estoqueDisponivel}
                        onChange={(e) => setFormData({...formData, estoqueDisponivel: parseInt(e.target.value)})}
                        required
                      />
                    </div>

                    <div>
                      <Label>Unidade de Medida *</Label>
                      <Select 
                        value={formData.unidadeMedida} 
                        onValueChange={(value) => setFormData({...formData, unidadeMedida: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="KG">Kg</SelectItem>
                          <SelectItem value="UNIDADE">Unidade</SelectItem>
                          <SelectItem value="SACO">Saco</SelectItem>
                          <SelectItem value="LITRO">Litro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Peso por Unidade (kg)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.pesoUnidade}
                        onChange={(e) => setFormData({...formData, pesoUnidade: parseFloat(e.target.value)})}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label>Descrição</Label>
                      <Input
                        value={formData.descricao}
                        onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                        placeholder="Descrição detalhada da semente"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label>Observações</Label>
                      <Input
                        value={formData.observacoes}
                        onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                        placeholder="Observações adicionais"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end">
                    <Button type="button" variant="outline" onClick={() => {
                      setModalAberto(false);
                      limparFormulario();
                    }}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-accent">
                      {sementeEditando ? "Atualizar" : "Cadastrar"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filtro */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome ou cultura..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabela */}
          <div className="border-2 border-primary/20 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Nome</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Tipo</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Cultura</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Estoque</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        Carregando...
                      </td>
                    </tr>
                  ) : sementesFiltradas.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        Nenhuma semente encontrada
                      </td>
                    </tr>
                  ) : (
                    sementesFiltradas.map((semente) => (
                      <tr key={semente.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3">{semente.nome}</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{semente.tipo}</Badge>
                        </td>
                        <td className="px-4 py-3">{semente.cultura}</td>
                        <td className="px-4 py-3">
                          {semente.estoqueDisponivel} {semente.unidadeMedida}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={semente.ativo ? "default" : "secondary"}>
                            {semente.ativo ? "Ativo" : "Inativo"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditar(semente)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAlternarStatus(semente.id!)}
                            >
                              {semente.ativo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeletar(semente.id!)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GerenciarSementes;