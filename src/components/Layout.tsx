
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { LogOut, Building } from 'lucide-react';

interface Branch {
  id: number;
  name: string;
  address: string;
}

interface LayoutProps {
  currentBranch: Branch;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ currentBranch, onLogout }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-14 sm:h-16 border-b border-border bg-card flex items-center justify-between px-3 sm:px-6">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <SidebarTrigger className="flex-shrink-0" />
              <div className="flex items-center gap-2 min-w-0">
                <Building className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <h2 className="font-semibold text-xs sm:text-sm truncate">{currentBranch.name}</h2>
                  <p className="text-xs text-muted-foreground truncate hidden sm:block">{currentBranch.address}</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" onClick={onLogout} className="flex-shrink-0">
              <LogOut className="h-4 w-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Keluar</span>
            </Button>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
