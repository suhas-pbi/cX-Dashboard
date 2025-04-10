
import React from 'react';
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BudgetSliderProps {
  budgetValue: number;
  setBudgetValue: (value: number) => void;
  selectedResource: string;
  setSelectedResource: (value: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
  selectedSubscription: string;
  setSelectedSubscription: (value: string) => void;
}

const BudgetSlider = ({
  budgetValue,
  setBudgetValue,
  selectedResource,
  setSelectedResource,
  selectedDepartment,
  setSelectedDepartment,
  selectedSubscription,
  setSelectedSubscription
}: BudgetSliderProps) => {
  
  const resources = ["All", "Compute", "Storage", "Networking", "Database"];
  const departments = ["All", "Engineering", "DevOps", "Finance", "Marketing", "Sales"];
  const subscriptions = ["All", "Production", "Sandbox", "QA", "Archived"];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Set Your Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Budget Amount</span>
            <span className="font-semibold text-lg bg-gray-100 px-3 py-1 rounded-md">${budgetValue.toLocaleString()}</span>
          </div>
          <Slider 
            defaultValue={[budgetValue]} 
            min={5000} 
            max={500000} 
            step={5000}
            onValueChange={(values) => setBudgetValue(values[0])} 
            className="py-4"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Resource</label>
            <Select value={selectedResource} onValueChange={setSelectedResource}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select resource" />
              </SelectTrigger>
              <SelectContent>
                {resources.map((resource) => (
                  <SelectItem key={resource} value={resource}>
                    {resource}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Department</label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Subscription</label>
            <Select value={selectedSubscription} onValueChange={setSelectedSubscription}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select subscription" />
              </SelectTrigger>
              <SelectContent>
                {subscriptions.map((subscription) => (
                  <SelectItem key={subscription} value={subscription}>
                    {subscription}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetSlider;
