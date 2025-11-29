import React from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 dark:bg-gray-800 md:p-8">
      <h1 className="mb-2 text-center text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
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
