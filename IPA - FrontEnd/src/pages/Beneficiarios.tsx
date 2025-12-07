import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import beneficiariosBanner from "@/assets/beneficiarios-banner.jpg";
import facilities from "@/assets/facilities.jpg";
import farmAerial from "@/assets/farm-aerial.jpg";
import farmerWork from "@/assets/farmer-work.jpg";
import harvestCrates from "@/assets/harvest-crates.jpg";

const Beneficiarios = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative h-64 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${beneficiariosBanner})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-primary-foreground px-6">
          <h1 className="text-4xl font-bold">Nossos Parceiros</h1>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8 py-4">
            <Link to="/projeto/beneficiarios" className="font-semibold text-primary border-b-2 border-primary pb-1">
              Parceiros
            </Link>
          </nav>
        </div>
      </section>

      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Strategic Partners Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-primary mb-8">
              Empresas e Parceiros Estratégicos
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Integração de Grandes Produtores</h3>
                  <p className="text-foreground leading-relaxed">
                    Apoiamos grandes produtores que buscam garantia de qualidade no origem, maximizando partes físicas na 
                    cadeia de sua própria fiscalização e contribuindo para modernizar a logística rural.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Eficiência Logística</h3>
                  <p className="text-foreground leading-relaxed">
                    Coordenamos para um projeto de tecnologia que facilita o rastreamento de sementes e mudas, tornando 
                    cada etapa do apoio físico garantia de entrega e usam dados.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Impacto Social e Ambiental</h3>
                  <p className="text-foreground leading-relaxed">
                    Facilitam a produção sustentável, prezando por materiais de alta qualidade que impactam diretamente na 
                    preservação e aumento da produtividade e a segurança alimentar da região.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Posicionamento Inovador</h3>
                  <p className="text-foreground leading-relaxed">
                    Referência social e econômica que casa inovação, uma agenda do S.A.F.R.A., como sólido parceiro que 
                    traz decisão competente de ataque de mercado e desenvolvimento.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <img src={facilities} alt="Instalações agrícolas" className="w-full rounded-lg shadow-lg" />
                <img src={farmAerial} alt="Vista aérea de fazenda" className="w-full rounded-lg shadow-lg" />
              </div>
            </div>

            <p className="text-sm text-center text-muted-foreground italic">IPA Pernambuco</p>
          </section>

          {/* Family Farming Section */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Produtores Rurais e Agricultura Familiar
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Nossos Agricultores - O Incentivo</h3>
                  <p className="text-foreground leading-relaxed">
                    O sistema estratégico apoia a sementes e mudas a todos de uma maneira justa e otimização, mesmo em 
                    regiões distantes da capital, dá acesso facilitado para uma colheita sustentável e rentável.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Democratização de Insumos</h3>
                  <p className="text-foreground leading-relaxed">
                    A proposta cria o IPA distribui subsídio pelo que solicitado por cada cultura insumo, abrangendo uma 
                    cultura diversa e dá a oportunidade de o produtor atuar escolhendo o material, se necessitando, para cada 
                    temporalidade e quantidade de sua região.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Qualidade e Produtividade</h3>
                  <p className="text-foreground leading-relaxed">
                    A utilização de sementes fiscalizadas e de alta qualidade oferece aos produtores garantia de produção, 
                    alimenta o ciclo agrícola produtivo fazendo cada família ainda mais autossustentável.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Apoio e Rastreabilidade:</h3>
                  <p className="text-foreground leading-relaxed">
                    Além de recebimento permitir ser monitorado e atestado o cadastro no S.A.F.R.A., que promove mais 
                    transparência e ajuda em política de recursos úteis para efetividade.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Crescimento Vertical:</h3>
                  <p className="text-foreground leading-relaxed">
                    O produtor da cultura e raça promovida com o calendário de agricultura pela região, otimizando colheita 
                    e alcançando preço melhor no venda de seus produtos.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Simplificação e Ajuda:</h3>
                  <p className="text-foreground leading-relaxed">
                    A plataforma foi pensada para ser fácil de usar e acessível; facilitando sua percepção do tecnologia, 
                    aproxima escolha e produtividade do sistema.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Conexão e Parceria:</h3>
                  <p className="text-foreground leading-relaxed">
                    O produtor da cultura IPA S.A.F.R.A. sempre consome dos úteis da competência e produz atualização de 
                    fiscalização da IPA.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <img src={farmerWork} alt="Agricultor trabalhando" className="w-full rounded-lg shadow-lg" />
                <img src={harvestCrates} alt="Colheita em caixas" className="w-full rounded-lg shadow-lg" />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Beneficiarios;
