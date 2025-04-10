
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

// Icon mapping outside component to prevent recreation on each render
const getIconForTitle = (title: string) => {
  switch(title) {
    case "Total Cost To Date":
      return "dollar";
    case "Projected Cost":
      return "chart";
    case "Savings":
      return "target";
    default:
      return "activity";
  }
};

const KeyMetrics: React.FC<KeyMetricsProps> = ({ kpiData }) => {
  // Map the KPI data to include icons based on the title
  const kpiDataWithIcons = React.useMemo(() => kpiData.map(kpi => {
    return {
      ...kpi,
      icon: getIconForTitle(kpi.title),
      timePeriod: "month"
    };
  }), [kpiData]);

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

export default React.memo(KeyMetrics);
