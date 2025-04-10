
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ChartBar, 
  PieChart, 
  SearchCheck, 
  LayoutDashboard, 
  Settings
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = React.useState(true);
  
  // Memoize menu items to prevent recreation on each render
  const menuItems = useMemo(() => [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ChartBar, label: 'Unified Cost Analysis', path: '/cost-analysis' },
    { icon: PieChart, label: 'Budgeting & Observability', path: '/budgeting' },
    { icon: SearchCheck, label: 'Recommender Engine', path: '/recommender' },
    { icon: LayoutDashboard, label: 'Executive Dashboard', path: '/executive' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ], []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      className={`fixed left-0 top-0 h-screen z-10 bg-cloudmetrix-accent shadow-lg transition-all duration-300 ${
        expanded ? 'w-72' : 'w-16'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Toggle button */}
        <button 
          onClick={toggleExpand}
          className="absolute -right-3 top-6 bg-white rounded-full p-1 shadow-md text-cloudmetrix-accent hover:bg-gray-100 transition-all z-20"
        >
          {expanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          )}
        </button>
        
        {/* Logo area */}
        <div className="p-4 mb-6 mt-4">
          <h2 className={`text-white font-semibold text-lg transition-opacity duration-300 ${
            expanded ? 'opacity-100' : 'opacity-0'
          }`}>CloudMetrix</h2>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col space-y-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return expanded ? (
              <Link 
                key={index}
                to={item.path} 
                className={`flex items-center px-4 py-3 mx-2 rounded-md transition-colors duration-200 whitespace-nowrap ${
                  isActive ? 'bg-white text-cloudmetrix-accent' : 'hover:bg-white/20 text-white'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="transition-opacity duration-300 whitespace-nowrap text-sm">{item.label}</span>
              </Link>
            ) : (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link 
                    to={item.path} 
                    className={`flex items-center justify-center p-3 mx-auto rounded-md transition-colors duration-200 ${
                      isActive ? 'bg-white text-cloudmetrix-accent' : 'hover:bg-white/20 text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
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

export default React.memo(Sidebar);
