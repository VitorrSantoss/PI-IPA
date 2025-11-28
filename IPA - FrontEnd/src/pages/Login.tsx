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

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cpf || !senha) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (cpf.replace(/\D/g, '').length !== 11) {
      toast.error("CPF inválido");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login({ cpf, senha });
      
      toast.success(response.message || "Login realizado com sucesso!");
      
      // Redirecionar para a página inicial após um breve delay
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      
      if (error.response?.status === 401) {
        toast.error("CPF ou senha inválidos");
      } else {
        toast.error(error.response?.data?.message || "Erro ao fazer login. Tente novamente.");
      }
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
        
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white rounded-lg shadow-2xl p-8 border-4 border-primary">
            <h1 className="text-3xl font-bold text-center mb-2 text-foreground">Login</h1>
            <p className="text-center text-muted-foreground mb-8">
              Acesse o sistema S.A.F.R.A.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="cpf" className="text-foreground">CPF do usuário</Label>
                <Input
                  id="cpf"
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(formatCPF(e.target.value))}
                  placeholder="000.000.000-00"
                  className="mt-1"
                  maxLength={14}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="senha" className="text-foreground">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••"
                  className="mt-1"
                  required
                  disabled={loading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-accent"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'ENTRAR'
                )}
              </Button>

              <div className="space-y-3">
                <div className="text-center">
                  <button 
                    type="button" 
                    className="text-sm text-primary hover:underline"
                    onClick={() => toast.info("Funcionalidade em desenvolvimento")}
                  >
                    Esqueci a senha
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Não tem uma conta?{' '}
                    <Link to="/cadastro" className="text-primary hover:underline font-semibold">
                      Cadastre-se
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;