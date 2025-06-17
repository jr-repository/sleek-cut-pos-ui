
import React, { useState, useEffect } from 'react';
import './App.css';

// URL backend Anda
const BASE_URL = 'http://localhost/barber-backend';

// Import semua halaman
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import BarbermenPage from './pages/BarbermenPage';
import BranchesPage from './pages/BranchesPage';
import ExpensesPage from './pages/ExpensesPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import POSPage from './pages/POSPage';
import ProductsServicesPage from './pages/ProductsServicesPage';
import ReportsPage from './pages/ReportsPage';
import UsersPage from './pages/UsersPage';
import SuperAdminDashboardPage from './pages/SuperAdminDashboardPage'; // Halaman baru untuk Super Admin
import ClientsPage from './pages/ClientsPage'; // Halaman baru untuk manajemen client
import POSRentalPlansPage from './pages/POSRentalPlansPage'; // Halaman baru untuk rencana sewa POS
import InvoicesPage from './pages/InvoicesPage'; // Halaman baru untuk invoice
import BranchSubscriptionsPage from './pages/BranchSubscriptionsPage'; // Halaman BARU untuk langganan cabang

// Import komponen Sidebar
import AppSidebar from './components/AppSidebar';

// Interface untuk data cabang
interface Branch {
  id: number;
  name: string;
}

// Global user session structure
interface UserSession {
  id: number;
  client_id: number | null;
  username: string;
  role: string;
  branch_id: number | null;
}

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userBranchId, setUserBranchId] = useState<number | null>(null);
  const [userBranchName, setUserBranchName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [currentClientId, setCurrentClientId] = useState<number | null>(null); // CLIENT ID AKTIF

  // States untuk menyimpan peran dan client_id asli (khusus super_admin untuk beralih tampilan client)
  const [originalUserRole, setOriginalUserRole] = useState<string | null>(null);
  const [originalClientId, setOriginalClientId] = useState<number | null>(null);
  const [originalUsername, setOriginalUsername] = useState<string | null>(null);

  // States untuk menyimpan branch_id asli (khusus admin/owner untuk beralih tampilan cabang)
  const [originalUserBranchId, setOriginalUserBranchId] = useState<number | null>(null);
  const [originalUserBranchName, setOriginalUserBranchName] = useState<string | null>(null);


  // Efek untuk memeriksa status autentikasi saat aplikasi dimuat
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUserBranchId = localStorage.getItem('userBranchId');
    const storedUsername = localStorage.getItem('username');
    const storedClientId = localStorage.getItem('currentClientId'); // Ambil currentClientId

    const storedOriginalUserRole = localStorage.getItem('originalUserRole');
    const storedOriginalClientId = localStorage.getItem('originalClientId');
    const storedOriginalUsername = localStorage.getItem('originalUsername');
    const storedOriginalUserBranchId = localStorage.getItem('originalUserBranchId');
    const storedOriginalUserBranchName = localStorage.getItem('originalUserBranchName');


    if (storedAuthStatus === 'true' && storedUserRole) {
      setIsAuthenticated(true);
      setUserRole(storedUserRole);
      const branchId = storedUserBranchId ? parseInt(storedUserBranchId) : null;
      setUserBranchId(branchId);
      setUsername(storedUsername);
      setCurrentClientId(storedClientId ? parseInt(storedClientId) : null); // Set currentClientId
      setCurrentPage(storedUserRole === 'super_admin' && storedClientId === null ? 'superAdminDashboard' : 'dashboard'); // Default page after refresh

      // Set original credentials jika ada di localStorage
      if (storedOriginalUserRole && storedOriginalUsername) {
        setOriginalUserRole(storedOriginalUserRole);
        setOriginalClientId(storedOriginalClientId ? parseInt(storedOriginalClientId) : null);
        setOriginalUsername(storedOriginalUsername);
        setOriginalUserBranchId(storedOriginalUserBranchId ? parseInt(storedOriginalUserBranchId) : null);
        setOriginalUserBranchName(storedOriginalUserBranchName);
      } else {
        // Ini adalah login awal atau refresh tanpa 'viewing branch/client' flag diset
        setOriginalUserRole(storedUserRole);
        setOriginalClientId(storedClientId ? parseInt(storedClientId) : null); // Client ID awal = current client ID
        setOriginalUsername(storedUsername);
        setOriginalUserBranchId(branchId);
        // Untuk kasir asli, panggil fetchBranchName, untuk admin/owner set Global.
        if (storedUserRole === 'kasir' && branchId !== null) {
          fetchBranchName(branchId, true);
        } else if (storedUserRole === 'admin' || storedUserRole === 'owner' || storedUserRole === 'super_admin') {
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
          'X-User-Role': localStorage.getItem('userRole') || '', // Gunakan userRole dari localStorage
          'X-Client-Id': localStorage.getItem('currentClientId') || '', // Gunakan currentClientId dari localStorage
          'X-User-Branch-Id': localStorage.getItem('userBranchId') || '',
        },
      });
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
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
        console.error('Gagal mengambil daftar cabang atau data bukan array:', data.message || data);
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
      } else if (userRole === 'admin' || userRole === 'owner' || userRole === 'super_admin') {
        // Jika Super Admin, Admin, atau Owner, dan ada client id aktif, tampilkan nama client
        if (currentClientId !== null && userRole !== 'super_admin') { // Super Admin dashboard itself won't show branch name
             const fetchClientName = async () => {
                try {
                    const response = await fetch(`${BASE_URL}/clients_api.php?id=${currentClientId}`, {
                        headers: {
                            'X-User-Role': localStorage.getItem('userRole') || '',
                            'X-Client-Id': localStorage.getItem('currentClientId') || '',
                        }
                    });
                    const data = await response.json();
                    if (data.success && data.data) {
                        setUserBranchName(data.data.name); // Using client name as "branch name" for top-level client view
                    } else {
                        setUserBranchName('Client tidak ditemukan');
                    }
                } catch (error) {
                    console.error("Error fetching client name:", error);
                    setUserBranchName('Error Client');
                }
             };
             fetchClientName();
        } else if (userRole === 'super_admin' && currentClientId === null) {
             setUserBranchName('Global'); // Super Admin di dashboard utamanya
        } else {
            setUserBranchName('Global'); // Admin/Owner yang tidak punya branch_id spesifik (seharusnya hanya ada admin client)
        }
      }
    } else {
      setUserBranchName(null);
    }
  }, [userBranchId, userRole, currentClientId]);


  // Fungsi untuk menangani login berhasil
  const handleLoginSuccess = (user: UserSession, inactiveMessage: string | null = null) => {
    if (inactiveMessage) {
        alert(inactiveMessage); // Tampilkan notifikasi jika cabang tidak aktif
        // Jika kasir dan cabang tidak aktif, jangan lanjutkan login
        if (user.role === 'kasir' && inactiveMessage.includes('Cabang ini sedang tidak aktif')) {
            setIsAuthenticated(false); // Pastikan tidak terautentikasi
            return;
        }
    }

    setIsAuthenticated(true);
    setUserRole(user.role);
    setUserBranchId(user.branch_id);
    setUsername(user.username);
    setCurrentClientId(user.client_id); // Set client ID aktif

    // Simpan kredensial asli saat login pertama kali
    setOriginalUserRole(user.role);
    setOriginalClientId(user.client_id);
    setOriginalUsername(user.username);
    setOriginalUserBranchId(user.branch_id);
    
    // Perbarui originalUserBranchName saat login
    if (user.role === 'kasir' && user.branch_id !== null) {
      fetchBranchName(user.branch_id, true);
    } else if (user.role === 'admin' || user.role === 'owner') {
      setOriginalUserBranchName('Global');
      localStorage.setItem('originalUserBranchName', 'Global');
    } else if (user.role === 'super_admin') {
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
    localStorage.setItem('currentClientId', user.client_id ? user.client_id.toString() : '');
    localStorage.setItem('originalUserRole', user.role);
    localStorage.setItem('originalClientId', user.client_id ? user.client_id.toString() : '');
    localStorage.setItem('originalUsername', user.username);
    localStorage.setItem('originalUserBranchId', user.branch_id ? user.branch_id.toString() : '');
    
    setCurrentPage(user.role === 'super_admin' ? 'superAdminDashboard' : 'dashboard');
  };

  // Fungsi untuk beralih tampilan (Super Admin ke Client, atau Admin/Owner ke Cabang)
  const handleSwitchView = (
    targetRole: string, // Peran yang ingin disimulasikan (misal 'admin' atau 'kasir')
    targetClientId: number | null = null,
    targetBranchId: number | null = null,
    targetBranchName: string | null = null,
    targetUsernamePrefix: string | null = null // Contoh: (Lihat)
  ) => {
    // Simpan status original sebelum beralih jika ini adalah peralihan pertama dari original role
    // Atau jika ini adalah peralihan baru (misal dari client A ke client B)
    if (localStorage.getItem('isViewingClient') !== 'true' && localStorage.getItem('isViewingBranch') !== 'true') {
      localStorage.setItem('originalUserRole', userRole || '');
      localStorage.setItem('originalClientId', currentClientId ? currentClientId.toString() : '');
      localStorage.setItem('originalUsername', username || '');
      localStorage.setItem('originalUserBranchId', userBranchId ? userBranchId.toString() : '');
      localStorage.setItem('originalUserBranchName', userBranchName || '');
    }

    // Atur peran dan ID yang baru
    setUserRole(targetRole);
    setCurrentClientId(targetClientId);
    setUserBranchId(targetBranchId);
    setUserBranchName(targetBranchName);
    setUsername(targetUsernamePrefix ? `${targetUsernamePrefix} ${originalUsername}` : originalUsername);

    // Update localStorage untuk sesi saat ini
    localStorage.setItem('userRole', targetRole);
    localStorage.setItem('currentClientId', targetClientId ? targetClientId.toString() : '');
    localStorage.setItem('userBranchId', targetBranchId ? targetBranchId.toString() : '');
    localStorage.setItem('username', targetUsernamePrefix ? `${targetUsernamePrefix} ${originalUsername}` : originalUsername || '');

    // Set flag untuk melacak mode peralihan
    if (targetClientId !== null && (originalUserRole === 'super_admin')) {
      localStorage.setItem('isViewingClient', 'true');
      localStorage.removeItem('isViewingBranch'); // Hapus flag branch jika switch ke client
    } else {
      localStorage.setItem('isViewingClient', 'false');
    }

    if (targetBranchId !== null && (originalUserRole === 'admin' || originalUserRole === 'owner')) {
      localStorage.setItem('isViewingBranch', 'true');
    } else {
      localStorage.setItem('isViewingBranch', 'false');
    }

    // Arahkan ke dashboard yang sesuai
    if (targetRole === 'super_admin') {
      setCurrentPage('superAdminDashboard');
    } else {
      setCurrentPage('dashboard');
    }
  };


  // Fungsi untuk kembali ke tampilan asli (Super Admin dari Client, atau Admin/Owner dari Cabang)
  const handleReturnToOriginalView = () => {
    // Ambil semua dari original state yang tersimpan di localStorage
    const storedOriginalUserRole = localStorage.getItem('originalUserRole');
    const storedOriginalClientId = localStorage.getItem('originalClientId');
    const storedOriginalUsername = localStorage.getItem('originalUsername');
    const storedOriginalUserBranchId = localStorage.getItem('originalUserBranchId');
    const storedOriginalUserBranchName = localStorage.getItem('originalUserBranchName');

    if (storedOriginalUserRole) {
      setIsAuthenticated(true);
      setUserRole(storedOriginalUserRole);
      setCurrentClientId(storedOriginalClientId ? parseInt(storedOriginalClientId) : null);
      setUsername(storedOriginalUsername);
      setUserBranchId(storedOriginalUserBranchId ? parseInt(storedOriginalUserBranchId) : null);
      setUserBranchName(storedOriginalUserBranchName);

      // Update current localStorage to original state
      localStorage.setItem('userRole', storedOriginalUserRole);
      localStorage.setItem('currentClientId', storedOriginalClientId ? storedOriginalClientId.toString() : '');
      localStorage.setItem('username', storedOriginalUsername || '');
      localStorage.setItem('userBranchId', storedOriginalUserBranchId ? storedOriginalUserBranchId.toString() : '');
      localStorage.setItem('userSwitchingBranch', 'false'); // Reset flag
      localStorage.setItem('isViewingClient', 'false'); // Reset flag
      localStorage.setItem('isViewingBranch', 'false'); // Reset flag

      setCurrentPage(storedOriginalUserRole === 'super_admin' ? 'superAdminDashboard' : 'dashboard');
    } else {
      // Fallback jika tidak ada original state, log out saja
      handleLogout();
    }
  };


  // Fungsi untuk menangani logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserBranchId(null);
    setUserBranchName(null);
    setUsername(null);
    setCurrentClientId(null);
    setOriginalUserRole(null);
    setOriginalClientId(null);
    setOriginalUsername(null);
    setOriginalUserBranchId(null);
    setOriginalUserBranchName(null);
    localStorage.clear();
    setCurrentPage('login');
  };

  // Tentukan apakah user sedang dalam mode "melihat client" atau "melihat cabang"
  const isViewingClient = localStorage.getItem('isViewingClient') === 'true';
  const isViewingBranch = localStorage.getItem('isViewingBranch') === 'true';

  // Render sesuai peran dan status autentikasi
  const renderPage = () => {
    if (!isAuthenticated) {
      return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    switch (currentPage) {
      case 'superAdminDashboard':
        return <SuperAdminDashboardPage userRole={userRole} currentClientId={currentClientId} onSwitchView={handleSwitchView} />;
      case 'clients':
        return <ClientsPage userRole={userRole} currentClientId={currentClientId} />;
      case 'posRentalPlans':
        return <POSRentalPlansPage userRole={userRole} currentClientId={currentClientId} />;
      case 'invoices':
        return <InvoicesPage userRole={userRole} currentClientId={currentClientId} />;
      case 'branchSubscriptions': // Rute BARU
        return <BranchSubscriptionsPage userRole={userRole} currentClientId={currentClientId} />;
      // Halaman Client-specific (Admin, Owner, Kasir)
      case 'dashboard':
        return <DashboardPage userRole={userRole} userBranchId={userBranchId} currentClientId={currentClientId} onSwitchBranchView={(branchId, branchName, roleOverride) => handleSwitchView(roleOverride || 'kasir', currentClientId, branchId, branchName, '(Lihat)')} />;
      case 'barbermen':
        return <BarbermenPage userRole={userRole} userBranchId={userBranchId} currentClientId={currentClientId} />;
      case 'branches':
        return <BranchesPage userRole={userRole} currentClientId={currentClientId} />;
      case 'expenses':
        return <ExpensesPage userRole={userRole} userBranchId={userBranchId} currentClientId={currentClientId} />;
      case 'paymentMethods':
        return <PaymentMethodsPage userRole={userRole} currentClientId={currentClientId} />;
      case 'pos':
        return <POSPage userRole={userRole} userBranchId={userBranchId} username={username} currentClientId={currentClientId} />;
      case 'productsServices':
        return <ProductsServicesPage userRole={userRole} userBranchId={userBranchId} currentClientId={currentClientId} />;
      case 'reports':
        return <ReportsPage userRole={userRole} userBranchId={userBranchId} currentClientId={currentClientId} />;
      case 'users':
        return <UsersPage userRole={userRole} currentClientId={currentClientId} />;
      default:
        // Default page after login based on role
        if (userRole === 'super_admin') {
            return <SuperAdminDashboardPage userRole={userRole} currentClientId={currentClientId} onSwitchView={handleSwitchView} />;
        }
        // Admin/Owner/Kasir akan diarahkan ke DashboardPage
        return <DashboardPage userRole={userRole} userBranchId={userBranchId} currentClientId={currentClientId} onSwitchBranchView={(branchId, branchName, roleOverride) => handleSwitchView(roleOverride || 'kasir', currentClientId, branchId, branchName, '(Lihat)')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {!isAuthenticated ? ( // Jika belum terautentikasi, tampilkan hanya LoginPage
        renderPage()
      ) : ( // Jika sudah terautentikasi, tampilkan Sidebar dan Main Content
        <>
          {/* Sidebar */}
          <AppSidebar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            userRole={userRole}
            userBranchName={userBranchName}
            username={username}
            originalUserRole={originalUserRole}
            isViewingClient={isViewingClient}
            isViewingBranch={isViewingBranch}
            handleLogout={handleLogout}
            handleSwitchView={handleSwitchView}
            handleReturnToOriginalView={handleReturnToOriginalView}
          />

          {/* Main Content Area */}
          <main className="flex-grow p-6 overflow-y-auto bg-gray-900">
            {renderPage()}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
