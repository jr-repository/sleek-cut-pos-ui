
import React from 'react';

interface DashboardPageProps {
  userRole: string | null;
  userBranchId: number | null;
  onSwitchBranchView: (branchId: number | null, branchName: string | null, roleOverride: string | null) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ userRole, userBranchId, onSwitchBranchView }) => {
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Ringkasan performa barbershop Anda</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pendapatan</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(105000000)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transaksi</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Barberman Aktif</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rata-rata per Transaksi</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(85000)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Cards for Admin/Owner */}
      {(userRole === 'admin' || userRole === 'owner') && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pilih Cabang untuk Melihat Detail</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockBranches.map((branch) => (
              <div 
                key={branch.id} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onSwitchBranchView(branch.id, branch.name, 'kasir')}
              >
                <h3 className="font-semibold text-gray-900">{branch.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{branch.address}</p>
                <button className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150">
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
