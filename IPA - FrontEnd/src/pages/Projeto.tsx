import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import projetoBanner from "@/assets/projeto-banner.jpg";
import cropsField from "@/assets/crops-field.jpg";

const Projeto = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative h-64 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${projetoBanner})` }}
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
            <Link to="/projeto" className="font-semibold text-primary border-b-2 border-primary pb-1">
              Sobre o projeto
            </Link>
          </nav>
        </div>
      </section>

      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">Programa S.A.F.R.A</h2>
                <h3 className="text-xl font-bold text-primary mb-4">
                  LOGÍSTICA DIGITAL E APOIO À PRODUÇÃO AGRÍCOLA
                </h3>
              </div>

              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                  <strong>O IPA S.A.F.R.A.</strong> nasceu com um propósito claro e essencial: <strong>centralizar e agilizar a 
                  logística de aquisição e a distribuição</strong> de sementes e mudas de alta qualidade em todo o estado de 
                  Pernambuco. Graças a parcerias estratégicas, fornecemos o suporte necessário para que agricultores em 
                  <strong> diferentes regiões e sistemas</strong> tenham <strong>fácil acesso a insumos</strong> 
                  essenciais, promovendo o aumento da <strong>produtividade</strong> e a <strong>segurança alimentar</strong> no estado.
                </p>

                <p>
                  <strong>Dentro desse cenário, a plataforma</strong> desempenha um <strong>papel digital e de 
                  rastreamento</strong>, assegurando que o material chegue ao produtor rural no momento certo. Com um 
                  <strong> sistema digital de ponta</strong> para a gestão de estoque e fiscalização, a plataforma oferece 
                  <strong> dados em tempo real</strong> para assegurar a <strong>procedência</strong> e a 
                  <strong> confiabilidade</strong> das entregas aos campos.
                </p>

                <p>
                  Além da logística, o programa também tem <strong>objetivos mais amplos</strong> que incluem:
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Apoio Técnico:</strong> Oferecendo capacitação e orientação, preparamos os produtores com as 
                    melhores práticas para plantar e gerir a produção. Essa estratégia garante que o insumo seja não apenas 
                    entregue, mas <strong>usado de forma eficiente</strong> e <strong>produtiva</strong>, maximizando os 
                    resultados obtidos.
                  </li>
                  <li>
                    <strong>Rastreamento Completo:</strong> Desde o momento da solicitação até o plantio final, cada etapa 
                    é monitorada. Isso permite saber exatamente o que foi solicitado, onde está o insumo e quando foi 
                    entregue, criando um <strong>histórico</strong> do sistema que facilita a manutenção da 
                    <strong> qualidade</strong> e a <strong>confiança</strong>.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:sticky lg:top-6">
              <img
                src={cropsField}
                alt="Campo agrícola"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projeto;
