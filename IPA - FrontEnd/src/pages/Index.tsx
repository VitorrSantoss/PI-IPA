import { Link } from "react-router-dom";
import { LogIn, Leaf, FileText, Phone, Settings } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-farm.jpg";
import safraIcon from "@/assets/safra-icon.png";

const Index = () => {
  const actionCards = [
    {
      icon: LogIn,
      title: "Login",
      link: "/login"
    },
    {
      icon: Leaf,
      title: "Solicitação de Insumos",
      link: "/solicitar/dados-agricultor"
    },
    {
      icon: FileText,
      title: "Rastreamento de Pedidos",
      link: "/rastreamento"
    },
    {
      icon: Phone,
      title: "Contato IPA",
      link: "/contato"
    },
    {
      icon: Settings,
      title: "Gerenciar Sementes",
      link: "/admin/sementes",
      admin: true // ✅ Marcador para destacar visualmente
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-primary-foreground px-6">
          <div className="flex justify-center mb-6">
            <img src={safraIcon} alt="S.A.F.R.A." className="w-32 h-32" />
          </div>
          <div className="space-y-2">
            <p className="text-lg md:text-xl">Invista na Colheita</p>
            <p className="text-lg md:text-xl">Apoie o Produtor</p>
            <p className="text-lg md:text-xl">Fortaleça a Agricultura</p>
            <p className="text-xl md:text-2xl font-bold">Seja S.A.F.R.A.</p>
          </div>
        </div>
      </section>

      {/* Instituto Section */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            INSTITUTO AGRÔNOMO DE PERNAMBUCO ®
          </h1>
          <p className="text-muted-foreground italic">
            S.A.F.R.A.: Sistema de Aquisição, Fiscalização e Rastreamento Agrícola
          </p>
        </div>
      </section>

      {/* Action Cards */}
      <section className="py-12 px-6 relative" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {actionCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Link
                  key={index}
                  to={card.link}
                  className={`bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 hover:shadow-xl transition-all hover:-translate-y-1 ${
                    card.admin ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    card.admin ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    <Icon className={`w-8 h-8 ${card.admin ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <p className="text-center font-medium text-foreground">{card.title}</p>
                  {card.admin && (
                    <span className="text-xs text-primary font-semibold">ADMIN</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <p className="text-foreground leading-relaxed">
            O S.A.F.R.A. (Sistema de Aquisição, Fiscalização e Rastreamento Agrícola) tem como missão centralizar e otimizar 
            a logística de aquisição e distribuição de sementes e mudas de alta qualidade em Pernambuco.
          </p>
          <p className="text-foreground leading-relaxed">
            Nosso sistema integra tecnologia e transparência, elementos chave do Rastreamento Agrícola, para assegurar que o 
            material chegue ao produtor rural no momento certo. Com um sistema digital de ponta para a gestão, estoque, 
            fiscalização, a plataforma oferece dados em tempo real para assegurar a procedência e a confiabilidade das entregas aos 
            campos.
          </p>
          <p className="text-foreground leading-relaxed">
            Por meio de parcerias estratégicas, facilitamos o acesso a insumos essenciais, promovendo o aumento 
            da produtividade e a segurança alimentar no estado, com foco na agricultura familiar.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;