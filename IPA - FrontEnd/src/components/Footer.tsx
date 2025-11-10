import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--dark-bg))] text-primary-foreground py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-3">O Projeto</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/projeto" className="hover:text-primary transition-colors">Sobre o Projeto</Link></li>
              <li><Link to="/projeto/beneficiarios" className="hover:text-primary transition-colors">Beneficiários</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Sustentabilidade</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sustentabilidade" className="hover:text-primary transition-colors">Perfil de Sustentabilidade</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Ajuda</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contato" className="hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Perguntas Frequentes</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ajuda" className="hover:text-primary transition-colors">Perguntas Frequentes</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-6 text-center text-sm">
          <p>Quem pode ajudar a receber?</p>
          <p className="mt-2 text-xs opacity-80">
            Este site salva cookies básicos de uso. Se contínuo navegando você consente com a Política de Privacidade e Cookies.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
