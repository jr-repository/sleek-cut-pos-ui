
import React from 'react';

interface DashboardPageProps {
  userRole: string | null;
  userBranchId: number | null;
  currentClientId: number | null;
  onSwitchBranchView: (branchId: number | null, branchName: string | null, roleOverride: string | null) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ userRole, userBranchId, currentClientId, onSwitchBranchView }) => {
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
      <div className="bg-gradient-to-r from-blue-800 to-indigo-800 rounded-2xl p-6 shadow-xl">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-blue-200 mt-2">Ringkasan performa barbershop Anda</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Pendapatan</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{formatCurrency(105000000)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Transaksi</p>
              <p className="text-3xl font-bold text-green-600 mt-2">1,234</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Barberman Aktif</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">24</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👨‍💼</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Rata-rata per Transaksi</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{formatCurrency(85000)}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Cards for Admin/Owner */}
      {(userRole === 'admin' || userRole === 'owner') && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pilih Cabang untuk Melihat Detail</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBranches.map((branch) => (
              <div 
                key={branch.id} 
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer group"
                onClick={() => onSwitchBranchView(branch.id, branch.name, 'kasir')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <span className="text-2xl">🏪</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{branch.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{branch.address}</p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform group-hover:-translate-y-0.5">
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
