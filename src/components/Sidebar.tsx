
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
    <div className="fixed left-0 top-0 h-full z-10 bg-cloudmetrix-accent shadow-lg flex items-center">
      <div className="px-4 py-6">
        <nav className="flex flex-col space-y-8">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link 
                    to={item.path} 
                    className={`flex items-center p-2 rounded-md transition-colors duration-200 ${
                      isActive ? 'bg-white text-cloudmetrix-accent' : 'hover:bg-white/20 text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="text-sm whitespace-nowrap">{item.label}</span>
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
