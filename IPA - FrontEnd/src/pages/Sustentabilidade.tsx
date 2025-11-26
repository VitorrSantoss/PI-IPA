import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import sustentabilidadeBanner from "@/assets/sustentabilidade-banner.jpg";
import impactoImage from "@/assets/transparencia-safra.png";

const Sustentabilidade = () => {
  const handleDownloadImage = (): void => {
    const link = document.createElement("a");
    link.href = impactoImage;
    link.download = "transparencia-safra.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${sustentabilidadeBanner})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center text-primary-foreground px-6 max-w-4xl">
          <h1 className="text-primary text-xl font-bold mb-4">Perfil de Sustentabilidade</h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Eficiência, Rastreabilidade e Futuro
          </h2>
          <p className="text-lg leading-relaxed mb-8">
            No S.A.F.R.A., acreditamos que a <strong>sustentabilidade</strong> e a <strong>rastreabilidade</strong> 
            são os pilares para construir um sistema agrícola resiliente. Nosso compromisso vai além da simples distribuição 
            de sementes e mudas: queremos que cada agricultor tenha plena consciência da origem do material com que trabalha, 
            dos processos envolvidos e do <strong>impacto social</strong>, <strong>econômico</strong> e 
            <strong> ambiental</strong> gerado.
          </p>
          
          <Button 
            onClick={handleDownloadImage}
            className="bg-primary hover:bg-accent text-lg px-8 py-6"
          >
            Impacto e Sustentabilidade →
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h3 className="text-2xl font-bold text-primary mb-4">1. Rastreamento Completo e Transparente</h3>
            <p className="text-foreground leading-relaxed">
              Cada lote de sementes ou mudas distribuídas pelo S.A.F.R.A. possui um código único de rastreamento. Isso 
              significa que, a qualquer momento, podemos identificar:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 ml-4 text-foreground">
              <li>De onde veio o insumo (fornecedor, variedade, qualidade certificada);</li>
              <li>Quando foi solicitado e aprovado;</li>
              <li>Qual rota logística foi utilizada;</li>
              <li>Em que data foi entregue ao produtor rural;</li>
              <li>Como foi empregado (área plantada, variedade específica, finalidade).</li>
            </ul>
            <p className="text-foreground leading-relaxed mt-4">
              Essa <strong>cadeia de informações</strong> gera confiança e segurança em todo o processo, permitindo 
              auditorias, controle de qualidade e políticas públicas mais eficientes.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-primary mb-4">2. Eficiência no Uso de Recursos</h3>
            <p className="text-foreground leading-relaxed">
              Ao centralizar a gestão de estoque e logística, evitamos desperdícios e garantimos que sementes e mudas 
              cheguem no momento ideal de plantio. Com dados em tempo real, podemos:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 ml-4 text-foreground">
              <li>Reduzir perdas por deterioração ou armazenamento inadequado;</li>
              <li>Otimizar rotas de entrega, diminuindo emissões de carbono;</li>
              <li>Fornecer orientações técnicas que aumentam a produtividade por hectare.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-primary mb-4">3. Impacto Social e Inclusão</h3>
            <p className="text-foreground leading-relaxed">
              Nossa plataforma democratiza o acesso a insumos de qualidade, sobretudo para a agricultura familiar. Isso 
              significa <strong>geração de renda</strong>, <strong>segurança alimentar</strong> e 
              <strong> fortalecimento de comunidades rurais</strong>. A rastreabilidade também permite que produtores 
              comprovem a origem sustentável de seus produtos, abrindo portas para mercados diferenciados e certificações.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-primary mb-4">4. Responsabilidade Ambiental</h3>
            <p className="text-foreground leading-relaxed">
              Ao incentivar o uso de variedades melhoradas e adaptadas ao clima local, reduzimos a necessidade de 
              agroquímicos e promovemos práticas mais sustentáveis. O rastreamento permite identificar áreas de cultivo, 
              monitorar impactos ambientais e orientar políticas de conservação de solo e água.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-primary mb-4">5. Visão de Futuro</h3>
            <p className="text-foreground leading-relaxed">
              O S.A.F.R.A. é mais do que uma plataforma de distribuição: é uma ferramenta de transformação. Com dados 
              sólidos e processos transparentes, contribuímos para um futuro em que:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 ml-4 text-foreground">
              <li>
                <strong>Produtores</strong> têm autonomia e conhecimento para tomar decisões informadas;
              </li>
              <li>
                <strong>Gestores públicos</strong> contam com informações precisas para políticas eficazes;
              </li>
              <li>
                <strong>A sociedade</strong> se beneficia de um sistema agrícola mais justo, produtivo e sustentável.
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sustentabilidade;