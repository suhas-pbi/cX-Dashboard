
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
    <div className={`nav-tile ${backgroundColor} animate-fade-in`}>
      <div className="text-cloudmetrix-primary mb-2 text-xl">
        {icon}
      </div>
      <h3 className="font-medium text-center">{title}</h3>
    </div>
  );
};

export default NavigationTile;
