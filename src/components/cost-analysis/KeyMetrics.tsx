
import React from 'react';
import KPICard from '@/components/KPICard';

interface KeyMetricsProps {
  kpiData: {
    title: string;
    value: string;
    change: number;
    trend: number[];
  }[];
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ kpiData }) => {
  // Map the KPI data to include icons based on the title
  const kpiDataWithIcons = kpiData.map(kpi => {
    let icon;
    let timePeriod = "month";
    
    // Assign appropriate icon based on title
    switch(kpi.title) {
      case "Total Cost To Date":
        icon = "dollar";
        break;
      case "Projected Cost":
        icon = "chart";
        break;
      case "Savings":
        icon = "target";
        break;
      default:
        icon = "activity";
    }
    
    return {
      ...kpi,
      icon,
      timePeriod
    };
  });

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-cloudmetrix-baseText">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {kpiDataWithIcons.map((kpi, index) => (
          <KPICard 
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            icon={kpi.icon}
            timePeriod={kpi.timePeriod}
          />
        ))}
      </div>
    </>
  );
};

export default KeyMetrics;
