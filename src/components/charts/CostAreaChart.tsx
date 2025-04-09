
import React from 'react';
import {
  AreaChart,
  Area,
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

// Configuration for the chart
const chartConfig = {
  projected: {
    label: "Projected Cost",
    color: "#6366f1",
  },
  actual: {
    label: "Actual Optimized Cost",
    color: "#3b82f6",
  },
  savings: {
    label: "Savings Realized",
    color: "#10b981",
  },
};

const CostAreaChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <AreaChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
          </linearGradient>
        </defs>
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
        <Area 
          type="monotone" 
          dataKey="projected" 
          name="Projected Cost"
          stroke="#6366f1" 
          fillOpacity={1} 
          fill="url(#colorProjected)" 
        />
        <Area 
          type="monotone" 
          dataKey="actual" 
          name="Actual Optimized Cost"
          stroke="#3b82f6" 
          fillOpacity={1} 
          fill="url(#colorActual)" 
        />
        <Area 
          type="monotone" 
          dataKey="savings" 
          name="Savings Realized"
          stroke="#10b981" 
          fillOpacity={1} 
          fill="url(#colorSavings)" 
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default CostAreaChart;
