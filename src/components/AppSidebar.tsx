
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Building,
  Users,
  Package,
  ShoppingCart,
  FileText,
  Home,
  Scissors,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Point of Sale', url: '/pos', icon: ShoppingCart },
  { title: 'Manajemen Cabang', url: '/branches', icon: Building },
  { title: 'Manajemen User', url: '/users', icon: Users },
  { title: 'Barberman', url: '/barberman', icon: Scissors },
  { title: 'Produk & Layanan', url: '/products', icon: Package },
  { title: 'Laporan', url: '/reports', icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-border bg-sidebar text-sidebar-foreground"
      variant="sidebar"
    >
      <SidebarContent className="bg-sidebar">
        {/* Brand */}
        <div className="p-4 border-b border-border bg-sidebar">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Scissors className="h-4 w-4 text-white" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="font-bold text-lg text-gradient truncate">Barbershop</h1>
                <p className="text-xs text-muted-foreground truncate">Point of Sale</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className="text-sidebar-foreground/70 mb-2">
            {!isCollapsed ? 'Menu Utama' : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`w-full justify-start gap-3 h-10 px-3 transition-all duration-200 ${
                      isActive(item.url) 
                        ? 'bg-primary text-primary-foreground font-medium shadow-sm' 
                        : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground'
                    }`}
                  >
                    <NavLink 
                      to={item.url} 
                      className="flex items-center gap-3 w-full"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="truncate text-sm">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
