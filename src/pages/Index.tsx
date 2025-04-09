import React, { useState, useMemo } from 'react';
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

  // Generate random KPI data based on time period
  const kpiData = useMemo(() => {
    // Generate some random variations based on timeperiod
    const getRandomValue = (base: number, variance: number) => {
      return (base + (Math.random() * variance * 2 - variance)).toFixed(1);
    };
    
    const getRandomDollar = (min: number, max: number) => {
      const value = Math.floor(Math.random() * (max - min + 1) + min);
      return `$${value}K`;
    };

    // Different base values for different time periods
    let costValue, savingsValue, budgetValue, varianceChange;
    
    switch(timePeriod) {
      case 'week':
        costValue = getRandomDollar(75, 110);
        savingsValue = getRandomDollar(5, 15);
        budgetValue = `${Math.floor(Math.random() * 25 + 70)}%`;
        varianceChange = -Number(getRandomValue(1.2, 0.8));
        break;
      case 'month':
        costValue = getRandomDollar(280, 350);
        savingsValue = getRandomDollar(20, 30);
        budgetValue = `${Math.floor(Math.random() * 15 + 80)}%`;
        varianceChange = -Number(getRandomValue(2.0, 1.0));
        break;
      case 'quarter':
        costValue = getRandomDollar(800, 950);
        savingsValue = getRandomDollar(60, 90);
        budgetValue = `${Math.floor(Math.random() * 10 + 85)}%`;
        varianceChange = Number(getRandomValue(2.5, 1.5));
        break;
      case 'year':
        costValue = getRandomDollar(3000, 3800);
        savingsValue = getRandomDollar(200, 350);
        budgetValue = `${Math.floor(Math.random() * 8 + 90)}%`;
        varianceChange = Number(getRandomValue(4.0, 2.0));
        break;
      default:
        costValue = getRandomDollar(280, 350);
        savingsValue = getRandomDollar(20, 30);
        budgetValue = `${Math.floor(Math.random() * 15 + 80)}%`;
        varianceChange = -Number(getRandomValue(2.0, 1.0));
    }

    return [
      { 
        title: 'Total Cost', 
        value: costValue, 
        change: Number(getRandomValue(3.5, 1.2)), 
        icon: <DollarSign className="h-5 w-5" /> 
      },
      { 
        title: 'Savings Opportunity', 
        value: savingsValue, 
        change: Number(getRandomValue(1.5, 0.8)), 
        icon: <Target className="h-5 w-5" /> 
      },
      { 
        title: '% Budget Consumed', 
        value: budgetValue, 
        change: Number(getRandomValue(4.2, 1.8)), 
        icon: <PieChart className="h-5 w-5" /> 
      },
      { 
        title: 'Variance %', 
        value: `${Math.abs(Number(varianceChange.toFixed(1)))}%`, 
        change: varianceChange, 
        icon: <TrendingUp className="h-5 w-5" /> 
      },
    ];
  }, [timePeriod]);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto p-6">
        <DashboardHeader />
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Overview</h2>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-blue-500" />
              <Select
                value={timePeriod}
                onValueChange={setTimePeriod}
              >
                <SelectTrigger className="w-[160px] h-9 bg-white border-blue-100">
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
                timePeriod={timePeriod}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Our Tools</h2>
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
