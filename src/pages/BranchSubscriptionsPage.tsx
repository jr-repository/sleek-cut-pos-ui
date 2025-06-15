
import React from 'react';
import { Calendar, Building2, CreditCard, Search, Filter } from 'lucide-react';

interface BranchSubscriptionsPageProps {
  userRole: string | null;
  currentClientId: number | null;
}

const BranchSubscriptionsPage: React.FC<BranchSubscriptionsPageProps> = ({ userRole, currentClientId }) => {
  const subscriptions = [
    { 
      id: 1, 
      clientName: 'Barbershop Jakarta', 
      branchName: 'Cabang Utama',
      plan: 'Premium',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Active',
      amount: 2000000
    },
    { 
      id: 2, 
      clientName: 'Salon Bandung', 
      branchName: 'Cabang Mall',
      plan: 'Standard',
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      status: 'Active',
      amount: 1000000
    },
    { 
      id: 3, 
      clientName: 'Cut & Style Surabaya', 
      branchName: 'Cabang Timur',
      plan: 'Premium',
      startDate: '2023-12-01',
      endDate: '2024-11-30',
      status: 'Expired',
      amount: 2000000
    },
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
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-800 to-cyan-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <Calendar className="text-teal-200" size={40} />
          <div>
            <h1 className="text-3xl font-bold text-white">Langganan Cabang</h1>
            <p className="text-teal-200">Monitor status langganan setiap cabang client</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Langganan</p>
              <p className="text-3xl font-bold text-gray-800">{subscriptions.length}</p>
            </div>
            <Calendar className="text-teal-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active</p>
              <p className="text-3xl font-bold text-green-600">{subscriptions.filter(s => s.status === 'Active').length}</p>
            </div>
            <Building2 className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Revenue Bulanan</p>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(subscriptions.reduce((sum, sub) => sum + sub.amount, 0))}</p>
            </div>
            <CreditCard className="text-blue-500" size={32} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari langganan..."
              className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
              <option>Semua Status</option>
              <option>Active</option>
              <option>Expired</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Daftar Langganan</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Client</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Cabang</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Paket</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Mulai</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Berakhir</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Harga</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscriptions.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">{subscription.clientName}</td>
                  <td className="px-6 py-4 text-gray-900">{subscription.branchName}</td>
                  <td className="px-6 py-4 text-gray-600">{subscription.plan}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(subscription.startDate).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(subscription.endDate).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">{formatCurrency(subscription.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      subscription.status === 'Active' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {subscription.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BranchSubscriptionsPage;
