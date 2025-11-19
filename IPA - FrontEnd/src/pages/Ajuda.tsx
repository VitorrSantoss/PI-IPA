import { Link } from "react-router-dom";
import { Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ajudaBanner from "@/assets/ajuda-banner.jpg";
import techSupport from "@/assets/tech-support.jpg";
import sustainabilityIcon from "@/assets/sustainability-icon.jpg";

const Ajuda = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative h-64 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${ajudaBanner})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-primary-foreground px-6">
          <h1 className="text-4xl font-bold">Projeto S.A.F.R.A.</h1>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8 py-4">
            <Link to="/ajuda" className="font-semibold text-primary border-b-2 border-primary pb-1">
              Perguntas Frequentes
            </Link>
          </nav>
        </div>
      </section>

      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Intro Text */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-lg text-foreground leading-relaxed mb-2">
              <strong>Todos podem colaborar para a eficiência e a transparência</strong>
            </p>
            <p className="text-lg text-foreground leading-relaxed mb-2">
              <strong>em campo. Seja parceiros com dados e</strong>
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              <strong>estrutura de utilização de plataformas para obter insumos.</strong>
            </p>
          </div>

          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-foreground leading-relaxed">
              Junte, podemos transformar dados em produção e
            </p>
            <p className="text-foreground leading-relaxed">
              logística em cultivos fartos.
            </p>
          </div>

          {/* Two Column Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Technical Support Card */}
            <div className="border-2 border-primary rounded-lg overflow-hidden">
              <div className="bg-primary text-primary-foreground p-6 text-center">
                <h2 className="text-2xl font-bold">Colaboradores e Apoio Técnico</h2>
              </div>
              
              <div className="p-6">
                <img 
                  src={techSupport} 
                  alt="Suporte técnico" 
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Técnicos e Extensionistas Rurais - Guardas</h3>
                      <p className="text-sm text-foreground">
                        São pontes entre o produtor e informações e em muitas regiões e são nossos parceiros para tornar 
                        o uso de S.A.F.R.A. mais efetivo.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Mobilização e Credenciamento de Agricultores - Quem 
                      produz</h3>
                      <p className="text-sm text-foreground">
                        São aqueles envolvidos no processo e atuam monitorando demanda e cadastrando participação de 
                        S.A.F.R.A. além de cumprir dado para boas prática.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Capacitação e Orientação - Técnica</h3>
                      <p className="text-sm text-foreground">
                        Incentivam o produtor com ajuda de como melhor gerir sementes e mudas, maximizando colheita e segurança.
                      </p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>

            {/* Operational Partners Card */}
            <div className="border-2 border-primary rounded-lg overflow-hidden">
              <div className="bg-primary text-primary-foreground p-6 text-center">
                <h2 className="text-2xl font-bold">Usuários e Parceiros Operacionais</h2>
              </div>
              
              <div className="p-6">
                <img 
                  src={sustainabilityIcon} 
                  alt="Sustentabilidade" 
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Produtores de Sementes e Mudas</h3>
                      <p className="text-sm text-foreground">
                        Que oferecem o insumo de origem com rastreamento e S.A.F.R.A. para manutenção de cadastro 
                        garantindo alta qualidade.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Empresas de Logística e Transporte</h3>
                      <p className="text-sm text-foreground">
                        São os responsáveis de entrega insumo em tempo hábil e qualidade, conectadas a S.A.F.R.A. a fim 
                        de atender fiscalização e eficácia.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Órgãos Públicos e Instituições de Pesquisa</h3>
                      <p className="text-foreground text-sm">
                        Gestão com o IPA e S.A.F.R.A. validam dados de produtores, insumos e políticas agrícolas eficazes.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Grandes Empresas Parceiras do Agronegócio - Cadeias 
                      produtivas</h3>
                      <p className="text-sm text-foreground">
                        Grandes empresas atuam com credibilidade e certificação do IPA S.A.F.R.A. para segurança 
                        rastreabilidade e garantia de produto.
                      </p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Ajuda;
