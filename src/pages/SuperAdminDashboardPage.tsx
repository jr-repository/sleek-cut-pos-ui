
import React from 'react';

interface SuperAdminDashboardPageProps {
  userRole: string | null;
  currentClientId: number | null;
  onSwitchView: (targetRole: string, targetClientId?: number | null, targetBranchId?: number | null, targetBranchName?: string | null, targetUsernamePrefix?: string | null) => void;
}

const SuperAdminDashboardPage: React.FC<SuperAdminDashboardPageProps> = ({ onSwitchView }) => {
  const mockClients = [
    { id: 1, name: 'Barbershop Premium Jakarta', status: 'Aktif' },
    { id: 2, name: 'Hair Studio Bandung', status: 'Aktif' },
    { id: 3, name: 'Gentleman Barber Surabaya', status: 'Tidak Aktif' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Super Admin Dashboard</h1>
        <p className="text-gray-400">Kelola semua client dan sistem POS</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Client</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">24</p>
            </div>
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏢</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Cabang</p>
              <p className="text-3xl font-bold text-green-400 mt-2">156</p>
            </div>
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏪</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Pendapatan Bulanan</p>
              <p className="text-3xl font-bold text-violet-400 mt-2">$50K</p>
            </div>
            <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Client Aktif</p>
              <p className="text-3xl font-bold text-yellow-400 mt-2">22</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Client Cards */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-6">Pilih Client untuk Lihat Detail</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockClients.map((client) => (
            <div 
              key={client.id} 
              className="bg-gray-700 border border-gray-600 rounded-xl p-6 hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
              onClick={() => onSwitchView('admin', client.id, null, client.name, '(Lihat)')}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                  <span className="text-2xl">🏢</span>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  client.status === 'Aktif' 
                    ? 'bg-green-900/30 text-green-400' 
                    : 'bg-red-900/30 text-red-400'
                }`}>
                  {client.status}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{client.name}</h3>
              <button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform group-hover:-translate-y-0.5">
                Lihat Client
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboardPage;
