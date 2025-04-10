
import React from 'react';
import CostCard from '@/components/CostCard';

interface KeyMetricsProps {
  kpiData: {
    title: string;
    value: string;
    change: number;
    trend: number[];
  }[];
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ kpiData }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-cloudmetrix-baseText">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {kpiData.map((kpi, index) => (
          <CostCard 
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
          />
        ))}
      </div>
    </>
  );
};

export default KeyMetrics;
