import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, User, Mail, Phone, MapPin } from 'lucide-react';
import usuarioService from '@/services/usuarioService';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
  ativo: boolean;
}

const TesteUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await usuarioService.listarUsuarios();
      setUsuarios(data);
    } catch (err) {
      setError('Erro ao carregar usuários. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-destructive">❌ Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={carregarUsuarios} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">🧪 Teste de Usuários</h1>
            <p className="text-muted-foreground">
              Total de usuários: <strong>{usuarios.length}</strong>
            </p>
          </div>
          <Button onClick={carregarUsuarios} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usuarios.map((usuario) => (
            <Card key={usuario.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{usuario.nome}</CardTitle>
                      <Badge variant={usuario.ativo ? "default" : "secondary"}>
                        {usuario.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{usuario.email}</span>
                </div>
                {usuario.telefone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{usuario.telefone}</span>
                  </div>
                )}
                {usuario.endereco && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{usuario.endereco}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {usuarios.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Nenhum usuário encontrado</h3>
              <p className="text-muted-foreground">
                Cadastre usuários no backend para vê-los aqui.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TesteUsuarios;