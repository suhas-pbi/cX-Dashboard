
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Info } from 'lucide-react';

interface Anomaly {
  id: string;
  date: string;
  projectName: string;
  actualCost: number;
  expectedCost: number;
  costImpact: number;
  deviationPercentage: number;
  feedback?: string;
}

const AnomaliesTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const mockAnomalies: Anomaly[] = [
    {
      id: '1', 
      date: 'Apr 1, 2025', 
      projectName: 'Backend API Services', 
      actualCost: 3245.67, 
      expectedCost: 525.20, 
      costImpact: 2720.47, 
      deviationPercentage: 518.00
    },
    {
      id: '2', 
      date: 'Mar 28, 2025', 
      projectName: 'Data Lake Storage', 
      actualCost: 1876.45, 
      expectedCost: 925.80, 
      costImpact: 950.65, 
      deviationPercentage: 102.68
    },
    {
      id: '3', 
      date: 'Mar 25, 2025', 
      projectName: 'ML Training Cluster', 
      actualCost: 5433.21, 
      expectedCost: 2250.50, 
      costImpact: 3182.71, 
      deviationPercentage: 141.42,
      feedback: 'Expected due to large dataset'
    },
    {
      id: '4', 
      date: 'Mar 22, 2025', 
      projectName: 'Frontend CDN', 
      actualCost: 1283.90, 
      expectedCost: 1150.25, 
      costImpact: 133.65, 
      deviationPercentage: 11.62
    },
    {
      id: '5', 
      date: 'Mar 20, 2025', 
      projectName: 'DevOps Pipeline', 
      actualCost: 876.34, 
      expectedCost: 540.75, 
      costImpact: 335.59, 
      deviationPercentage: 62.06
    },
    {
      id: '6', 
      date: 'Mar 18, 2025', 
      projectName: 'Microservices Cluster', 
      actualCost: 4521.78, 
      expectedCost: 3250.90, 
      costImpact: 1270.88, 
      deviationPercentage: 39.09,
      feedback: 'Investigating cause'
    },
    {
      id: '7', 
      date: 'Mar 15, 2025', 
      projectName: 'Database Replication', 
      actualCost: 2145.65, 
      expectedCost: 1850.30, 
      costImpact: 295.35, 
      deviationPercentage: 15.96
    }
  ];

  const filteredAnomalies = mockAnomalies.filter(anomaly => 
    anomaly.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    anomaly.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAnomalies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAnomalies = filteredAnomalies.slice(startIndex, startIndex + itemsPerPage);

  const downloadCsv = () => {
    // In a real app, this would generate and download a CSV file
    console.log("Downloading CSV of anomalies...");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Cost Anomalies</CardTitle>
          <Button variant="outline" size="sm" onClick={downloadCsv}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search anomalies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>When the anomaly was detected</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Actual Cost</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Actual cost incurred</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Expected Cost</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The baseline cost based on historical trends</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Cost Impact</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Difference between actual and expected cost</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Deviation %</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Percentage deviation from expected cost</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableHead>
              <TableHead>Feedback</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAnomalies.map((anomaly) => (
              <TableRow key={anomaly.id}>
                <TableCell className="font-medium">{anomaly.date}</TableCell>
                <TableCell>{anomaly.projectName}</TableCell>
                <TableCell>${anomaly.actualCost.toFixed(2)}</TableCell>
                <TableCell>${anomaly.expectedCost.toFixed(2)}</TableCell>
                <TableCell className={anomaly.costImpact > 1000 ? 'text-red-500 font-medium' : ''}>
                  ${anomaly.costImpact.toFixed(2)}
                </TableCell>
                <TableCell className={anomaly.deviationPercentage > 100 ? 'text-red-500 font-medium' : ''}>
                  +{anomaly.deviationPercentage.toFixed(2)}%
                </TableCell>
                <TableCell>{anomaly.feedback || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center px-2">
              Page {currentPage} of {totalPages}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnomaliesTable;
