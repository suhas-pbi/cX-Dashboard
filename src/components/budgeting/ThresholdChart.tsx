
import React, { useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ThresholdChartProps {
  budgetValue: number;
}

// Format function for Y-axis labels
const formatYAxis = (value: number) => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return `$${value}`;
};

const ThresholdChart = ({ budgetValue }: ThresholdChartProps) => {
  const data = useMemo(() => [
    { name: 'Apr 2024', actual: 5800, forecast: 0 },
    { name: 'May 2024', actual: 6200, forecast: 0 },
    { name: 'Jun 2024', actual: 6700, forecast: 0 },
    { name: 'Jul 2024', actual: 7100, forecast: 0 },
    { name: 'Aug 2024', actual: 7900, forecast: 0 },
    { name: 'Sep 2024', actual: 8200, forecast: 0 },
    { name: 'Oct 2024', actual: 7800, forecast: 0 },
    { name: 'Nov 2024', actual: 8400, forecast: 0 },
    { name: 'Dec 2024', actual: 9100, forecast: 0 },
    { name: 'Jan 2025', actual: 9600, forecast: 0 },
    { name: 'Feb 2025', actual: 0, forecast: 10200 },
    { name: 'Mar 2025', actual: 0, forecast: 11100 },
    { name: 'Apr 2025', actual: 0, forecast: 12000 },
  ], []);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Average Threshold</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <ReferenceLine
                y={budgetValue / 12}
                stroke="#ff4d4f"
                strokeDasharray="3 3"
                label={{
                  position: 'right',
                  value: `$${(budgetValue / 12 / 1000).toFixed(1)}k`,
                  fill: '#ff4d4f',
                  fontSize: 12,
                }}
              />
              <Bar dataKey="actual" name="Total Cost" stackId="a" fill="#4A6FA5" />
              <Bar dataKey="forecast" name="Forecasted Additional Cost" stackId="a" fill="#6B98D4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThresholdChart;
