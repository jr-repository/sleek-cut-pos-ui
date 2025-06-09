
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  MapPin,
  BarChart3,
  Scissors,
  Settings,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'POS',
    url: '/pos',
    icon: ShoppingCart,
  },
  {
    title: 'Produk & Layanan',
    url: '/products',
    icon: Package,
  },
  {
    title: 'Barberman',
    url: '/barberman',
    icon: Scissors,
  },
  {
    title: 'Pengguna',
    url: '/users',
    icon: Users,
  },
  {
    title: 'Cabang',
    url: '/branches',
    icon: MapPin,
  },
  {
    title: 'Laporan',
    url: '/reports',
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r bg-card">
      <SidebarHeader className="border-b p-4">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/assets/image/logo.png" 
            alt="Logo" 
            className="h-8 w-8 object-contain"
          />
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold">BarberShop</h2>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          )}
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
