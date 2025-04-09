
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
    <div className="nav-tile bg-gradient-to-br from-white to-blue-50 animate-fade-in group">
      <div className="text-blue-500 bg-blue-50 p-4 rounded-full mb-3 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-medium text-center text-sm md:text-base">{title}</h3>
    </div>
  );
};

export default NavigationTile;
