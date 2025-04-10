
import React from 'react';
import { 
  Server, 
  Database, 
  HardDrive, 
  Globe, 
  Scale, 
  Boxes 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CostSavingsGridProps {
  selectedServices: string[];
}

interface ResourceCardProps {
  icon: React.ElementType;
  iconColor: string;
  name: string;
  savings: number;
  bgColor: string;
}

const ResourceCard = ({ icon: Icon, iconColor, name, savings, bgColor }: ResourceCardProps) => {
  return (
    <Card 
      className="transition-all duration-200 hover:shadow-md hover:translate-y-[-4px] border border-gray-100"
      onClick={() => console.log(`Clicked on ${name}`)}
    >
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">{name}</h3>
            <div className="text-lg font-bold text-gray-800">
              ${savings.toLocaleString()}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${bgColor}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CostSavingsGrid: React.FC<CostSavingsGridProps> = ({ selectedServices }) => {
  // Resource data with their potential savings
  const resourceData = [
    { 
      name: "Compute", 
      savings: 8250, 
      icon: Server, 
      iconColor: "text-blue-600", 
      bgColor: "bg-blue-50" 
    },
    { 
      name: "Storage", 
      savings: 4730, 
      icon: HardDrive, 
      iconColor: "text-purple-600", 
      bgColor: "bg-purple-50"
    },
    { 
      name: "Networking", 
      savings: 3160, 
      icon: Globe, 
      iconColor: "text-green-600", 
      bgColor: "bg-green-50" 
    },
    { 
      name: "Databases", 
      savings: 6490, 
      icon: Database, 
      iconColor: "text-orange-600", 
      bgColor: "bg-orange-50" 
    },
    { 
      name: "Load Balancers", 
      savings: 1950, 
      icon: Scale, 
      iconColor: "text-indigo-600", 
      bgColor: "bg-indigo-50" 
    },
    { 
      name: "Container Services", 
      savings: 4120, 
      icon: Boxes, 
      iconColor: "text-red-600", 
      bgColor: "bg-red-50" 
    }
  ];

  // Filter resources based on selected services
  const filteredResources = selectedServices.includes('All') 
    ? resourceData 
    : resourceData.filter(resource => selectedServices.includes(resource.name));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredResources.map((resource) => (
        <ResourceCard 
          key={resource.name}
          icon={resource.icon}
          iconColor={resource.iconColor}
          name={resource.name}
          savings={resource.savings}
          bgColor={resource.bgColor}
        />
      ))}
    </div>
  );
};

export default CostSavingsGrid;
