
import React, { useState } from 'react';
import { BarChart3, Calendar, Filter, ChevronDown } from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GenAICopilot from '@/components/GenAICopilot';
import Sidebar from '@/components/Sidebar';
import CostCard from '@/components/CostCard';
import CostAreaChart from '@/components/charts/CostAreaChart';
import CostLineChart from '@/components/charts/CostLineChart';
import CostPieChart from '@/components/charts/CostPieChart';
import TopCostingFactorsChart from '@/components/charts/TopCostingFactorsChart';

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

  // Service filter options
  const serviceOptions = ["All", "Compute", "Storage", "Networking", "Database", "AI/ML Services", "Load Balancers"];

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
    } else if (newSelected.length === serviceOptions.length - 1) {
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
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-start gap-8">
              {/* Year Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  Year
                </label>
                <Select
                  value={selectedYear}
                  onValueChange={setSelectedYear}
                >
                  <SelectTrigger className="w-[100px] h-9 bg-white border-blue-100">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Services Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                  <Filter className="h-4 w-4 text-blue-500" />
                  Services
                </label>
                <div className="relative">
                  <button 
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-blue-100 rounded-md text-sm h-9 w-[180px]"
                    onClick={() => document.getElementById('serviceDropdown')?.classList.toggle('hidden')}
                  >
                    Services <ChevronDown className="h-4 w-4 ml-auto" />
                  </button>
                  <div id="serviceDropdown" className="hidden absolute z-10 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="p-2 max-h-60 overflow-auto">
                      {serviceOptions.map((service) => (
                        <div key={service} className="flex items-center p-2 hover:bg-blue-50 rounded">
                          <input
                            type="checkbox"
                            id={`service-${service}`}
                            checked={selectedServices.includes(service)}
                            onChange={() => toggleService(service)}
                            className="mr-2"
                          />
                          <label htmlFor={`service-${service}`}>{service}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* KPI Cards */}
          <h2 className="text-xl font-semibold mb-4 text-cloudmetrix-baseText">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {kpiData.map((kpi, index) => (
              <CostCard 
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                trend={kpi.trend}
              />
            ))}
          </div>
          
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Projected vs Actual Optimized Cost */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-4">Projected vs Actual Optimized Cost</h3>
              <CostAreaChart />
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
              <CostLineChart timeToggle={timeToggle} />
            </div>
            
            {/* Cost Distribution per Resource Buckets */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-4">Cost Distribution per Resource</h3>
              <CostPieChart />
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
              <TopCostingFactorsChart topN={parseInt(topN)} />
            </div>
          </div>
          
          <GenAICopilot />
        </div>
      </div>
    </div>
  );
};

export default UnifiedCostAnalysis;
