
import React, { useState } from 'react';
import { CreditCard, Plus, Edit3, Trash2, Search, DollarSign, Percent } from 'lucide-react';

interface PaymentMethodsPageProps {
  userRole: string | null;
}

const PaymentMethodsPage: React.FC<PaymentMethodsPageProps> = ({ userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const paymentMethods = [
    { 
      id: 1, 
      name: 'Tunai', 
      type: 'Cash', 
      isActive: true, 
      fee: 0, 
      description: 'Pembayaran dengan uang tunai'
    },
    { 
      id: 2, 
      name: 'Kartu Kredit/Debit', 
      type: 'Card', 
      isActive: true, 
      fee: 2.5, 
      description: 'Pembayaran menggunakan kartu kredit atau debit'
    },
    { 
      id: 3, 
      name: 'GoPay', 
      type: 'E-Wallet', 
      isActive: true, 
      fee: 1.5, 
      description: 'Pembayaran digital melalui GoPay'
    },
    { 
      id: 4, 
      name: 'OVO', 
      type: 'E-Wallet', 
      isActive: true, 
      fee: 1.5, 
      description: 'Pembayaran digital melalui OVO'
    },
    { 
      id: 5, 
      name: 'DANA', 
      type: 'E-Wallet', 
      isActive: false, 
      fee: 1.5, 
      description: 'Pembayaran digital melalui DANA'
    },
    { 
      id: 6, 
      name: 'Transfer Bank', 
      type: 'Bank Transfer', 
      isActive: true, 
      fee: 3.0, 
      description: 'Transfer melalui rekening bank'
    },
  ];

  const filteredMethods = paymentMethods.filter(method =>
    method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    method.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Cash':
        return <DollarSign className="text-green-400" size={24} />;
      case 'Card':
        return <CreditCard className="text-blue-400" size={24} />;
      case 'E-Wallet':
        return <CreditCard className="text-purple-400" size={24} />;
      case 'Bank Transfer':
        return <CreditCard className="text-orange-400" size={24} />;
      default:
        return <CreditCard className="text-gray-400" size={24} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Cash':
        return 'from-green-600 to-emerald-600';
      case 'Card':
        return 'from-blue-600 to-cyan-600';
      case 'E-Wallet':
        return 'from-purple-600 to-violet-600';
      case 'Bank Transfer':
        return 'from-orange-600 to-red-600';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <CreditCard size={32} />
              Metode Pembayaran
            </h1>
            <p className="text-gray-300">Kelola metode pembayaran yang tersedia</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2">
            <Plus size={20} />
            Tambah Metode
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari metode pembayaran..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMethods.map((method) => (
          <div key={method.id} className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden">
            <div className={`bg-gradient-to-r ${getTypeColor(method.type)} p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    {getTypeIcon(method.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{method.name}</h3>
                    <p className="text-sm opacity-90">{method.type}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  method.isActive 
                    ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
                    : 'bg-red-500/20 text-red-100 border border-red-400/30'
                }`}>
                  {method.isActive ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">{method.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Percent className="text-yellow-400" size={16} />
                    <span className="text-gray-400 text-sm">Biaya Admin:</span>
                  </div>
                  <span className={`font-bold ${method.fee > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {method.fee > 0 ? `${method.fee}%` : 'Gratis'}
                  </span>
                </div>

                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="text-center">
                    <p className="text-gray-400 text-xs mb-1">Status Layanan</p>
                    <p className={`font-semibold ${method.isActive ? 'text-green-400' : 'text-red-400'}`}>
                      {method.isActive ? 'Tersedia untuk transaksi' : 'Tidak tersedia'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <Edit3 size={16} />
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMethods.length === 0 && (
        <div className="bg-gray-800 rounded-2xl p-12 text-center shadow-xl border border-gray-700">
          <CreditCard className="mx-auto text-gray-500 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-400 mb-2">Tidak ada metode pembayaran ditemukan</h3>
          <p className="text-gray-500">Coba ubah kriteria pencarian Anda</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Metode</p>
              <p className="text-2xl font-bold text-white">{paymentMethods.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <CreditCard className="text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Metode Aktif</p>
              <p className="text-2xl font-bold text-green-400">{paymentMethods.filter(m => m.isActive).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <CreditCard className="text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tanpa Biaya</p>
              <p className="text-2xl font-bold text-yellow-400">{paymentMethods.filter(m => m.fee === 0).length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="text-yellow-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rata-rata Biaya</p>
              <p className="text-2xl font-bold text-orange-400">{(paymentMethods.reduce((acc, m) => acc + m.fee, 0) / paymentMethods.length).toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Percent className="text-orange-400" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
