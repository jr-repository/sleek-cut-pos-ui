
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
    <SidebarProvider collapsedWidth={64}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                <div>
                  <h2 className="font-semibold text-sm">{currentBranch.name}</h2>
                  <p className="text-xs text-muted-foreground">{currentBranch.address}</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
