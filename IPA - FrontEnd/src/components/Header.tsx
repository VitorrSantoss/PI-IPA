import { Link } from "react-router-dom";
import { User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[hsl(var(--dark-bg))] text-primary-foreground py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="text-2xl font-bold">IPA</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-primary font-bold text-lg">S.A.F.R.A.</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/projeto" className="hover:text-primary transition-colors">
            O Projeto
          </Link>
          <Link to="/sustentabilidade" className="hover:text-primary transition-colors">
            Sustentabilidade
          </Link>
          <Link to="/projeto/beneficiarios" className="hover:text-primary transition-colors">
            Parceiros
          </Link>
        </nav>

        <Link 
          to="/login"
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-accent transition-colors"
        >
          <User className="w-5 h-5 text-primary-foreground" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
