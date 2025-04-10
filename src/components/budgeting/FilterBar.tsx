
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface FilterBarProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedServices: string[];
  toggleService: (service: string) => void;
}

const FilterBar = ({
  selectedYear,
  setSelectedYear,
  selectedServices,
  toggleService
}: FilterBarProps) => {
  const years = ["2025", "2024", "2023"];
  
  const serviceOptions = [
    "All", 
    "Compute", 
    "Storage", 
    "Networking", 
    "Database", 
    "AI/ML Services", 
    "Load Balancers"
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Year Selector */}
        <div className="w-full md:w-48">
          <label className="text-sm font-medium text-gray-600 block mb-1">Year</label>
          <Select 
            value={selectedYear} 
            onValueChange={setSelectedYear}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Services Filter */}
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-600 block mb-1">
            Services
          </label>
          <div className="flex flex-wrap gap-2">
            {serviceOptions.map((service) => (
              <Badge
                key={service}
                variant={selectedServices.includes(service) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedServices.includes(service) 
                    ? "bg-cloudmetrix-primary hover:bg-cloudmetrix-accent" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => toggleService(service)}
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
