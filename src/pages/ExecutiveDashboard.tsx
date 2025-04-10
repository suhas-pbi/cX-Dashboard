
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import Sidebar from '@/components/Sidebar';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ExecutiveDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-cloudmetrix-backgroundTint">
      <Sidebar />
      <div className="flex-1 pl-16 md:pl-72 transition-all duration-300">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <DashboardHeader />
          
          {/* Intro Banner */}
          <Alert 
            className="mb-6 bg-[#FFFCEB] border-amber-200 text-amber-800"
          >
            <Clock className="h-5 w-5" />
            <AlertTitle className="font-medium">
              Looks empty? That's because the team said, "we'll send the dump EOD."
            </AlertTitle>
            <AlertDescription className="text-sm text-amber-700 mt-1">
              Executive-level insights will appear here once the latest data is ingested.
            </AlertDescription>
          </Alert>
          
          {/* Placeholder content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6 h-64 flex items-center justify-center text-gray-400">
                <p className="text-center">Strategic summary data will appear here</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 h-64 flex items-center justify-center text-gray-400">
                <p className="text-center">Business impact metrics will appear here</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 h-48 flex items-center justify-center text-gray-400">
                <p className="text-center">Leadership insights</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 h-48 flex items-center justify-center text-gray-400">
                <p className="text-center">Cost optimization recommendations</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 h-48 flex items-center justify-center text-gray-400">
                <p className="text-center">Resource allocation metrics</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
