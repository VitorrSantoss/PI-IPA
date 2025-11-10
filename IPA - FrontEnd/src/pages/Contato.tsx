import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import forestImage from "@/assets/forest-contact.jpg";

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    estado: "",
    cidade: "",
    assunto: "",
    mensagem: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso!");
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      estado: "",
      cidade: "",
      assunto: "",
      mensagem: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative h-64 flex flex-col items-center justify-center bg-cover bg-center border-4 border-primary mx-6 mt-6 md:mx-12"
        style={{ backgroundImage: `url(${forestImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-primary-foreground px-6">
          <p className="text-primary text-lg font-semibold mb-2">Fale com o S.A.F.R.A.</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Suporte, Dúvidas e Informações</h1>
          <p className="text-lg">Tem alguma dúvida sobre o sistema, rastreamento ou parcerias?</p>
          <p className="text-lg">Quer omitir uma sugestão ou reportar um problema técnico?</p>
          <p className="text-lg">Preencha o formulário abaixo e entre em contato com a gente breve possível.</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary text-primary-foreground rounded-lg p-6 text-center">
            <h3 className="font-bold mb-2">Suporte Técnico S.A.F.R.A.</h3>
            <p className="text-2xl font-bold mb-2">0800 085 4052</p>
            <p className="text-sm">suporteti@ipa<wbr/>safra.pe.gov.br</p>
          </div>
          <div className="bg-primary text-primary-foreground rounded-lg p-6 text-center">
            <h3 className="font-bold mb-2">Logística e Rastreamento</h3>
            <p className="text-2xl font-bold mb-2">0800 085 61 6969 9999</p>
            <p className="text-sm">logistica@ipa<wbr/>safra.pe.gov.br</p>
          </div>
          <div className="bg-primary text-primary-foreground rounded-lg p-6 text-center">
            <h3 className="font-bold mb-2">Parcerias e Credenciamento</h3>
            <p className="text-2xl font-bold mb-2">(81) 3100-0000</p>
            <p className="text-sm">Rua Marquês de Pombal, 57</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  value={formData.estado}
                  onChange={(e) => setFormData({...formData, estado: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={formData.cidade}
                  onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="assunto">Assunto</Label>
                <Input
                  id="assunto"
                  value={formData.assunto}
                  onChange={(e) => setFormData({...formData, assunto: e.target.value})}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  rows={6}
                  value={formData.mensagem}
                  onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <Button type="submit" className="bg-primary hover:bg-accent px-12">
                ENVIAR
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;
