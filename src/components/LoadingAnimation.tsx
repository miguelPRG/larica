import { motion } from "framer-motion";
import "../assets/logo-simbol.png";

export default function LoadingAnamation() {
  // Animação de carregamento simples usando Framer Motion e logotipo

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <motion.img
        src="../assets/logo-simbol.png"
        alt="Loading..."
        className="w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
}
