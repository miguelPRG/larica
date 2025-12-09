

function Footer() {
  return (
    <footer className="w-full border-t border-dark-three bg-dark-one px-6 py-6 text-center">
      <div className="max-w-7xl mx-auto text-sm text-dark-three">
        © {new Date().getFullYear()} Larica — Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;
