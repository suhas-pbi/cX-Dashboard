
import React, { memo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface TopCostingFactorsChartProps {
  topN: number;
}

// Mock data for the chart - moved outside component to prevent recreating on each render
const allData = [
  { name: 'AWS EC2', cost: 120000 },
  { name: 'Azure VMs', cost: 95000 },
  { name: 'S3 Storage', cost: 85000 },
  { name: 'GCP Compute', cost: 75000 },
  { name: 'AWS RDS', cost: 65000 },
  { name: 'Azure SQL', cost: 55000 },
  { name: 'AWS Lambda', cost: 45000 },
  { name: 'GCP Storage', cost: 35000 },
  { name: 'CloudFront', cost: 25000 },
  { name: 'Azure Functions', cost: 15000 },
];

// Chart configuration with the requested color - moved outside component
const chartConfig = {
  cost: {
    label: "Cost",
    color: "#6b98d4",
  },
};

// Format function moved outside component to prevent recreation
const formatYAxisTick = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

const TopCostingFactorsChart = ({ topN }: TopCostingFactorsChartProps) => {
  // Get the top N items based on cost
  const data = React.useMemo(() => allData.slice(0, topN), [topN]);
  
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.1} />
        <XAxis type="number" tickFormatter={formatYAxisTick} />
        <YAxis type="category" dataKey="name" width={80} />
        <Tooltip
          formatter={(value) => [`${formatYAxisTick(value as number)}`, 'Cost']}
        />
        <Legend />
        <Bar dataKey="cost" name="Cost" fill="#6b98d4" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartContainer>
  );
};

export default memo(TopCostingFactorsChart);
