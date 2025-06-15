
import React, { useState } from 'react';
import { FileText, Filter, Download, Calendar, TrendingUp, DollarSign, Users, Target } from 'lucide-react';

interface ReportsPageProps {
  userRole: string | null;
  userBranchId: number | null;
  currentClientId: number | null;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ userRole, userBranchId, currentClientId }) => {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  const reportTypes = [
    { id: 'sales', name: 'Penjualan', icon: TrendingUp, color: 'blue' },
    { id: 'expenses', name: 'Pengeluaran', icon: DollarSign, color: 'red' },
    { id: 'profit', name: 'Laba Rugi', icon: Target, color: 'green' },
    { id: 'commission', name: 'Komisi Barberman', icon: Users, color: 'purple' },
  ];

  const statsData = [
    { title: 'Total Penjualan', value: 'Rp 15.250.000', change: '+12%', icon: TrendingUp, color: 'blue' },
    { title: 'Total Pengeluaran', value: 'Rp 8.750.000', change: '+5%', icon: DollarSign, color: 'red' },
    { title: 'Laba Bersih', value: 'Rp 6.500.000', change: '+18%', icon: Target, color: 'green' },
    { title: 'Komisi Barberman', value: 'Rp 2.250.000', change: '+8%', icon: Users, color: 'purple' },
  ];

  const sampleData = [
    { id: 1, date: '2024-01-15', description: 'Layanan Potong Rambut', amount: 'Rp 50.000', type: 'Penjualan' },
    { id: 2, date: '2024-01-15', description: 'Pembelian Produk Rambut', amount: 'Rp 150.000', type: 'Pengeluaran' },
    { id: 3, date: '2024-01-14', description: 'Layanan Styling', amount: 'Rp 75.000', type: 'Penjualan' },
    { id: 4, date: '2024-01-14', description: 'Komisi Ahmad', amount: 'Rp 25.000', type: 'Komisi' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-purple-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <FileText className="text-blue-200" size={40} />
              <div>
                <h1 className="text-3xl font-bold text-white">Laporan</h1>
                <p className="text-blue-200">Analisis data penjualan dan keuangan</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2">
                <Download size={18} />
                Excel
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2">
                <Download size={18} />
                PDF
              </button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Jenis Laporan</label>
              <select 
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {reportTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cabang</label>
              <select 
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Cabang</option>
                <option value="1">Cabang Utama</option>
                <option value="2">Cabang Mall</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Periode</label>
              <select 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
                <option value="year">Tahun Ini</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${stat.color}-600 rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Data Table */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">Data {reportTypes.find(r => r.id === selectedReport)?.name}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left py-3 px-6 text-gray-300 font-medium">Tanggal</th>
                  <th className="text-left py-3 px-6 text-gray-300 font-medium">Deskripsi</th>
                  <th className="text-left py-3 px-6 text-gray-300 font-medium">Tipe</th>
                  <th className="text-right py-3 px-6 text-gray-300 font-medium">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                    <td className="py-3 px-6 text-gray-300">{item.date}</td>
                    <td className="py-3 px-6 text-white">{item.description}</td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.type === 'Penjualan' ? 'bg-green-900 text-green-300' :
                        item.type === 'Pengeluaran' ? 'bg-red-900 text-red-300' :
                        'bg-purple-900 text-purple-300'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-right font-semibold text-white">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
