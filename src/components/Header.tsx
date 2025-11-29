import React, { useState, useEffect } from 'react';
import ThemeToggleButton from './ThemeToggleButton';
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
          className={`font-medium transition-colors duration-300 ${linkClassName}`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm backdrop-blur-md dark:bg-black dark:border-b dark:border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <LogoIcon className="h-8 w-auto" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              Larica
            </span>
          </a>

          {/* Navegação de Desktop (Centralizada) */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
             <NavLinksComponent 
                className="flex items-center space-x-8"
                linkClassName="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
             />
          </div>

          {/* Botões de Ação de Desktop */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggleButton />
            <a href="#" className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
              Log In
            </a>
            <a href="#" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:hover:bg-blue-500">
              Sign Up
            </a>
          </div>

          {/* Botão do Menu Móvel */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="text-gray-600 hover:text-gray-800 focus:outline-none dark:text-gray-300 dark:hover:text-white"
              aria-label="toggle menu"
              aria-expanded={isMenuOpen}
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay do Menu Móvel */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Conteúdo do Menu */}
        <div className="fixed right-0 top-0 h-full w-4/5 max-w-sm bg-white p-6 shadow-xl dark:bg-black">
          <div className="flex items-center justify-between">
              <a href="#" className="flex items-center gap-2">
                <LogoIcon className="h-8 w-auto" />
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  Larica
                </span>
              </a>
              <div className="flex items-center gap-2">
                <ThemeToggleButton />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  type="button"
                  className="text-gray-600 hover:text-gray-800 focus:outline-none dark:text-gray-300 dark:hover:text-white"
                  aria-label="close menu"
                >
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>
          </div>
          <div className="mt-8 flex flex-col space-y-4">
              <NavLinksComponent 
                className="flex flex-col space-y-4"
                linkClassName="text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              />
              <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
                 <a href="#" className="rounded-lg bg-gray-100 px-4 py-2 text-center font-semibold text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                    Log In
                 </a>
                 <a href="#" className="rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white hover:bg-blue-700 dark:hover:bg-blue-500">
                    Sign Up
                 </a>
              </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;