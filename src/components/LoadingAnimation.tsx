import { motion } from "framer-motion";
import logo from "../assets/logo-simbol.png";

export default function LoadingAnimation() {
  // Animação de carregamento simples usando Framer Motion e logotipo

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <motion.img
        src={logo}
        alt="Loading..."
        className="w-50 h-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}
