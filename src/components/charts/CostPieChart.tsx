
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
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

// Colors for the pie chart segments
const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#e879f9'];

// Chart configuration
const chartConfig = {
  compute: {
    label: "Compute",
    color: "#3b82f6",
  },
  storage: {
    label: "Storage",
    color: "#6366f1",
  },
  networking: {
    label: "Networking",
    color: "#8b5cf6",
  },
  database: {
    label: "Database",
    color: "#a855f7",
  },
  aiml: {
    label: "AI/ML Services",
    color: "#d946ef",
  },
  loadbalancers: {
    label: "Load Balancers",
    color: "#e879f9",
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
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </div>
    </ChartContainer>
  );
};

export default CostPieChart;
