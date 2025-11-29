import React from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="card">
      <h1 className="mb-2 text-center text-2xl font-bold">{title}</h1>
      {subtitle && (
        <p className="mb-4 text-center text-dark-three">
          {subtitle}
        </p>
      )}
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
