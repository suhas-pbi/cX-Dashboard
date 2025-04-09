
import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationTileProps {
  title: string;
  icon: React.ReactNode;
  path?: string;
}

const NavigationTile = ({ title, icon, path = "#" }: NavigationTileProps) => {
  const content = (
    <>
      <div className="text-cloudmetrix-primary mb-3">
        {icon}
      </div>
      <h3 className="text-cloudmetrix-baseText font-semibold text-center">
        {title}
      </h3>
    </>
  );

  if (path === "#") {
    return (
      <div className="nav-tile bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center hover:shadow-md transition-shadow duration-200 h-36">
        {content}
      </div>
    );
  }

  return (
    <Link to={path} className="nav-tile bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center hover:shadow-md transition-shadow duration-200 h-36">
      {content}
    </Link>
  );
};

export default NavigationTile;
