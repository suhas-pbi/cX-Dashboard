
import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";

const GenAICopilot = () => {
  return (
    <Button 
      className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white shadow-lg rounded-full p-4 h-auto animate-pulse transition-all duration-300"
    >
      <Bot className="mr-2 h-5 w-5" />
      Gen AI Copilot
    </Button>
  );
};

export default GenAICopilot;
