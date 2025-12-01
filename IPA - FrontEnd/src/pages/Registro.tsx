import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-farm.jpg";
import authService from "@/services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    matricula: "",
    localAtuacao: "",
    senha: "",
    confirmarSenha: "",
    cidade: "",
    estado: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const validateForm = () => {
    if (!formData.nome || !formData.cpf || !formData.senha || !formData.email || !formData.telefone) {
      toast.error("Preencha todos os campos obrigatórios");
      return false;
    }

    if (formData.cpf.replace(/\D/g, "").length !== 11) {
      toast.error("CPF inválido");
      return false;
    }

    if (formData.senha.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres");
      return false;
    }

    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const dadosRegistro = {
        nome: formData.nome,
        cpf: formData.cpf,
        telefone: formData.telefone,
        email: formData.email,
        matriculaIpa: formData.matricula || undefined,
        localAtuacao: formData.localAtuacao || undefined,
        senha: formData.senha,
        cidade: formData.cidade || undefined,
        uf: formData.estado || undefined,
      };

      console.log("📤 Enviando dados de registro:", dadosRegistro);

      await authService.register(dadosRegistro);

      toast.success("Cadastro realizado com sucesso! Faça login para continuar.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      console.error("❌ Erro ao cadastrar:", error);
      console.error("❌ Resposta do servidor:", error.response?.data);
      
      const mensagemErro = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Erro ao realizar cadastro";
      
      toast.error(mensagemErro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main
        className="flex-1 flex items-center justify-center px-6 py-12 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-2xl p-8 border-4 border-primary">
            <h1 className="text-3xl font-bold text-center mb-2 text-foreground">
              Criar Conta
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              Cadastre-se no sistema S.A.F.R.A.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome Completo */}
                <div className="md:col-span-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleChange("nome", e.target.value)}
                    placeholder="João Silva"
                    required
                    disabled={loading}
                  />
                </div>

                {/* CPF */}
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => handleChange("cpf", formatCPF(e.target.value))}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Telefone */}
                <div>
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleChange("telefone", formatPhone(e.target.value))}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="joao@email.com"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Matricula IPA */}
                <div>
                  <Label htmlFor="matricula">Matrícula IPA</Label>
                  <Input
                    id="matricula"
                    value={formData.matricula}
                    onChange={(e) => handleChange("matricula", e.target.value)}
                    placeholder="000000"
                    disabled={loading}
                  />
                </div>

                {/* Local de Atuação */}
                <div>
                  <Label htmlFor="localAtuacao">Local de Atuação</Label>
                  <Input
                    id="localAtuacao"
                    value={formData.localAtuacao}
                    onChange={(e) => handleChange("localAtuacao", e.target.value)}
                    placeholder="Ex: Escritório Local"
                    disabled={loading}
                  />
                </div>

                {/* Senha */}
                <div>
                  <Label htmlFor="senha">Senha * (mín. 6 caracteres)</Label>
                  <Input
                    id="senha"
                    type="password"
                    value={formData.senha}
                    onChange={(e) => handleChange("senha", e.target.value)}
                    placeholder="••••••"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Confirmar Senha */}
                <div>
                  <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    value={formData.confirmarSenha}
                    onChange={(e) => handleChange("confirmarSenha", e.target.value)}
                    placeholder="••••••"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Cidade */}
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => handleChange("cidade", e.target.value)}
                    placeholder="Recife"
                    disabled={loading}
                  />
                </div>

                {/* Estado */}
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    value={formData.estado}
                    onChange={(e) => handleChange("estado", e.target.value.toUpperCase())}
                    placeholder="PE"
                    maxLength={2}
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-accent"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  "CADASTRAR"
                )}
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link to="/login" className="text-primary hover:underline font-semibold">
                    Faça login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;