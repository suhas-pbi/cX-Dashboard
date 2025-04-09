
import React from 'react';

interface NavigationTileProps {
  title: string;
  icon: React.ReactNode;
  backgroundColor?: string;
}

const NavigationTile: React.FC<NavigationTileProps> = ({ 
  title, 
  icon,
  backgroundColor = 'bg-white'
}) => {
  return (
    <div className={`nav-tile ${backgroundColor} animate-fade-in group`}>
      <div className="text-cloudmetrix-accent mb-2 text-2xl group-hover:text-cloudmetrix-primary transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-medium text-center text-sm md:text-base">{title}</h3>
    </div>
  );
};

export default NavigationTile;
