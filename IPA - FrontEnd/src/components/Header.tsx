import { Link } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        {/* Desktop Navigation */}
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
          <Link to="/teste-usuarios" className="hover:text-primary transition-colors">
            🧪 Teste Usuários
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            to="/login"
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-accent transition-colors"
          >
            <User className="w-5 h-5 text-primary-foreground" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
          <Link 
            to="/projeto" 
            className="hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            O Projeto
          </Link>
          <Link 
            to="/sustentabilidade" 
            className="hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sustentabilidade
          </Link>
          <Link 
            to="/projeto/beneficiarios" 
            className="hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Parceiros
          </Link>
          <Link 
            to="/teste-usuarios" 
            className="hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            🧪 Teste Usuários
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;