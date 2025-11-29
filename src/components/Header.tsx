import React, { useState, useEffect } from 'react';
import logoSimbol from '../assets/logo-simbol.png';

// Componente de Logo usando Imagem
const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <img 
    src={logoSimbol} 
    alt="Larica Logo"
    width={300}
    height={300}
    className={className} 
  />
);

// Ícones para o menu móvel
const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efeito para travar o scroll do body quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: '#', label: 'Página Inicial' },
    { href: '#', label: 'Mapas' },
    { href: '#', label: 'Contato' },
    { href: '#', label: 'Ajuda' },
  ];

  const NavLinksComponent: React.FC<{ className?: string, linkClassName?: string }> = ({ className, linkClassName }) => (
    <nav className={className}>
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-dark-one text-light-main border-b border-dark-three">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img src={logoSimbol} alt="Larica Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold">Larica</span>
        </a>

        {/* Navegação de Desktop (Centralizada) */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          <nav className="flex items-center gap-6 text-dark-three">
            <a href="#">Página Inicial</a>
            <a href="#">Mapas</a>
            <a href="#">Contato</a>
            <a href="#">Ajuda</a>
          </nav>
        </div>

        {/* Botões de Ação de Desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          <a href="#" className="rounded-lg px-4 py-2 text-sm font-semibold hover:bg-dark-two">Log In</a>
          <a href="#" className="rounded-lg bg-primary-main px-4 py-2 text-sm font-semibold text-white hover:bg-primary-one">Sign Up</a>
        </div>

        {/* Botão do Menu Móvel */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="text-light-main"
            aria-label="toggle menu"
            aria-expanded={isMenuOpen}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isMenuOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-dark-one p-6 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform`}>
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <img src={logoSimbol} alt="Larica Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold">Larica</span>
            </a>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsMenuOpen(false)} className="text-light-main" aria-label="close menu">
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <nav className="mt-8 flex flex-col gap-4 text-light-main">
            <a href="#" className="text-lg hover:text-primary-main">Página Inicial</a>
            <a href="#" className="text-lg hover:text-primary-main">Mapas</a>
            <a href="#" className="text-lg hover:text-primary-main">Contato</a>
            <a href="#" className="text-lg hover:text-primary-main">Ajuda</a>
          </nav>

          <div className="mt-6 flex flex-col gap-3 border-t border-dark-three pt-6">
            <a href="#" className="rounded-lg bg-dark-two px-4 py-2 text-center font-semibold">Log In</a>
            <a href="#" className="rounded-lg bg-primary-main px-4 py-2 text-center font-semibold text-white">Sign Up</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;