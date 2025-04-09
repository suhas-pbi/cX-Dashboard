
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;
  const Arrow = isPositive ? ArrowUp : ArrowDown;
  const changeClass = isPositive ? 'text-green-600' : 'text-red-500';
  
  return (
    <div className="kpi-card animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="text-cloudmetrix-accent">{icon}</div>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-2xl font-bold mb-1">{value}</p>
          <div className={`flex items-center ${changeClass} text-sm`}>
            <Arrow className="h-3 w-3 mr-1" />
            <span>{Math.abs(change)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
