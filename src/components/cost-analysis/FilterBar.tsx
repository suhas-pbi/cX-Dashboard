
import React, { useState } from 'react';
import { Calendar, Filter, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedServices: string[];
  toggleService: (service: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  selectedYear, 
  setSelectedYear, 
  selectedServices, 
  toggleService 
}) => {
  // Service filter options
  const serviceOptions = ["All", "Compute", "Storage", "Networking", "Database", "AI/ML Services", "Load Balancers"];

  return (
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
  );
};

export default FilterBar;
