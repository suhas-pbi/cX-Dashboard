import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for the chart
const generateData = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return months.map((month, index) => {
    const base = 100000 + Math.random() * 50000;
    const projected = base + Math.random() * 30000;
    const actual = base - (Math.random() * 20000);
    const savings = projected - actual;
    
    return {
      name: month,
      projected: Math.round(projected),
      actual: Math.round(actual),
      savings: Math.round(savings),
    };
  });
};

const data = generateData();

const formatYAxisTick = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

// Configuration for the chart using the specified color palette
const chartConfig = {
  projected: {
    label: "Projected Cost",
    color: "#8e9196", // Updated color
  },
  actual: {
    label: "Actual Optimized Cost",
    color: "#4a6fa5", // Updated color
  },
  savings: {
    label: "Savings Realized",
    color: "#7e69ab", // Updated color
  },
};

const CostAreaChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatYAxisTick} />
        <Tooltip 
          content={({ payload, label }) => {
            if (!payload || !payload.length) return null;
            return (
              <div className="bg-white p-2 border border-gray-100 shadow-md rounded">
                <p className="font-medium text-gray-700">{label}</p>
                {payload.map((entry, index) => (
                  <p key={index} style={{ color: entry.color }}>
                    {entry.name}: {formatYAxisTick(entry.value as number)}
                  </p>
                ))}
              </div>
            );
          }}
        />
        <Legend />
        <Line 
          type="monotoneX" 
          dataKey="projected" 
          name="Projected Cost"
          stroke="#8e9196" // Updated color
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 4 }}
        />
        <Line 
          type="monotoneX" 
          dataKey="actual" 
          name="Actual Optimized Cost"
          stroke="#4a6fa5" // Updated color
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 4 }}
        />
        <Line 
          type="monotoneX" 
          dataKey="savings" 
          name="Savings Realized"
          stroke="#7e69ab" // Updated color
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default CostAreaChart;
