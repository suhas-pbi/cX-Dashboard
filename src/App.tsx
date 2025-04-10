
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import NotFound from "./pages/NotFound";

// Lazily load pages
const Index = React.lazy(() => import("./pages/Index"));
const UnifiedCostAnalysis = React.lazy(() => import("./pages/UnifiedCostAnalysis"));
const BudgetingObservability = React.lazy(() => import("./pages/BudgetingObservability"));

const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
    <Skeleton className="h-8 w-64 mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 rounded-xl" />
      ))}
    </div>
    <Skeleton className="h-8 w-48 mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-40 rounded-xl" />
      ))}
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cost-analysis" element={<UnifiedCostAnalysis />} />
            <Route path="/budgeting" element={<BudgetingObservability />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
