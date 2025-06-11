
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import BranchesPage from "./pages/BranchesPage";
import UsersPage from "./pages/UsersPage";
import BarbermanPage from "./pages/BarbermanPage";
import ProductServicePage from "./pages/ProductServicePage";
import POSPage from "./pages/POSPage";
import ReportsPage from "./pages/ReportsPage";
import ExpensesPage from "./pages/ExpensesPage";
import PaymentMethodsPage from "./pages/PaymentMethodsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface Branch {
  id: number;
  name: string;
  address: string;
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Set default branch - user can switch later from dashboard
    setCurrentBranch({ id: 1, name: 'Cabang Utama', address: 'Jl. Sudirman No. 123, Jakarta' });
  };

  const handleBranchSwitch = (branch: Branch) => {
    setCurrentBranch(branch);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentBranch(null);
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoginPage onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout currentBranch={currentBranch} onLogout={handleLogout} />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage onBranchSwitch={handleBranchSwitch} />} />
              <Route path="pos" element={<POSPage />} />
              <Route path="branches" element={<BranchesPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="barberman" element={<BarbermanPage />} />
              <Route path="products" element={<ProductServicePage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="expenses" element={<ExpensesPage />} />
              <Route path="payment-methods" element={<PaymentMethodsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
