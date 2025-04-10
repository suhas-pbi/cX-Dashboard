
import React from 'react';
import { ArrowUp, ArrowDown, DollarSign, LineChart, Target, Activity } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode | string;
  timePeriod: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon, timePeriod }) => {
  const isPositive = change >= 0;
  const Arrow = isPositive ? ArrowUp : ArrowDown;
  const changeClass = isPositive ? 'text-emerald-600' : 'text-rose-500';
  
  const getTimeText = () => {
    switch(timePeriod) {
      case 'week':
        return 'From Last Week';
      case 'month':
        return 'From Last Month';
      case 'quarter':
        return 'From Last Quarter';
      case 'year':
        return 'From Last Year';
      default:
        return 'From Last Month';
    }
  };

  // Choose icon based on string name or use the provided ReactNode
  const renderIcon = () => {
    if (typeof icon === 'string') {
      switch(icon) {
        case 'dollar':
          return <DollarSign className="h-5 w-5" />;
        case 'chart':
          return <LineChart className="h-5 w-5" />;
        case 'target':
          return <Target className="h-5 w-5" />;
        default:
          return <Activity className="h-5 w-5" />;
      }
    }
    return icon;
  };
  
  return (
    <div className="kpi-card bg-gradient-to-br from-white to-blue-50 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="text-blue-500 bg-blue-50 p-2 rounded-lg">{renderIcon()}</div>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-2xl font-bold mb-1">{value}</p>
          <div className={`flex items-center ${changeClass} text-sm`}>
            <Arrow className="h-3 w-3 mr-1" />
            <span>{Math.abs(change)}%</span>
            <span className="text-gray-500 ml-1 font-normal">{getTimeText()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
