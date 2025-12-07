import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSolicitacao } from "./SolicitacaoContext";
import authService from "@/services/authService";

const DadosAgricultor = () => {
  const navigate = useNavigate();
  const { solicitacao, atualizarSolicitacao } = useSolicitacao();

  // Estado para controlar edição
  const [modoEdicao, setModoEdicao] = useState(false);

  // ✅ Carregar dados do usuário logado SEMPRE
  const [dadosSolicitante, setDadosSolicitante] = useState({
    solicitanteNome: "",
    solicitanteCpf: "",
    solicitanteMatricula: "",
    solicitanteTelefone: "",
    localAtuacao: "",
  });

  // Estado para dados do beneficiário
  const [formData, setFormData] = useState({
    beneficiarioNome: solicitacao.beneficiarioNome || "",
    beneficiarioCpf: solicitacao.beneficiarioCpf || "",
    beneficiarioCaf: solicitacao.beneficiarioCaf || "",
    tipoPropriedade: solicitacao.tipoPropriedade || "",
    beneficiarioCep: solicitacao.beneficiarioCep || "",
    beneficiarioComplemento: solicitacao.beneficiarioComplemento || "",
    pontoReferencia: solicitacao.pontoReferencia || "",
  });

  // ✅ Sempre buscar dados do usuário logado ao montar o componente
  useEffect(() => {
    const usuarioLogado = authService.getCurrentUser();
    
    if (usuarioLogado) {
      const dadosUsuario = {
        solicitanteNome: usuarioLogado.nome || "",
        solicitanteCpf: usuarioLogado.cpf || "",
        solicitanteMatricula: usuarioLogado.matriculaIpa || "",
        solicitanteTelefone: usuarioLogado.telefone || "",
        localAtuacao: usuarioLogado.localAtuacao || "",
      };

      // ✅ SEMPRE carregar do usuário logado (não do contexto)
      setDadosSolicitante(dadosUsuario);
      
      // ✅ Atualizar contexto
      atualizarSolicitacao(dadosUsuario);
    } else {
      toast.error("Usuário não autenticado. Faça login novamente.");
      navigate("/login");
    }
  }, []); // ✅ Executar apenas uma vez ao montar

  // Atualizar dados do beneficiário quando o contexto mudar
  useEffect(() => {
    setFormData({
      beneficiarioNome: solicitacao.beneficiarioNome || "",
      beneficiarioCpf: solicitacao.beneficiarioCpf || "",
      beneficiarioCaf: solicitacao.beneficiarioCaf || "",
      tipoPropriedade: solicitacao.tipoPropriedade || "",
      beneficiarioCep: solicitacao.beneficiarioCep || "",
      beneficiarioComplemento: solicitacao.beneficiarioComplemento || "",
      pontoReferencia: solicitacao.pontoReferencia || "",
    });
  }, [solicitacao]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (
      !dadosSolicitante.solicitanteNome ||
      !dadosSolicitante.solicitanteCpf ||
      !formData.beneficiarioNome ||
      !formData.beneficiarioCpf ||
      !formData.tipoPropriedade ||
      !formData.beneficiarioCep
    ) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    // Atualizar contexto com TODOS os dados
    atualizarSolicitacao({
      ...dadosSolicitante,
      ...formData,
    });

    toast.success("Dados salvos com sucesso!");
    navigate("/solicitar/detalhes");
  };

  const handleChangeSolicitante = (field: string, value: string) => {
    setDadosSolicitante((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangeBeneficiario = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditarSolicitante = () => {
    if (modoEdicao) {
      // Salvar alterações
      atualizarSolicitacao(dadosSolicitante);
      toast.success("Dados do solicitante atualizados!");
    }
    setModoEdicao(!modoEdicao);
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-white px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* ✅ SOLICITANTE - Preenchido automaticamente do login, mas editável */}
            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  DADOS DO USUÁRIO SOLICITANTE (IPA)
                </h2>
                <Button
                  type="button"
                  variant="outline"
                  className={`${
                    modoEdicao
                      ? "bg-primary text-primary-foreground hover:bg-accent"
                      : "bg-primary text-primary-foreground hover:bg-accent"
                  }`}
                  onClick={handleEditarSolicitante}
                >
                  {modoEdicao ? "SALVAR" : "EDITAR"}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nome completo *</Label>
                  <Input
                    value={dadosSolicitante.solicitanteNome}
                    onChange={(e) =>
                      handleChangeSolicitante("solicitanteNome", e.target.value)
                    }
                    disabled={!modoEdicao}
                    className={modoEdicao ? "bg-white" : "bg-muted"}
                    required
                  />
                </div>
                <div>
                  <Label>CPF *</Label>
                  <Input
                    value={formatCPF(dadosSolicitante.solicitanteCpf)}
                    onChange={(e) =>
                      handleChangeSolicitante(
                        "solicitanteCpf",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    disabled={!modoEdicao}
                    className={modoEdicao ? "bg-white" : "bg-muted"}
                    maxLength={14}
                    required
                  />
                </div>
                <div>
                  <Label>Matrícula IPA</Label>
                  <Input
                    value={dadosSolicitante.solicitanteMatricula}
                    onChange={(e) =>
                      handleChangeSolicitante(
                        "solicitanteMatricula",
                        e.target.value
                      )
                    }
                    disabled={!modoEdicao}
                    className={modoEdicao ? "bg-white" : "bg-muted"}
                  />
                </div>
                <div>
                  <Label>Telefone de contato *</Label>
                  <Input
                    value={formatPhone(dadosSolicitante.solicitanteTelefone)}
                    onChange={(e) =>
                      handleChangeSolicitante(
                        "solicitanteTelefone",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    disabled={!modoEdicao}
                    className={modoEdicao ? "bg-white" : "bg-muted"}
                    maxLength={15}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Local de Atuação *</Label>
                  <Input
                    value={dadosSolicitante.localAtuacao}
                    onChange={(e) =>
                      handleChangeSolicitante("localAtuacao", e.target.value)
                    }
                    disabled={!modoEdicao}
                    className={modoEdicao ? "bg-white" : "bg-muted"}
                    required
                  />
                </div>
              </div>

              {/* ✅ Aviso informativo */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  ℹ️ Estes dados foram carregados do seu cadastro. Você pode editá-los apenas para esta solicitação.
                </p>
              </div>
            </div>

            {/* ✅ BENEFICIÁRIO - EDITÁVEL */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">
                DADOS DO AGRICULTOR BENEFICIADO
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="beneficiarioNome">Nome completo *</Label>
                  <Input
                    id="beneficiarioNome"
                    placeholder="João Silva"
                    value={formData.beneficiarioNome}
                    onChange={(e) =>
                      handleChangeBeneficiario(
                        "beneficiarioNome",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="beneficiarioCpf">CPF *</Label>
                  <Input
                    id="beneficiarioCpf"
                    placeholder="000.000.000-00"
                    value={formData.beneficiarioCpf}
                    onChange={(e) =>
                      handleChangeBeneficiario(
                        "beneficiarioCpf",
                        formatCPF(e.target.value)
                      )
                    }
                    maxLength={14}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="beneficiarioCaf">
                    CAF (Cadastro Nacional da Agricultura Familiar)
                  </Label>
                  <Input
                    id="beneficiarioCaf"
                    placeholder="00.000.000/0"
                    value={formData.beneficiarioCaf}
                    onChange={(e) =>
                      handleChangeBeneficiario(
                        "beneficiarioCaf",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="tipoPropriedade">Tipo de Propriedade *</Label>
                  <Input
                    id="tipoPropriedade"
                    placeholder="SITIO, FAZENDA ou ASSENTAMENTO"
                    value={formData.tipoPropriedade}
                    onChange={(e) =>
                      handleChangeBeneficiario(
                        "tipoPropriedade",
                        e.target.value.toUpperCase()
                      )
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="beneficiarioCep">CEP *</Label>
                  <Input
                    id="beneficiarioCep"
                    placeholder="00000-000"
                    value={formData.beneficiarioCep}
                    onChange={(e) =>
                      handleChangeBeneficiario(
                        "beneficiarioCep",
                        formatCEP(e.target.value)
                      )
                    }
                    maxLength={9}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="beneficiarioComplemento">Complemento</Label>
                  <Input
                    id="beneficiarioComplemento"
                    value={formData.beneficiarioComplemento}
                    onChange={(e) =>
                      handleChangeBeneficiario(
                        "beneficiarioComplemento",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="pontoReferencia">
                    Ponto de Referência (opcional)
                  </Label>
                  <Input
                    id="pontoReferencia"
                    placeholder="Ex: Próximo ao mercado central"
                    value={formData.pontoReferencia}
                    onChange={(e) =>
                      handleChangeBeneficiario(
                        "pontoReferencia",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
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