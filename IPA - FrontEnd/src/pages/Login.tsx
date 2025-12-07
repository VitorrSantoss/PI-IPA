// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-farm.jpg";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Se já estiver autenticado, redireciona para home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const formatarCpfCnpj = (valor: string) => {
    const numeros = valor.replace(/\D/g, "");
    
    if (numeros.length <= 11) {
      // CPF: 000.000.000-00
      return numeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    } else {
      // CNPJ: 00.000.000/0000-00
      return numeros
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    }
  };

  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarCpfCnpj(e.target.value);
    setCpfCnpj(valorFormatado);
  };

  const validarCpfCnpj = (valor: string): boolean => {
    const numeros = valor.replace(/\D/g, "");
    return numeros.length === 11 || numeros.length === 14;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cpfLimpo = cpfCnpj.replace(/\D/g, "");

    // Validações
    if (!validarCpfCnpj(cpfCnpj)) {
      setError("CPF ou CNPJ inválido");
      return;
    }

    if (!senha || senha.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      console.log("🔄 Enviando requisição de login...");
      console.log("📤 CPF:", cpfLimpo);

      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf: cpfLimpo,
          senha: senha
        }),
      });

      console.log("📡 Status da resposta:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Erro ao fazer login"
        }));
        
        // Mensagens específicas por status
        if (response.status === 401) {
          throw new Error("CPF ou senha inválidos");
        } else if (response.status === 400) {
          throw new Error(errorData.message || "Dados inválidos");
        } else if (response.status === 500) {
          throw new Error("Erro no servidor. Tente novamente mais tarde.");
        } else {
          throw new Error(errorData.message || "Erro ao fazer login");
        }
      }

      const data = await response.json();
      console.log("✅ Resposta do backend:", data);

      // Chamar função login do contexto
      login(data);

      // Redirecionar para home
      console.log("🏠 Redirecionando para home...");
      navigate("/", { replace: true });

    } catch (err: any) {
      console.error("❌ Erro no login:", err);
      setError(err.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Form Section */}
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
            
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="cpf" className="text-foreground">CPF ou CNPJ</Label>
                <Input
                  id="cpf"
                  type="text"
                  value={cpfCnpj}
                  onChange={handleCpfCnpjChange}
                  placeholder="000.000.000-00"
                  className="mt-1"
                  maxLength={18}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="senha" className="text-foreground">Senha</Label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={mostrarSenha ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="••••••"
                    className="mt-1 pr-10"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={loading}
                  >
                    {mostrarSenha ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
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