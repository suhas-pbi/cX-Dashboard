
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

// Mock data for the pie chart
const data = [
  { name: 'Compute', value: 40 },
  { name: 'Storage', value: 25 },
  { name: 'Networking', value: 15 },
  { name: 'Database', value: 10 },
  { name: 'AI/ML Services', value: 7 },
  { name: 'Load Balancers', value: 3 },
];

// More muted colors for the pie chart segments
const COLORS = [
  '#4A6FA5', // CloudMetrix primary
  '#6B98D4', // CloudMetrix highlight
  '#8E9196', // Neutral Gray
  '#7E69AB', // Secondary Purple
  '#6B7280', // Gray
  '#9CA3AF'  // Light Gray
];

// Chart configuration
const chartConfig = {
  compute: {
    label: "Compute",
    color: "#4A6FA5",
  },
  storage: {
    label: "Storage",
    color: "#6B98D4",
  },
  networking: {
    label: "Networking",
    color: "#8E9196",
  },
  database: {
    label: "Database",
    color: "#7E69AB",
  },
  aiml: {
    label: "AI/ML Services",
    color: "#6B7280",
  },
  loadbalancers: {
    label: "Load Balancers",
    color: "#9CA3AF",
  },
};

// Custom tooltip for the pie chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-100 shadow-md rounded">
        <p className="font-medium text-gray-700">{payload[0].name}</p>
        <p style={{ color: payload[0].payload.fill }}>
          {`${payload[0].value}%`}
        </p>
      </div>
    );
  }

  return null;
};

const CostPieChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <div className="flex h-full w-full items-center justify-center">
        <PieChart width={400} height={250}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </div>
    </ChartContainer>
  );
};

export default CostPieChart;
