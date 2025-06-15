
import React from 'react';
import { Crown, Building2, CreditCard, Receipt, TrendingUp, Users, Calendar } from 'lucide-react';

interface SuperAdminDashboardPageProps {
  userRole: string | null;
  currentClientId: number | null;
  onSwitchView: (targetRole: string, targetClientId?: number | null, targetBranchId?: number | null, targetBranchName?: string | null, targetUsernamePrefix?: string | null) => void;
}

const SuperAdminDashboardPage: React.FC<SuperAdminDashboardPageProps> = ({ 
  userRole, 
  currentClientId, 
  onSwitchView 
}) => {
  const mockClients = [
    { id: 1, name: 'Barbershop Jakarta', branches: 5, status: 'Active', revenue: 150000000 },
    { id: 2, name: 'Salon Bandung', branches: 3, status: 'Active', revenue: 95000000 },
    { id: 3, name: 'Cut & Style Surabaya', branches: 7, status: 'Active', revenue: 180000000 },
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
      <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <Crown className="text-yellow-400" size={40} />
          <div>
            <h1 className="text-3xl font-bold text-white">Super Admin Dashboard</h1>
            <p className="text-purple-200">Kelola seluruh sistem POS barbershop</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Client</p>
              <p className="text-3xl font-bold text-gray-800">{mockClients.length}</p>
            </div>
            <Building2 className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Cabang</p>
              <p className="text-3xl font-bold text-gray-800">{mockClients.reduce((sum, client) => sum + client.branches, 0)}</p>
            </div>
            <Users className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Revenue Total</p>
              <p className="text-3xl font-bold text-gray-800">{formatCurrency(mockClients.reduce((sum, client) => sum + client.revenue, 0))}</p>
            </div>
            <TrendingUp className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Clients</p>
              <p className="text-3xl font-bold text-gray-800">{mockClients.filter(c => c.status === 'Active').length}</p>
            </div>
            <Calendar className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Client Management */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Pilih Client untuk Kelola</h2>
          <p className="text-gray-600">Klik pada client untuk masuk ke mode admin client</p>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClients.map((client) => (
            <div 
              key={client.id} 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer group"
              onClick={() => onSwitchView('admin', client.id, null, client.name, '(Kelola)')}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Building2 className="text-white" size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  client.status === 'Active' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {client.status}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{client.name}</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>Cabang: {client.branches}</p>
                <p>Revenue: {formatCurrency(client.revenue)}</p>
              </div>
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform group-hover:-translate-y-0.5">
                Kelola Client
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboardPage;
