
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
    <div className="w-56 bg-cloudmetrix-accent text-white flex flex-col items-center py-6 rounded-tr-xl rounded-br-xl shadow-lg h-full">
      <div className="mb-8 bg-white p-2 rounded-lg">
        <div className="font-bold text-cloudmetrix-accent text-sm">CM</div>
      </div>
      <nav className="flex flex-col items-center space-y-5 w-full px-4">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={index}
              to={item.path} 
              className={`flex items-center w-full p-2 rounded-md transition-colors duration-200 ${
                isActive ? 'bg-white text-cloudmetrix-accent' : 'hover:bg-white/20'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
