
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
      <div className="text-cloudmetrix-primary">
        {icon}
      </div>
      <h3 className="text-cloudmetrix-baseText font-semibold text-center">
        {title}
      </h3>
    </>
  );

  if (path === "#") {
    return (
      <div className="nav-tile">
        {content}
      </div>
    );
  }

  return (
    <Link to={path} className="nav-tile">
      {content}
    </Link>
  );
};

export default NavigationTile;
