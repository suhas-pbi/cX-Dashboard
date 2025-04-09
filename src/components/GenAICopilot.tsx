
import React from 'react';
import { MessageCircleIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

const GenAICopilot = () => {
  return (
    <Button 
      className="fixed bottom-6 right-6 bg-cloudmetrix-accent hover:bg-cloudmetrix-primary shadow-lg rounded-full p-4 h-auto animate-slide-in-right"
    >
      <MessageCircleIcon className="mr-2 h-5 w-5" />
      Gen AI Copilot
    </Button>
  );
};

export default GenAICopilot;
