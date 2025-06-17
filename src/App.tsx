import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Users, Building2, DollarSign, CreditCard, ShoppingCart, Package, FileText, Settings, LogOut, ChevronLeft, Bell, User } from 'lucide-react';
import './App.css';

// URL backend Anda
const BASE_URL = 'http://localhost/barber-backend';

// Impor komponen halaman yang sudah dibuat
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import BarbermanPage from './pages/BarbermanPage';
import BranchesPage from './pages/BranchesPage';
import ExpensesPage from './pages/ExpensesPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import POSPage from './pages/POSPage';
import ProductServicePage from './pages/ProductServicePage';
import ReportsPage from './pages/ReportsPage';
import UsersPage from './pages/UsersPage';

// Interface untuk data cabang
interface Branch {
  id: number;
  name: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userBranchId, setUserBranchId] = useState<number | null>(null);
  const [userBranchName, setUserBranchName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // States untuk menyimpan peran dan cabang asli (khusus admin/owner untuk beralih tampilan)
  const [originalUserRole, setOriginalUserRole] = useState<string | null>(null);
  const [originalUserBranchId, setOriginalUserBranchId] = useState<number | null>(null);
  const [originalUsername, setOriginalUsername] = useState<string | null>(null);
  const [originalUserBranchName, setOriginalUserBranchName] = useState<string | null>(null);

  // Efek untuk memeriksa status autentikasi saat aplikasi dimuat
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUserBranchId = localStorage.getItem('userBranchId');
    const storedUsername = localStorage.getItem('username');

    const storedOriginalUserRole = localStorage.getItem('originalUserRole');
    const storedOriginalUserBranchId = localStorage.getItem('originalUserBranchId');
    const storedOriginalUsername = localStorage.getItem('originalUsername');
    const storedOriginalUserBranchName = localStorage.getItem('originalUserBranchName');

    if (storedAuthStatus === 'true' && storedUserRole) {
      setIsAuthenticated(true);
      setUserRole(storedUserRole);
      const branchId = storedUserBranchId ? parseInt(storedUserBranchId) : null;
      setUserBranchId(branchId);
      setUsername(storedUsername);
      setCurrentPage('dashboard');

      // Set original credentials jika ada di localStorage
      if (storedOriginalUserRole && storedOriginalUsername) {
        setOriginalUserRole(storedOriginalUserRole);
        setOriginalUserBranchId(storedOriginalUserBranchId ? parseInt(storedOriginalUserBranchId) : null);
        setOriginalUsername(storedOriginalUsername);
        setOriginalUserBranchName(storedOriginalUserBranchName);
      } else {
        // Ini adalah login awal atau refresh tanpa 'viewing branch' flag diset
        setOriginalUserRole(storedUserRole);
        setOriginalUserBranchId(branchId);
        setOriginalUsername(storedUsername);
        // Untuk kasir asli, panggil fetchBranchName, untuk admin/owner set Global.
        if (storedUserRole === 'kasir' && branchId !== null) {
          fetchBranchName(branchId, true); // Panggil dengan flag isOriginal untuk originalUserBranchName
        } else if (storedUserRole === 'admin' || storedUserRole === 'owner') {
          setOriginalUserBranchName('Global');
        } else {
          setOriginalUserBranchName(null);
        }
      }
    }
  }, []);

  // Fungsi pembantu untuk mengambil nama cabang (bisa untuk user aktif atau original)
  const fetchBranchName = async (branchId: number, isOriginal: boolean = false) => {
    try {
      const response = await fetch(`${BASE_URL}/branches_api.php`, {
        headers: {
          'X-User-Role': userRole || '',
          'X-User-Branch-Id': (userBranchId !== null ? userBranchId.toString() : ''),
        },
      });
      const data = await response.json();
      if (data.success && data.data) {
        const branch = data.data.find((b: Branch) => b.id === branchId);
        if (branch) {
          if (isOriginal) {
            setOriginalUserBranchName(branch.name);
            localStorage.setItem('originalUserBranchName', branch.name);
          } else {
            setUserBranchName(branch.name);
          }
        } else {
          if (isOriginal) setOriginalUserBranchName('Cabang tidak ditemukan');
          else setUserBranchName('Cabang tidak ditemukan');
        }
      } else {
        console.error('Gagal mengambil daftar cabang:', data.message);
        if (isOriginal) setOriginalUserBranchName('Gagal memuat cabang');
        else setUserBranchName('Gagal memuat cabang');
      }
    } catch (err) {
      console.error('Error fetching branch name:', err);
      if (isOriginal) setOriginalUserBranchName('Error memuat cabang');
      else setUserBranchName('Error memuat cabang');
    }
  };

  // Efek untuk mengambil nama cabang aktif setelah userBranchId/userRole berubah
  useEffect(() => {
    if (userBranchId !== null) {
      if (userRole === 'kasir') {
        fetchBranchName(userBranchId, false);
      } else if (userRole === 'admin' || userRole === 'owner') {
        setUserBranchName('Global');
      }
    } else {
      setUserBranchName(null);
    }
  }, [userBranchId, userRole]);

  // Fungsi untuk menangani login berhasil
  const handleLoginSuccess = (user: any, inactiveMessage?: string | null) => {
    setIsAuthenticated(true);
    setUserRole(user.role);
    setUserBranchId(user.branch_id);
    setUsername(user.username);

    // Simpan kredensial asli saat login pertama kali
    setOriginalUserRole(user.role);
    setOriginalUserBranchId(user.branch_id);
    setOriginalUsername(user.username);
    
    // Perbarui originalUserBranchName saat login
    if (user.role === 'kasir' && user.branch_id !== null) {
      fetchBranchName(user.branch_id, true);
    } else if (user.role === 'admin' || user.role === 'owner') {
      setOriginalUserBranchName('Global');
      localStorage.setItem('originalUserBranchName', 'Global');
    } else {
      setOriginalUserBranchName(null);
      localStorage.setItem('originalUserBranchName', '');
    }

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('userBranchId', user.branch_id ? user.branch_id.toString() : '');
    localStorage.setItem('username', user.username);
    localStorage.setItem('originalUserRole', user.role);
    localStorage.setItem('originalUserBranchId', user.branch_id ? user.branch_id.toString() : '');
    localStorage.setItem('originalUsername', user.username);
    
    setCurrentPage('dashboard');
  };

  // Fungsi untuk beralih tampilan cabang (untuk Admin/Owner)
  const handleSwitchBranchView = (branchId: number | null, branchName: string | null, roleOverride: string | null) => {
    localStorage.setItem('originalUserRole', originalUserRole || '');
    localStorage.setItem('originalUserBranchId', originalUserBranchId ? originalUserBranchId.toString() : '');
    localStorage.setItem('originalUsername', originalUsername || '');
    localStorage.setItem('originalUserBranchName', originalUserBranchName || '');

    if (branchId === null) {
      setUserRole(originalUserRole);
      setUserBranchId(originalUserBranchId);
      setUsername(originalUsername);
      setUserBranchName(originalUserBranchName);
      
      localStorage.setItem('userRole', originalUserRole || '');
      localStorage.setItem('userBranchId', originalUserBranchId ? originalUserBranchId.toString() : '');
      localStorage.setItem('username', originalUsername || '');
      localStorage.setItem('userSwitchingBranch', 'false');
    } else {
      setUserRole(roleOverride || 'kasir');
      setUserBranchId(branchId);
      setUsername(`(Lihat) ${originalUsername}`);
      setUserBranchName(branchName);

      localStorage.setItem('userRole', roleOverride || 'kasir');
      localStorage.setItem('userBranchId', branchId.toString());
      localStorage.setItem('username', `(Lihat) ${originalUsername}`);
      localStorage.setItem('userSwitchingBranch', 'true');
    }
    setCurrentPage('dashboard');
  };

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserBranchId(null);
    setUserBranchName(null);
    setUsername(null);
    setOriginalUserRole(null);
    setOriginalUserBranchId(null);
    setOriginalUsername(null);
    setOriginalUserBranchName(null);
    localStorage.clear();
    setCurrentPage('login');
  };

  // Tentukan apakah user sedang dalam mode "melihat cabang"
  const isViewingSpecificBranch = (
    (userRole === 'kasir' && (originalUserRole === 'admin' || originalUserRole === 'owner')) &&
    (localStorage.getItem('userSwitchingBranch') === 'true')
  );

  // Navigasi sederhana menggunakan switch/case
  const renderPage = () => {
    if (!isAuthenticated) {
      return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage userRole={userRole} userBranchId={userBranchId} onSwitchBranchView={handleSwitchBranchView} />;
      case 'barbermen':
        return <BarbermanPage userRole={userRole} userBranchId={userBranchId} />;
      case 'branches':
        return <BranchesPage userRole={userRole} />;
      case 'expenses':
        return <ExpensesPage userRole={userRole} userBranchId={userBranchId} />;
      case 'paymentMethods':
        return <PaymentMethodsPage userRole={userRole} />;
      case 'pos':
        return <POSPage userRole={userRole} userBranchId={userBranchId} username={username} />;
      case 'productsServices':
        return <ProductServicePage userRole={userRole} userBranchId={userBranchId} />;
      case 'reports':
        return <ReportsPage userRole={userRole} userBranchId={userBranchId} />;
      case 'users':
        return <UsersPage userRole={userRole} />;
      default:
        return <DashboardPage userRole={userRole} userBranchId={userBranchId} onSwitchBranchView={handleSwitchBranchView} />;
    }
  };

  const menuItems = [
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

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {!isAuthenticated && renderPage()}

      {isAuthenticated && (
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
            <div className="p-4 border-b border-gray-700">
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
            <nav className="flex-1 p-4">
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
            <div className="p-4 border-t border-gray-700">
              {!sidebarMinimized && username && (
                <p className="text-sm text-gray-400 mb-3">
                  Login sebagai: <span className="text-white font-medium">{username}</span>
                </p>
              )}
              
              {isViewingSpecificBranch && (
                <button
                  onClick={() => handleSwitchBranchView(null, null, null)}
                  className={`w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg mb-2 ${sidebarMinimized ? 'text-xs flex items-center justify-center' : ''}`}
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

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 shadow-lg sticky top-0 z-30">
              <div className="flex items-center justify-between px-4 lg:px-6 py-4">
                <div className="flex items-center gap-4">
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="lg:hidden p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    <Menu size={20} />
                  </button>
                  
                  {/* Page Title */}
                  <div>
                    <h1 className="text-xl font-bold text-white capitalize">
                      {currentPage === 'productsServices' ? 'Produk & Layanan' : 
                       currentPage === 'paymentMethods' ? 'Metode Pembayaran' :
                       currentPage === 'pos' ? 'Point of Sale' :
                       currentPage === 'barbermen' ? 'Barberman' :
                       currentPage}
                    </h1>
                    {userBranchName && (
                      <p className="text-sm text-gray-400">{userBranchName}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Notifications */}
                  <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </button>

                  {/* User Menu */}
                  <div className="flex items-center gap-3">
                    <div className="hidden md:block text-right">
                      <p className="text-sm font-medium text-white">{username}</p>
                      <p className="text-xs text-gray-400 capitalize">{userRole}</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full flex items-center justify-center">
                      <User className="text-white" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-6 overflow-auto bg-gray-900">
              {renderPage()}
            </main>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
