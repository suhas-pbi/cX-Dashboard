
import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface CostCardProps {
  title: string;
  value: string;
  change: number;
  trend: number[];
}

const CostCard = ({ title, value, change, trend }: CostCardProps) => {
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
    <div className="kpi-card flex flex-col justify-between h-32 relative overflow-hidden">
      <div>
        <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">{value}</p>
          <div className={`flex items-center text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? (
              <ArrowUpIcon className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 mr-1" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        </div>
      </div>
      
      {/* Mini trend chart */}
      <div className="absolute bottom-0 left-0 right-0 h-10 opacity-30">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={createSvgPath(trend)}
            fill="none"
            stroke={change >= 0 ? "#10B981" : "#EF4444"}
            strokeWidth="2"
          />
          {/* Area under the path */}
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
