
import React from 'react';
import { CreditCard, Plus, Edit3, Trash2, Search } from 'lucide-react';

interface PaymentMethodsPageProps {
  userRole: string | null;
  currentClientId: number | null;
}

const PaymentMethodsPage: React.FC<PaymentMethodsPageProps> = ({ userRole, currentClientId }) => {
  const paymentMethods = [
    { id: 1, name: 'Tunai', description: 'Pembayaran dengan uang tunai', status: 'Aktif' },
    { id: 2, name: 'Kartu Debit', description: 'Pembayaran dengan kartu debit', status: 'Aktif' },
    { id: 3, name: 'E-Wallet', description: 'Pembayaran dengan dompet digital', status: 'Aktif' },
    { id: 4, name: 'Transfer Bank', description: 'Transfer melalui rekening bank', status: 'Tidak Aktif' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-purple-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <CreditCard className="text-blue-200" size={40} />
              <div>
                <h1 className="text-3xl font-bold text-white">Metode Pembayaran</h1>
                <p className="text-blue-200">Kelola metode pembayaran yang tersedia</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2">
              <Plus size={20} />
              Tambah Metode
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari metode pembayaran..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl hover:border-blue-500 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="text-white" size={24} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    method.status === 'Aktif' 
                      ? 'bg-green-900 text-green-300 border border-green-700' 
                      : 'bg-red-900 text-red-300 border border-red-700'
                  }`}>
                    {method.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{method.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{method.description}</p>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <Edit3 size={16} />
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
