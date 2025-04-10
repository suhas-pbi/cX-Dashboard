
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CostAvoidanceTableProps {
  selectedServices: string[];
}

interface Recommendation {
  id: number;
  resourceName: string;
  recommendation: string;
  serviceRegion: string;
  quantity: string;
  status: "Applied" | "Pending" | "Ignored";
  amountAvoided: number;
}

const CostAvoidanceTable: React.FC<CostAvoidanceTableProps> = ({ selectedServices }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sample data for the table
  const recommendations: Recommendation[] = [
    {
      id: 1,
      resourceName: "Compute",
      recommendation: "Rightsize VM instances",
      serviceRegion: "East US / AWS EC2",
      quantity: "5 VMs",
      status: "Applied",
      amountAvoided: 3200
    },
    {
      id: 2,
      resourceName: "Storage",
      recommendation: "Delete unattached volumes",
      serviceRegion: "West Europe / Azure Blob",
      quantity: "12 disks",
      status: "Applied",
      amountAvoided: 830
    },
    {
      id: 3,
      resourceName: "Networking",
      recommendation: "Remove unused IP addresses",
      serviceRegion: "Central US / GCP VPC",
      quantity: "8 IPs",
      status: "Pending",
      amountAvoided: 240
    },
    {
      id: 4,
      resourceName: "Databases",
      recommendation: "Scale down database tier",
      serviceRegion: "South Asia / AWS RDS",
      quantity: "2 instances",
      status: "Ignored",
      amountAvoided: 1750
    },
    {
      id: 5,
      resourceName: "Load Balancers",
      recommendation: "Consolidate load balancers",
      serviceRegion: "North Europe / Azure LB",
      quantity: "3 LBs",
      status: "Applied",
      amountAvoided: 720
    },
    {
      id: 6,
      resourceName: "Container Services",
      recommendation: "Optimize container resource allocation",
      serviceRegion: "East US / Kubernetes",
      quantity: "15 pods",
      status: "Pending",
      amountAvoided: 1280
    },
    {
      id: 7,
      resourceName: "Compute",
      recommendation: "Use Spot Instances",
      serviceRegion: "West US / AWS EC2",
      quantity: "10 VMs",
      status: "Applied",
      amountAvoided: 4500
    },
    {
      id: 8,
      resourceName: "Storage",
      recommendation: "Move infrequent data to cold storage",
      serviceRegion: "East US / AWS S3",
      quantity: "500 GB",
      status: "Pending",
      amountAvoided: 380
    },
    {
      id: 9,
      resourceName: "Databases",
      recommendation: "Enable auto-scaling",
      serviceRegion: "West Europe / Azure SQL",
      quantity: "1 instance",
      status: "Applied",
      amountAvoided: 1650
    },
    {
      id: 10,
      resourceName: "Compute",
      recommendation: "Implement auto-shutdown schedules",
      serviceRegion: "Central US / GCP Compute",
      quantity: "8 VMs",
      status: "Pending",
      amountAvoided: 2100
    },
    {
      id: 11,
      resourceName: "Networking",
      recommendation: "Optimize data transfer paths",
      serviceRegion: "Multi-region / AWS",
      quantity: "Global",
      status: "Applied",
      amountAvoided: 3750
    },
    {
      id: 12,
      resourceName: "Container Services",
      recommendation: "Right-size container requests/limits",
      serviceRegion: "East US / AKS",
      quantity: "30 containers",
      status: "Ignored",
      amountAvoided: 920
    }
  ];

  // Filter based on search term and selected services
  const filteredData = recommendations.filter(item => {
    const matchesSearch = 
      item.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.recommendation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serviceRegion.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = selectedServices.includes('All') || 
      selectedServices.includes(item.resourceName);
    
    return matchesSearch && matchesService;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Applied':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Applied</span>;
      case 'Pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case 'Ignored':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Ignored</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Search & Filter Bar */}
      <div className="mb-4 flex">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search recommendations..."
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[5%]">#</TableHead>
              <TableHead className="w-[15%]">Resource Name</TableHead>
              <TableHead className="w-[25%]">Recommendation</TableHead>
              <TableHead className="w-[20%]">Service/Region</TableHead>
              <TableHead className="w-[10%]">Quantity</TableHead>
              <TableHead className="w-[10%]">Status</TableHead>
              <TableHead className="w-[15%] text-right">Amount Avoided</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell>{item.resourceName}</TableCell>
                <TableCell>{item.recommendation}</TableCell>
                <TableCell>{item.serviceRegion}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell className="text-right font-medium">${item.amountAvoided.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {Math.min(filteredData.length, startIndex + 1)} to {Math.min(filteredData.length, startIndex + rowsPerPage)} of {filteredData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <select
            className="border border-gray-200 rounded p-1 text-sm"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
            <option value={50}>50 rows</option>
          </select>
          <div className="flex space-x-1">
            <button 
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Prev
            </button>
            <button 
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostAvoidanceTable;
