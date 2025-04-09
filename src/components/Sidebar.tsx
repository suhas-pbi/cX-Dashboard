
import React from 'react';
import { Home, LineChart, Clock, Settings, BarChart, Zap, Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: LineChart, label: 'Analytics' },
    { icon: BarChart, label: 'Resources' },
    { icon: Clock, label: 'History' },
    { icon: Zap, label: 'Optimization' },
    { icon: Shield, label: 'Security' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="w-16 bg-cloudmetrix-accent text-white flex flex-col items-center py-6 rounded-xl shadow-lg">
      <div className="mb-8 bg-white p-2 rounded-lg">
        <div className="font-bold text-cloudmetrix-accent text-sm">CM</div>
      </div>
      <TooltipProvider>
        <nav className="flex flex-col items-center space-y-6">
          {menuItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <button className="p-2 rounded-md hover:bg-white/20 transition-colors duration-200">
                  <item.icon className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    </div>
  );
};

export default Sidebar;
