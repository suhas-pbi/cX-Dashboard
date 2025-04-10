
import React, { useState } from 'react';
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import FilterBar from "@/components/cost-analysis/FilterBar";
import CostSavingsGrid from "@/components/recommender/CostSavingsGrid";
import CostAvoidanceTable from "@/components/recommender/CostAvoidanceTable";

const RecommenderEngine = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedServices, setSelectedServices] = useState<string[]>(['All']);

  const toggleService = (service: string) => {
    if (service === 'All') {
      setSelectedServices(['All']);
      return;
    }
    
    // If 'All' is currently selected, remove it when selecting a specific service
    const updatedServices = selectedServices.includes('All') 
      ? [service]
      : selectedServices.includes(service)
        ? selectedServices.filter(s => s !== service)
        : [...selectedServices, service];
    
    // If no services are selected after removal, default back to 'All'
    if (updatedServices.length === 0) {
      setSelectedServices(['All']);
    } else {
      setSelectedServices(updatedServices);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Sidebar />
      
      <div className="flex-1 pl-16 p-6 overflow-auto">
        <DashboardHeader />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Recommender Engine</h1>
          <p className="text-sm text-gray-600">Identify and act on cost optimization opportunities across your cloud environment</p>
        </div>
        
        <FilterBar 
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedServices={selectedServices}
          toggleService={toggleService}
        />
        
        {/* Section 1: Potential Cost Savings by Resources */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8 mx-4 mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Potential Cost Savings by Resources</h2>
          <CostSavingsGrid selectedServices={selectedServices} />
        </div>
        
        {/* Section 2: Cost Avoidance Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8 mx-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Cost Avoidance</h2>
          <CostAvoidanceTable selectedServices={selectedServices} />
        </div>
      </div>
    </div>
  );
};

export default RecommenderEngine;
