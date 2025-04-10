
import React, { memo } from 'react';
import CostAreaChart from '@/components/charts/CostAreaChart';
import CostLineChart from '@/components/charts/CostLineChart';
import CostPieChart from '@/components/charts/CostPieChart';
import TopCostingFactorsChart from '@/components/charts/TopCostingFactorsChart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChartGridProps {
  timeToggle: string;
  setTimeToggle: (toggle: string) => void;
  topN: string;
  setTopN: (n: string) => void;
}

// Memoize individual chart components to prevent unnecessary re-renders
const MemoizedCostAreaChart = memo(CostAreaChart);
const MemoizedCostLineChart = memo(CostLineChart);
const MemoizedCostPieChart = memo(CostPieChart);
const MemoizedTopCostingFactorsChart = memo(TopCostingFactorsChart);

const ChartGrid: React.FC<ChartGridProps> = ({ 
  timeToggle, 
  setTimeToggle, 
  topN, 
  setTopN 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Projected vs Actual Optimized Cost */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium mb-4">Projected vs Actual Optimized Cost</h3>
        <MemoizedCostAreaChart />
      </div>
      
      {/* Cost Analysis Over Time */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Cost Analysis Over Time</h3>
          <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1">
            <button 
              className={`px-3 py-1 text-sm rounded-md ${timeToggle === 'daily' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setTimeToggle('daily')}
            >
              Daily
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${timeToggle === 'mom' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setTimeToggle('mom')}
            >
              MoM
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${timeToggle === 'qoq' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setTimeToggle('qoq')}
            >
              QoQ
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${timeToggle === 'yoy' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setTimeToggle('yoy')}
            >
              YoY
            </button>
          </div>
        </div>
        <MemoizedCostLineChart timeToggle={timeToggle} />
      </div>
      
      {/* Cost Distribution per Resource Buckets */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium mb-4">Cost Distribution per Resource</h3>
        <MemoizedCostPieChart />
      </div>
      
      {/* Top "n" Costing Factors */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Top Costing Factors</h3>
          <Select
            value={topN}
            onValueChange={setTopN}
          >
            <SelectTrigger className="w-[80px] h-8 bg-white border-blue-100">
              <SelectValue placeholder="Top" />
            </SelectTrigger>
            <SelectContent>
              {[1, 3, 5, 10].map((n) => (
                <SelectItem key={n} value={n.toString()}>Top {n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <MemoizedTopCostingFactorsChart topN={parseInt(topN)} />
      </div>
    </div>
  );
};

export default memo(ChartGrid);
