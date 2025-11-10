import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import successImage from "@/assets/success-farm.jpg";

const Sucesso = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main 
        className="flex-1 flex items-center justify-center px-6 py-12 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${successImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 text-center text-primary-foreground max-w-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center">
              <CheckCircle className="w-20 h-20" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">Solicitação Enviada!</h1>
          <p className="text-xl mb-8">
            Acompanhe a situação do seu pedido na página de <span className="font-semibold italic">Rastreio</span>
          </p>

          <div className="flex gap-4 justify-center">
            <Link to="/solicitar/dados-agricultor">
              <Button variant="outline" className="bg-white text-primary hover:bg-white/90">
                NOVA SOLI
              </Button>
            </Link>
            <Link to="/rastreamento">
              <Button className="bg-primary hover:bg-accent">
                RASTREAR
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sucesso;
