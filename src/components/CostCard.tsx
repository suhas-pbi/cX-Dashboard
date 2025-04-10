
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface CostCardProps {
  title: string;
  value: string;
  change: number;
  trend: number[];
}

const CostCard = ({ title, value, change, trend }: CostCardProps) => {
  const isPositive = change >= 0;
  const Arrow = isPositive ? ArrowUp : ArrowDown;
  const changeClass = isPositive ? 'text-emerald-600' : 'text-rose-500';

  // Format SVG path for mini chart
  const createSvgPath = (data: number[]) => {
    if (data.length === 0) return '';
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 100 / (data.length - 1);
    
    return data.map((val, i) => {
      const x = i * width;
      const y = 100 - ((val - min) / range) * 100;
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="kpi-card bg-gradient-to-br from-white to-blue-50 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="text-blue-500 bg-blue-50 p-2 rounded-lg">
          {isPositive ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold mb-1">{value}</p>
        <div className={`flex items-center ${changeClass} text-sm`}>
          <Arrow className="h-3 w-3 mr-1" />
          <span>{Math.abs(change)}%</span>
          <span className="text-gray-500 ml-1 font-normal">From Last Month</span>
        </div>
      </div>
      
      {/* Mini trend chart (positioned at bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-10 opacity-30">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={createSvgPath(trend)}
            fill="none"
            stroke={change >= 0 ? "#10B981" : "#EF4444"}
            strokeWidth="2"
          />
          <path
            d={`${createSvgPath(trend)} L100,100 L0,100 Z`}
            fill={change >= 0 ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"}
          />
        </svg>
      </div>
    </div>
  );
};

export default CostCard;
