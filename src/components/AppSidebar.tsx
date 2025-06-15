
import React from 'react';
import { Home, Users, Building2, DollarSign, CreditCard, ShoppingCart, Package, FileText, Settings, LogOut, User, BarChart3, UserCheck, CreditCard as PlanIcon, Receipt, Calendar } from 'lucide-react';

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
  handleReturnToOriginalView
}) => {
  
  // Menu items berdasarkan peran
  const getMenuItems = () => {
    if (userRole === 'super_admin') {
      return [
        { id: 'superAdminDashboard', label: 'Super Admin Dashboard', icon: BarChart3 },
        { id: 'clients', label: 'Manajemen Client', icon: Building2 },
        { id: 'posRentalPlans', label: 'Rencana Sewa POS', icon: PlanIcon },
        { id: 'invoices', label: 'Invoice', icon: Receipt },
        { id: 'branchSubscriptions', label: 'Langganan Cabang', icon: Calendar },
      ];
    }

    // Menu untuk Admin, Owner, Kasir
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
    ];

    if (originalUserRole === 'admin') {
      baseItems.push({ id: 'users', label: 'Manajemen Pengguna', icon: Users });
    }

    if (originalUserRole === 'admin' || originalUserRole === 'owner') {
      baseItems.push({ id: 'branches', label: 'Manajemen Cabang', icon: Building2 });
    }

    baseItems.push(
      { id: 'barbermen', label: 'Barberman', icon: UserCheck },
      { id: 'productsServices', label: 'Produk/Layanan', icon: Package },
      { id: 'expenses', label: 'Pengeluaran', icon: DollarSign }
    );

    if (originalUserRole === 'admin' || originalUserRole === 'owner') {
      baseItems.push({ id: 'paymentMethods', label: 'Metode Pembayaran', icon: CreditCard });
    }

    baseItems.push(
      { id: 'pos', label: 'POS Transaksi', icon: ShoppingCart },
      { id: 'reports', label: 'Laporan', icon: FileText }
    );

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 shadow-xl flex flex-col h-screen">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">Barbershop POS</h2>
          {userBranchName && (
            <p className="text-sm text-gray-400">({userBranchName})</p>
          )}
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
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center justify-start px-3 py-3 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-700 space-y-3">
        {username && (
          <p className="text-sm text-gray-400">
            Login sebagai: <span className="text-white font-medium">{username}</span>
          </p>
        )}
        
        {(isViewingClient || isViewingBranch) && (
          <button
            onClick={handleReturnToOriginalView}
            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Home size={16} className="inline mr-2" />
            Kembali ke Global
          </button>
        )}
        
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center"
        >
          <LogOut size={16} />
          <span className="ml-2">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
