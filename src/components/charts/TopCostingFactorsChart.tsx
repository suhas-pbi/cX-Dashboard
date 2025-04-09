
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface TopCostingFactorsChartProps {
  topN: number;
}

// Mock data for the chart
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

// Chart configuration
const chartConfig = {
  cost: {
    label: "Cost",
    color: "#3b82f6",
  },
};

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
  const data = allData.slice(0, topN);
  
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
        <defs>
          <linearGradient id="costGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <Bar dataKey="cost" name="Cost" fill="url(#costGradient)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartContainer>
  );
};

export default TopCostingFactorsChart;
