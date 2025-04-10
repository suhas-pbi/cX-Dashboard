
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
    <div className="sticky top-0 z-10 w-full">
      <div className="w-full bg-cloudmetrix-accent text-white flex justify-center py-4 shadow-lg">
        <div className="bg-white p-2 rounded-lg absolute left-6">
          <div className="font-bold text-cloudmetrix-accent text-sm">CM</div>
        </div>
        <nav className="flex items-center justify-center space-x-4 px-4 max-w-[900px] mx-auto">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link 
                key={index}
                to={item.path} 
                className={`flex items-center p-2 rounded-md transition-colors duration-200 ${
                  isActive ? 'bg-white text-cloudmetrix-accent' : 'hover:bg-white/20'
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
