
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import KPICard from '@/components/KPICard';
import NavigationTile from '@/components/NavigationTile';
import GenAICopilot from '@/components/GenAICopilot';
import { 
  DollarSign, 
  LineChart, 
  PieChart, 
  BarChart3, 
  Target, 
  TrendingUp,
  Activity,
  BarChartHorizontal,
  CalendarDays,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [timePeriod, setTimePeriod] = useState("month");

  const kpiData = [
    { 
      title: 'Total Cost', 
      value: '$325K', 
      change: 3.7, 
      icon: <DollarSign className="h-5 w-5" /> 
    },
    { 
      title: 'Savings Opportunity', 
      value: '$25K', 
      change: 1.7, 
      icon: <Target className="h-5 w-5" /> 
    },
    { 
      title: '% Budget Consumed', 
      value: '84%', 
      change: 4.6, 
      icon: <PieChart className="h-5 w-5" /> 
    },
    { 
      title: 'Variance %', 
      value: '12%', 
      change: -1.9, 
      icon: <TrendingUp className="h-5 w-5" /> 
    },
  ];

  const navigationTiles = [
    { 
      title: 'Unified Cost Analysis', 
      icon: <BarChart3 className="h-8 w-8" />,
    },
    { 
      title: 'Budgeting & Observability', 
      icon: <Activity className="h-8 w-8" />,
    },
    { 
      title: 'Recommender Engine', 
      icon: <LineChart className="h-8 w-8" />,
    },
    { 
      title: 'Executive Dashboard', 
      icon: <BarChartHorizontal className="h-8 w-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-cloudmetrix-backgroundTint">
      <div className="container mx-auto p-6">
        <DashboardHeader />
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Overview</h2>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
              <Select
                value={timePeriod}
                onValueChange={setTimePeriod}
              >
                <SelectTrigger className="w-[160px] h-9 bg-white">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                icon={kpi.icon}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {navigationTiles.map((tile, index) => (
              <NavigationTile
                key={index}
                title={tile.title}
                icon={tile.icon}
              />
            ))}
          </div>
        </div>
        
        <GenAICopilot />
      </div>
    </div>
  );
};

export default Index;
