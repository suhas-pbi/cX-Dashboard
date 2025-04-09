
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
import { ChartContainer } from '@/components/ui/chart';

interface CostLineChartProps {
  timeToggle: string;
}

// Mock data for the chart
const generateDailyData = () => {
  const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
  
  return days.map((day) => {
    const value = 10000 + Math.random() * 5000;
    return {
      name: day,
      cost: Math.round(value),
    };
  });
};

const generateMoMData = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return months.map((month) => {
    const thisYear = 100000 + Math.random() * 50000;
    const lastYear = thisYear * (0.8 + Math.random() * 0.4);
    
    return {
      name: month,
      thisYear: Math.round(thisYear),
      lastYear: Math.round(lastYear),
    };
  });
};

const generateYoYData = () => {
  const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
  
  return years.map((year) => {
    const base = 500000 + Math.random() * 500000;
    
    return {
      name: year,
      cost: Math.round(base),
    };
  });
};

// Chart configuration
const chartConfig = {
  cost: {
    label: "Cost",
    color: "#3b82f6",
  },
  thisYear: {
    label: "This Year",
    color: "#3b82f6",
  },
  lastYear: {
    label: "Last Year",
    color: "#94a3b8",
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

const CostLineChart = ({ timeToggle }: CostLineChartProps) => {
  let data;
  let lineComponents;
  
  switch(timeToggle) {
    case 'mom':
      data = generateMoMData();
      lineComponents = (
        <>
          <Line
            type="monotone"
            dataKey="thisYear"
            name="This Year"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="lastYear"
            name="Last Year"
            stroke="#94a3b8"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            strokeDasharray="5 5"
          />
        </>
      );
      break;
    case 'yoy':
      data = generateYoYData();
      lineComponents = (
        <Line
          type="monotone"
          dataKey="cost"
          name="Cost"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      );
      break;
    case 'daily':
    default:
      data = generateDailyData();
      lineComponents = (
        <Line
          type="monotone"
          dataKey="cost"
          name="Cost"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 4 }}
        />
      );
  }

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
          formatter={(value) => [`${formatYAxisTick(value as number)}`, undefined]}
          labelFormatter={(label) => {
            if (timeToggle === 'daily') {
              return `Day ${label}`;
            }
            return label;
          }}
        />
        <Legend />
        {lineComponents}
      </LineChart>
    </ChartContainer>
  );
};

export default CostLineChart;
