import React, { useState, useEffect } from 'react';
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
  const handleLoginSuccess = (role: string, branch_id: number | null, username_param: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserBranchId(branch_id);
    setUsername(username_param);

    // Simpan kredensial asli saat login pertama kali
    setOriginalUserRole(role);
    setOriginalUserBranchId(branch_id);
    setOriginalUsername(username_param);
    
    // Perbarui originalUserBranchName saat login
    if (role === 'kasir' && branch_id !== null) {
      fetchBranchName(branch_id, true);
    } else if (role === 'admin' || role === 'owner') {
      setOriginalUserBranchName('Global');
      localStorage.setItem('originalUserBranchName', 'Global');
    } else {
      setOriginalUserBranchName(null);
      localStorage.setItem('originalUserBranchName', '');
    }

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userBranchId', branch_id ? branch_id.toString() : '');
    localStorage.setItem('username', username_param);
    localStorage.setItem('originalUserRole', role);
    localStorage.setItem('originalUserBranchId', branch_id ? branch_id.toString() : '');
    localStorage.setItem('originalUsername', username_param);
    
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

  return (
    <div className="min-h-screen barbershop-gradient flex">
      {!isAuthenticated && renderPage()}

      {isAuthenticated && (
        <>
          {/* Sidebar */}
          <aside className="w-64 bg-sidebar border-r border-sidebar-border shadow-2xl flex flex-col">
            <div className="text-center p-6 border-b border-sidebar-border">
              <h2 className="text-2xl font-bold text-sidebar-foreground text-gradient">Barbershop POS</h2>
              {userBranchName && (
                <p className="text-sm text-sidebar-foreground/70 mt-2">({userBranchName})</p>
              )}
            </div>
            
            <nav className="flex-grow p-4">
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setCurrentPage('dashboard')} 
                    className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 hover:bg-sidebar-accent hover:shadow-lg ${
                      currentPage === 'dashboard' ? 'bg-sidebar-accent shadow-lg' : ''
                    }`}
                  >
                    <span className="text-sidebar-foreground font-medium">Dashboard</span>
                  </button>
                </li>
                {originalUserRole === 'admin' && (
                  <li>
                    <button 
                      onClick={() => setCurrentPage('users')} 
                      className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 hover:bg-sidebar-accent hover:shadow-lg ${
                        currentPage === 'users' ? 'bg-sidebar-accent shadow-lg' : ''
                      }`}
                    >
                      <span className="text-sidebar-foreground font-medium">Manajemen Pengguna</span>
                    </button>
                  </li>
                )}
                {(originalUserRole === 'admin' || originalUserRole === 'owner') && (
                  <li>
                    <button 
                      onClick={() => setCurrentPage('branches')} 
                      className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 hover:bg-sidebar-accent hover:shadow-lg ${
                        currentPage === 'branches' ? 'bg-sidebar-accent shadow-lg' : ''
                      }`}
                    >
                      <span className="text-sidebar-foreground font-medium">Manajemen Cabang</span>
                    </button>
                  </li>
                )}
                <li>
                  <button 
                    onClick={() => setCurrentPage('barbermen')} 
                    className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 hover:bg-sidebar-accent hover:shadow-lg ${
                      currentPage === 'barbermen' ? 'bg-sidebar-accent shadow-lg' : ''
                    }`}
                  >
                    <span className="text-sidebar-foreground font-medium">Barberman</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('productsServices')} 
                    className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 hover:bg-sidebar-accent hover:shadow-lg ${
                      currentPage === 'productsServices' ? 'bg-sidebar-accent shadow-lg' : ''
                    }`}
                  >
                    <span className="text-sidebar-foreground font-medium">Produk/Layanan</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('expenses')} 
                    className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 hover:bg-sidebar-accent hover:shadow-lg ${
                      currentPage === 'expenses' ? 'bg-sidebar-accent shadow-lg' : ''
                    }`}
                  >
                    <span className="text-sidebar-foreground font-medium">Pengeluaran</span>
                  </button>
                </li>
                {(originalUserRole === 'admin' || originalUserRole === 'owner') && (
                  <li>
                    <button 
                      onClick={() => setCurrentPage('paymentMethods')} 
                      className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 hover:bg-sidebar-accent hover:shadow-lg ${
                        currentPage === 'paymentMethods' ? 'bg-sidebar-accent shadow-lg' : ''
                      }`}
                    >
                      <span className="text-sidebar-foreground font-medium">Metode Pembayaran</span>
                    </button>
                  </li>
                )}
                <li>
                  <button 
                    onClick={() => setCurrentPage('pos')} 
                    className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 hover:bg-sidebar-accent hover:shadow-lg ${
                      currentPage === 'pos' ? 'bg-sidebar-accent shadow-lg' : ''
                    }`}
                  >
                    <span className="text-sidebar-foreground font-medium">POS Transaksi</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('reports')} 
                    className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 hover:bg-sidebar-accent hover:shadow-lg ${
                      currentPage === 'reports' ? 'bg-sidebar-accent shadow-lg' : ''
                    }`}
                  >
                    <span className="text-sidebar-foreground font-medium">Laporan</span>
                  </button>
                </li>
              </ul>
            </nav>
            
            <div className="p-4 border-t border-sidebar-border">
              {username && (
                <p className="text-sm text-sidebar-foreground/80 mb-3">
                  Login sebagai: <span className="font-semibold text-sidebar-foreground">{username}</span>
                </p>
              )}
              {isViewingSpecificBranch && (
                <button
                  onClick={() => handleSwitchBranchView(null, null, null)}
                  className="w-full gradient-primary text-white font-medium py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl mb-2"
                >
                  Kembali ke Tampilan Global
                </button>
              )}
              <button 
                onClick={handleLogout} 
                className="w-full bg-destructive text-destructive-foreground font-medium py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:bg-destructive/90 hover:shadow-xl"
              >
                Logout
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-grow bg-background overflow-y-auto">
            <div className="p-6">
              {renderPage()}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
