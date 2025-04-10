
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LineChart, 
  Clock, 
  Settings, 
  BarChart, 
  Zap, 
  Shield, 
  ChartBar, 
  PieChart, 
  LayoutDashboard, 
  SearchCheck 
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ChartBar, label: 'Unified Cost Analysis', path: '/cost-analysis' },
    { icon: PieChart, label: 'Budgeting & Observability', path: '/budgeting' },
    { icon: SearchCheck, label: 'Recommender Engine', path: '/recommender' },
    { icon: LayoutDashboard, label: 'Executive Dashboard', path: '/executive' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10 h-auto bg-cloudmetrix-accent rounded-r-lg shadow-lg">
      <div className="px-2 py-6">
        <div className="bg-white p-2 rounded-lg mb-6 mx-auto w-10 h-10 flex items-center justify-center">
          <div className="font-bold text-cloudmetrix-accent text-sm">CM</div>
        </div>
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link 
                    to={item.path} 
                    className={`flex flex-col items-center p-2 rounded-md transition-colors duration-200 ${
                      isActive ? 'bg-white text-cloudmetrix-accent' : 'hover:bg-white/20 text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-xs mt-1 text-center whitespace-nowrap">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
