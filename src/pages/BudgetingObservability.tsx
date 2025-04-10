
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import GenAICopilot from '@/components/GenAICopilot';
import Sidebar from '@/components/Sidebar';
import FilterBar from '@/components/budgeting/FilterBar';
import BudgetSlider from '@/components/budgeting/BudgetSlider';
import ThresholdChart from '@/components/budgeting/ThresholdChart';
import AlertsConfiguration from '@/components/budgeting/AlertsConfiguration';
import AnomaliesTable from '@/components/budgeting/AnomaliesTable';

const BudgetingObservability = () => {
  // State for slicers
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedServices, setSelectedServices] = useState<string[]>(["All"]);
  
  // State for budget settings
  const [budgetValue, setBudgetValue] = useState(100000);
  const [selectedResource, setSelectedResource] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedSubscription, setSelectedSubscription] = useState("All");
  
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
      
      <div className="flex-1 ml-16">
        <div className="container mx-auto p-6">
          <DashboardHeader />
          
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-cloudmetrix-accent">Budgeting & Observability</h1>
          </div>
          
          {/* Slicer Section */}
          <FilterBar 
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedServices={selectedServices}
            toggleService={toggleService}
          />
          
          {/* Section 1: Budget Slider */}
          <BudgetSlider 
            budgetValue={budgetValue}
            setBudgetValue={setBudgetValue}
            selectedResource={selectedResource}
            setSelectedResource={setSelectedResource}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedSubscription={selectedSubscription}
            setSelectedSubscription={setSelectedSubscription}
          />
          
          {/* Section 2 & 3: Threshold Chart and Alerts Configuration side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ThresholdChart budgetValue={budgetValue} />
            <AlertsConfiguration budgetValue={budgetValue} />
          </div>
          
          {/* Section 4: Anomalies Table */}
          <AnomaliesTable />
          
          <GenAICopilot />
        </div>
      </div>
    </div>
  );
};

export default BudgetingObservability;
