
import React from 'react';

interface DashboardPageProps {
  userRole: string | null;
  userBranchId: number | null;
  currentClientId: number | null;
  onSwitchBranchView: (branchId: number | null, branchName: string | null, roleOverride: string | null) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ userRole, onSwitchBranchView }) => {
  const mockBranches = [
    { id: 1, name: 'Cabang Utama', address: 'Jl. Sudirman No. 123, Jakarta' },
    { id: 2, name: 'Cabang Mall', address: 'Mall Plaza, Lt. 2, Bandung' },
    { id: 3, name: 'Cabang Timur', address: 'Jl. Ahmad Yani No. 456, Surabaya' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Ringkasan performa barbershop Anda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Pendapatan</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">{formatCurrency(105000000)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Transaksi</p>
              <p className="text-3xl font-bold text-green-400 mt-2">1,234</p>
            </div>
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Barberman Aktif</p>
              <p className="text-3xl font-bold text-violet-400 mt-2">24</p>
            </div>
            <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👨‍💼</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Rata-rata per Transaksi</p>
              <p className="text-3xl font-bold text-yellow-400 mt-2">{formatCurrency(85000)}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Cards for Admin/Owner */}
      {(userRole === 'admin' || userRole === 'owner') && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-6">Pilih Cabang untuk Melihat Detail</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockBranches.map((branch) => (
              <div 
                key={branch.id} 
                className="bg-gray-700 border border-gray-600 rounded-xl p-6 hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
                onClick={() => onSwitchBranchView(branch.id, branch.name, 'kasir')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                    <span className="text-2xl">🏪</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{branch.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{branch.address}</p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform group-hover:-translate-y-0.5">
                  Lihat Cabang
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
