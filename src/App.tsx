import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ASHADashboard from "./pages/ASHADashboard";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import Compliance from "./pages/Compliance";
import Registration from "./pages/Registration";
import { AppProvider } from "./context/AppContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/patient" element={<PatientDashboard />} />
              <Route path="/doctor" element={<DoctorDashboard />} />
              <Route path="/asha" element={<ASHADashboard />} />
              <Route path="/pharmacy" element={<PharmacyDashboard />} />
              <Route path="/compliance" element={<Compliance />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
