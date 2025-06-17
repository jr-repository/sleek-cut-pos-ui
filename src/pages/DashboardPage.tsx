
import React from 'react';
import { TrendingUp, Users, DollarSign, ShoppingBag, Calendar, BarChart3 } from 'lucide-react';

interface DashboardPageProps {
  userRole: string | null;
  userBranchId: number | null;
  onSwitchBranchView?: (branchId: number | null, branchName: string | null, roleOverride: string | null) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ userRole, userBranchId, onSwitchBranchView }) => {
  const mockBranches = [
    { id: 1, name: 'Cabang Utama', address: 'Jl. Sudirman No. 123, Jakarta', revenue: 25000000, customers: 145 },
    { id: 2, name: 'Cabang Mall', address: 'Mall Plaza, Lt. 2, Bandung', revenue: 18500000, customers: 120 },
    { id: 3, name: 'Cabang Timur', address: 'Jl. Ahmad Yani No. 456, Surabaya', revenue: 22000000, customers: 135 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalRevenue = mockBranches.reduce((sum, branch) => sum + branch.revenue, 0);
  const totalCustomers = mockBranches.reduce((sum, branch) => sum + branch.customers, 0);
  const avgPerTransaction = totalRevenue / totalCustomers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <BarChart3 size={32} />
              Dashboard Barbershop
            </h1>
            <p className="text-gray-300">Ringkasan performa dan analisis bisnis</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar size={16} />
            {new Date().toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Pendapatan</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(totalRevenue)}</p>
              <p className="text-green-400 text-sm">+12% dari bulan lalu</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Pelanggan</p>
              <p className="text-2xl font-bold text-blue-400">{totalCustomers}</p>
              <p className="text-blue-400 text-sm">+8% dari bulan lalu</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Users className="text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rata-rata Transaksi</p>
              <p className="text-2xl font-bold text-purple-400">{formatCurrency(avgPerTransaction)}</p>
              <p className="text-purple-400 text-sm">+5% dari bulan lalu</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-purple-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Layanan Aktif</p>
              <p className="text-2xl font-bold text-orange-400">24</p>
              <p className="text-orange-400 text-sm">+2 layanan baru</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <ShoppingBag className="text-orange-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Branch Cards for Admin/Owner */}
      {(userRole === 'admin' || userRole === 'owner') && onSwitchBranchView && (
        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-2">Pilih Cabang untuk Melihat Detail</h2>
            <p className="text-gray-400">Klik pada salah satu cabang untuk melihat detail performa</p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBranches.map((branch) => (
                <div 
                  key={branch.id} 
                  className="bg-gray-700 border border-gray-600 rounded-xl p-6 hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => onSwitchBranchView(branch.id, branch.name, 'kasir')}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <span className="text-2xl">🏪</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{branch.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{branch.address}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Pendapatan:</span>
                      <span className="text-green-400 font-medium">{formatCurrency(branch.revenue)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Pelanggan:</span>
                      <span className="text-blue-400 font-medium">{branch.customers}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Lihat Detail Cabang
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions for Kasir */}
      {userRole === 'kasir' && (
        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-2">Aksi Cepat</h2>
            <p className="text-gray-400">Fitur yang sering digunakan untuk memudahkan pekerjaan</p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                <ShoppingBag className="mx-auto mb-2" size={24} />
                Transaksi Baru
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                <Users className="mx-auto mb-2" size={24} />
                Data Pelanggan
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
                <TrendingUp className="mx-auto mb-2" size={24} />
                Laporan Harian
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
