
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Info, Plus, Trash2 } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface AlertsConfigurationProps {
  budgetValue: number;
}

interface AlertRule {
  id: string;
  percentage: number;
  triggerOn: string;
}

const AlertsConfiguration = ({ budgetValue }: AlertsConfigurationProps) => {
  const [rules, setRules] = useState<AlertRule[]>([
    { id: '1', percentage: 50, triggerOn: 'Actual' },
    { id: '2', percentage: 90, triggerOn: 'Forecasted' },
    { id: '3', percentage: 110, triggerOn: 'Both' }
  ]);

  const addRule = () => {
    const newId = String(Date.now());
    setRules([...rules, { id: newId, percentage: 75, triggerOn: 'Both' }]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const updateRulePercentage = (id: string, value: string) => {
    const percentage = parseInt(value, 10) || 0;
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, percentage: percentage } : rule
    ));
  };

  const updateRuleTrigger = (id: string, value: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, triggerOn: value } : rule
    ));
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2 flex flex-row justify-between">
        <CardTitle className="text-xl">Alerts Configuration</CardTitle>
        <Button onClick={addRule} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Threshold
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Percentage of Budget</TableHead>
              <TableHead>Calculated Amount</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Trigger On</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Choose whether to trigger based on actual spend, forecasted projection, or both.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      value={rule.percentage}
                      onChange={(e) => updateRulePercentage(rule.id, e.target.value)}
                      className="w-20 mr-2"
                    />
                    <span>%</span>
                  </div>
                </TableCell>
                <TableCell>${(budgetValue * rule.percentage / 100).toLocaleString()}</TableCell>
                <TableCell>
                  <Select 
                    value={rule.triggerOn} 
                    onValueChange={(value) => updateRuleTrigger(rule.id, value)}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Actual">Actual</SelectItem>
                      <SelectItem value="Forecasted">Forecasted</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeRule(rule.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AlertsConfiguration;
