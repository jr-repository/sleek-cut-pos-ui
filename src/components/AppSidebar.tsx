
import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Building2, 
  DollarSign, 
  CreditCard, 
  ShoppingCart, 
  Package, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  Menu,
  Crown,
  UserCheck,
  Calendar,
  Receipt,
  CreditCard as CreditCardIcon
} from 'lucide-react';

interface AppSidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userRole: string | null;
  userBranchName: string | null;
  username: string | null;
  originalUserRole: string | null;
  isViewingClient: boolean;
  isViewingBranch: boolean;
  handleLogout: () => void;
  handleSwitchView: (targetRole: string, targetClientId?: number | null, targetBranchId?: number | null, targetBranchName?: string | null, targetUsernamePrefix?: string | null) => void;
  handleReturnToOriginalView: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  currentPage,
  setCurrentPage,
  userRole,
  userBranchName,
  username,
  originalUserRole,
  isViewingClient,
  isViewingBranch,
  handleLogout,
  handleSwitchView,
  handleReturnToOriginalView,
}) => {
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Super Admin menu items
  const superAdminMenuItems = [
    { id: 'superAdminDashboard', label: 'Super Admin Dashboard', icon: Crown },
    { id: 'clients', label: 'Manajemen Client', icon: Building2 },
    { id: 'posRentalPlans', label: 'Paket Sewa POS', icon: CreditCardIcon },
    { id: 'invoices', label: 'Invoice', icon: Receipt },
    { id: 'branchSubscriptions', label: 'Langganan Cabang', icon: Calendar },
  ];

  // Client-specific menu items (Admin, Owner, Kasir)
  const clientMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    ...(originalUserRole === 'admin' ? [{ id: 'users', label: 'Manajemen Pengguna', icon: Users }] : []),
    ...((originalUserRole === 'admin' || originalUserRole === 'owner') ? [{ id: 'branches', label: 'Manajemen Cabang', icon: Building2 }] : []),
    { id: 'barbermen', label: 'Barberman', icon: Users },
    { id: 'productsServices', label: 'Produk/Layanan', icon: Package },
    { id: 'expenses', label: 'Pengeluaran', icon: DollarSign },
    ...((originalUserRole === 'admin' || originalUserRole === 'owner') ? [{ id: 'paymentMethods', label: 'Metode Pembayaran', icon: CreditCard }] : []),
    { id: 'pos', label: 'POS Transaksi', icon: ShoppingCart },
    { id: 'reports', label: 'Laporan', icon: FileText },
  ];

  // Tentukan menu items berdasarkan role
  const menuItems = userRole === 'super_admin' && !isViewingClient ? superAdminMenuItems : clientMenuItems;

  return (
    <>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${sidebarMinimized ? 'w-20' : 'w-64'} bg-gray-800 border-r border-gray-700 shadow-xl flex flex-col transition-all duration-300 fixed h-screen z-50 lg:relative lg:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between">
            {!sidebarMinimized && (
              <div className="text-center flex-1">
                <h2 className="text-xl font-bold text-white">Barbershop POS</h2>
                {userBranchName && (
                  <p className="text-sm text-gray-400">({userBranchName})</p>
                )}
              </div>
            )}
            <button
              onClick={() => {
                setSidebarMinimized(!sidebarMinimized);
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            >
              {sidebarMinimized ? <Menu size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center ${sidebarMinimized ? 'justify-center px-3 py-4' : 'justify-start px-3 py-3'} rounded-lg transition-all duration-200 ${
                      currentPage === item.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    title={sidebarMinimized ? item.label : undefined}
                  >
                    <Icon size={sidebarMinimized ? 24 : 20} />
                    {!sidebarMinimized && (
                      <span className="ml-3 text-sm font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700 flex-shrink-0">
          {!sidebarMinimized && username && (
            <p className="text-sm text-gray-400 mb-3">
              Login sebagai: <span className="text-white font-medium">{username}</span>
            </p>
          )}
          
          {(isViewingClient || isViewingBranch) && (
            <button
              onClick={handleReturnToOriginalView}
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg mb-2 ${sidebarMinimized ? 'text-xs flex items-center justify-center' : ''}`}
            >
              {sidebarMinimized ? <Home size={16} /> : 'Kembali ke Global'}
            </button>
          )}
          
          <button
            onClick={handleLogout}
            className={`w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center ${sidebarMinimized ? 'justify-center' : 'justify-start'}`}
          >
            <LogOut size={sidebarMinimized ? 20 : 16} />
            {!sidebarMinimized && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
      >
        <Menu size={20} />
      </button>
    </>
  );
};

export default AppSidebar;
