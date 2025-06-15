
import React, { useState } from 'react';
import { DollarSign, Plus, Edit3, Trash2, Search, Calendar, TrendingDown } from 'lucide-react';

interface ExpensesPageProps {
  userRole: string | null;
  userBranchId: number | null;
}

const ExpensesPage: React.FC<ExpensesPageProps> = ({ userRole, userBranchId }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const expenses = [
    { 
      id: 1, 
      description: 'Pembelian Peralatan Gunting', 
      amount: 500000, 
      category: 'Peralatan', 
      date: '2024-01-15',
      status: 'Approved'
    },
    { 
      id: 2, 
      description: 'Tagihan Listrik Bulan Januari', 
      amount: 750000, 
      category: 'Utilitas', 
      date: '2024-01-10',
      status: 'Paid'
    },
    { 
      id: 3, 
      description: 'Restok Produk Hair Care', 
      amount: 1250000, 
      category: 'Inventory', 
      date: '2024-01-08',
      status: 'Paid'
    },
    { 
      id: 4, 
      description: 'Sewa Tempat Bulanan', 
      amount: 5000000, 
      category: 'Sewa', 
      date: '2024-01-01',
      status: 'Paid'
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <DollarSign size={32} />
              Manajemen Pengeluaran
            </h1>
            <p className="text-gray-300">Kelola dan monitor pengeluaran barbershop</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2">
            <Plus size={20} />
            Tambah Pengeluaran
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Pengeluaran</p>
              <p className="text-2xl font-bold text-red-400">{formatCurrency(totalExpenses)}</p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <TrendingDown className="text-red-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Transaksi</p>
              <p className="text-2xl font-bold text-white">{expenses.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rata-rata per Transaksi</p>
              <p className="text-2xl font-bold text-yellow-400">{formatCurrency(totalExpenses / expenses.length)}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="text-yellow-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari pengeluaran..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Expenses List */}
      <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Daftar Pengeluaran</h3>
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div key={expense.id} className="bg-gray-700 rounded-xl p-4 border border-gray-600 hover:border-blue-500 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2">{expense.description}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-gray-400">
                        <Calendar size={16} />
                        {new Date(expense.date).toLocaleDateString('id-ID')}
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-500/30">
                        {expense.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs border ${
                        expense.status === 'Paid' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }`}>
                        {expense.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-400">{formatCurrency(expense.amount)}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white p-2 rounded-lg transition-all duration-200">
                        <Edit3 size={16} />
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {filteredExpenses.length === 0 && (
        <div className="bg-gray-800 rounded-2xl p-12 text-center shadow-xl border border-gray-700">
          <DollarSign className="mx-auto text-gray-500 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-400 mb-2">Tidak ada pengeluaran ditemukan</h3>
          <p className="text-gray-500">Coba ubah kriteria pencarian Anda</p>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
