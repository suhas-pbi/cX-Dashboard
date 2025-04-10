
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import GenAICopilot from '@/components/GenAICopilot';
import Sidebar from '@/components/Sidebar';
import FilterBar from '@/components/cost-analysis/FilterBar';
import KeyMetrics from '@/components/cost-analysis/KeyMetrics';
import ChartGrid from '@/components/cost-analysis/ChartGrid';

const UnifiedCostAnalysis = () => {
  // State for slicers
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedServices, setSelectedServices] = useState<string[]>(["All"]);
  const [timeToggle, setTimeToggle] = useState("daily");
  const [topN, setTopN] = useState("5");
  
  // Mock data for KPI cards
  const kpiData = [
    {
      title: "Total Cost To Date",
      value: "$582,400",
      change: 4.3,
      trend: [3, 7, 5, 9, 6, 8, 7, 9, 8]
    },
    {
      title: "Projected Cost",
      value: "$1.2M",
      change: -2.8,
      trend: [8, 6, 7, 5, 6, 5, 4, 3, 2]
    },
    {
      title: "Savings",
      value: "$243,800",
      change: 12.5,
      trend: [2, 4, 6, 8, 7, 9, 8, 10, 11]
    }
  ];

  // Handle service filter change
  const toggleService = (service: string) => {
    if (service === "All") {
      setSelectedServices(["All"]);
      return;
    }
    
    let newSelected: string[];
    
    if (selectedServices.includes(service)) {
      newSelected = selectedServices.filter(s => s !== service);
    } else {
      newSelected = selectedServices.includes("All") 
        ? [service]
        : [...selectedServices, service];
    }
    
    if (newSelected.length === 0) {
      newSelected = ["All"];
    } else if (newSelected.length === 6) { // 6 is serviceOptions.length - 1
      newSelected = ["All"];
    }
    
    setSelectedServices(newSelected);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <div className="container mx-auto p-6">
          <DashboardHeader />
          
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-cloudmetrix-accent">Unified Cost Analysis</h1>
          </div>
          
          {/* Slicer Section */}
          <FilterBar 
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedServices={selectedServices}
            toggleService={toggleService}
          />
          
          {/* KPI Cards */}
          <KeyMetrics kpiData={kpiData} />
          
          {/* Charts Grid */}
          <ChartGrid 
            timeToggle={timeToggle}
            setTimeToggle={setTimeToggle}
            topN={topN}
            setTopN={setTopN}
          />
          
          <GenAICopilot />
        </div>
      </div>
    </div>
  );
};

export default UnifiedCostAnalysis;
