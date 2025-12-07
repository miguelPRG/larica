import { useState, useEffect } from "react";
import logoSimbol from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

// Componente de Logo usando Imagem
const LogoIcon = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <img
      src={logoSimbol}
      alt="Larica Logo"
      width={150}
      height={150}
      className={className}
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/")}
    />
  );
};
// Ícones para o menu móvel
const MenuIcon = ({ className }: { className?: string }) => (
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

const CloseIcon = ({ className }: { className?: string }) => (
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

const LogoutIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
    />
  </svg>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const name = useAuth((state) => state?.user?.displayName);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Efeito para travar o scroll do body quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-dark-one text-light-main border-b border-dark-three">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <LogoIcon />

        {/* Navegação de Desktop (Centralizada) */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          <nav className="flex items-center gap-6 text-dark-three">
            <Link to="/" className="hover:text-light-main">
              Página Inicial
            </Link>
            <Link to="/mapas" className="hover:text-light-main">
              Mapas
            </Link>
            <Link to="/contato" className="hover:text-light-main">
              Contato
            </Link>
            <Link to="/ajuda" className="hover:text-light-main">
              Ajuda
            </Link>
          </nav>
        </div>

        {/* Botões de Ação de Desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          {!name ? (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold hover:bg-dark-two"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-primary-main px-4 py-2 text-sm font-semibold text-white hover:bg-primary-one"
              >
                Registe-se
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span>Olá, {name || "Usuário"}!</span>
              <Link
                to="/edit-profile"
                className="rounded-lg px-4 py-2 text-sm font-semibold hover:bg-dark-two"
              >
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg px-4 py-2 text-sm font-semibold hover:bg-dark-two flex items-center gap-2"
                title="Sair"
              >
                <LogoutIcon className="w-5 h-5" />
              </button>
            </div>
          )}
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
      <div className={`fixed inset-0 z-40 lg:hidden ${isMenuOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-dark-one p-6 ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform`}
        >
          <div className="flex items-center justify-between">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <img src={logoSimbol} alt="Larica Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold">Larica</span>
            </Link>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsMenuOpen(false)} className="text-light-main" aria-label="close menu">
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <nav className="mt-8 flex flex-col gap-4 text-light-main">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg hover:text-primary-main text-left"
            >
              Página Inicial
            </Link>
            <Link
              to="/mapas"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg hover:text-primary-main text-left"
            >
              Mapas
            </Link>
            <Link
              to="/contato"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg hover:text-primary-main text-left"
            >
              Contato
            </Link>
            <Link
              to="/ajuda"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg hover:text-primary-main text-left"
            >
              Ajuda
            </Link>
          </nav>
          {!name ? (
            <div className="mt-6 flex flex-col gap-3 border-t border-dark-three pt-6">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg bg-dark-two px-4 py-2 text-center font-semibold block"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg bg-primary-main px-4 py-2 text-center font-semibold text-white block"
              >
                
              </Link>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-3 border-t border-dark-three pt-6">
              <span className="text-center">Olá, {name || "Usuário"}!</span>
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg bg-dark-two px-4 py-2 text-center font-semibold block"
              >
                Perfil
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-center font-semibold flex items-center justify-center gap-2 hover:bg-red-700"
              >
                <LogoutIcon className="w-5 h-5" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
