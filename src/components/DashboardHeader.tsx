
import React from 'react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bell } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between bg-white shadow-sm px-6 py-3 rounded-xl mb-6">
      <div className="flex items-center">
        <div className="relative">
          <img 
            src="/lovable-uploads/76617818-3265-4577-82a9-e9777c2fae7f.png" 
            alt="Cloudmetrix Logo" 
            className="h-12 w-auto" // Increased size from h-8 to h-12
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
        </div>
      </div>
      
      <div className="relative flex-grow max-w-md mx-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Search resources, services..."
          className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <Bell className="h-5 w-5 text-gray-500 cursor-pointer hover:text-cloudmetrix-primary transition-colors" />
        <Avatar className="cursor-pointer border-2 border-cloudmetrix-primary">
          <AvatarImage src="" />
          <AvatarFallback className="bg-cloudmetrix-accent text-white">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default DashboardHeader;
