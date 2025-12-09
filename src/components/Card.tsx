import type { ReactNode } from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

function Card({ title, subtitle, children }: CardProps) {
  return (
    <div className="card">
      <h1 className="mb-2 text-center text-2xl font-bold">{title}</h1>
      {subtitle && <p className="mb-4 text-center text-dark-three">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default Card;
