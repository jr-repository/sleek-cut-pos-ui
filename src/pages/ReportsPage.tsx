
import React, { useState } from 'react';
import { FileText, Download, TrendingUp, DollarSign, Users, Calendar } from 'lucide-react';

interface ReportsPageProps {
  userRole: string | null;
  userBranchId: number | null;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ userRole, userBranchId }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const reportTypes = [
    {
      title: 'Laporan Harian',
      description: 'Ringkasan transaksi dan pendapatan hari ini',
      icon: Calendar,
      color: 'from-blue-600 to-violet-600',
      data: { revenue: 2500000, transactions: 15, customers: 12 }
    },
    {
      title: 'Laporan Mingguan',
      description: 'Performa selama 7 hari terakhir',
      icon: TrendingUp,
      color: 'from-green-600 to-emerald-600',
      data: { revenue: 15750000, transactions: 95, customers: 78 }
    },
    {
      title: 'Laporan Bulanan',
      description: 'Ringkasan performa bulan ini',
      icon: FileText,
      color: 'from-purple-600 to-pink-600',
      data: { revenue: 45250000, transactions: 285, customers: 198 }
    },
    {
      title: 'Laporan Barberman',
      description: 'Performa individual barberman',
      icon: Users,
      color: 'from-orange-600 to-red-600',
      data: { topBarber: 'Ahmad Rivaldi', revenue: 8500000, services: 85 }
    }
  ];

  const topServices = [
    { name: 'Potong Rambut Premium', revenue: 5000000, count: 50 },
    { name: 'Potong Rambut Regular', revenue: 3750000, count: 75 },
    { name: 'Cukur Jenggot', revenue: 1750000, count: 50 },
    { name: 'Hair Wash', revenue: 1250000, count: 50 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <FileText size={32} />
              Laporan & Analisis
            </h1>
            <p className="text-gray-300">Monitor performa dan analisis bisnis barbershop</p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Hari Ini</option>
              <option value="week">Minggu Ini</option>
              <option value="month">Bulan Ini</option>
              <option value="year">Tahun Ini</option>
            </select>
            <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2">
              <Download size={20} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Pendapatan</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(2500000)}</p>
              <p className="text-green-400 text-sm">+12% dari kemarin</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Transaksi</p>
              <p className="text-2xl font-bold text-blue-400">15</p>
              <p className="text-blue-400 text-sm">+8% dari kemarin</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <FileText className="text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rata-rata per Transaksi</p>
              <p className="text-2xl font-bold text-yellow-400">{formatCurrency(166667)}</p>
              <p className="text-yellow-400 text-sm">+5% dari kemarin</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-yellow-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report, index) => {
          const Icon = report.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-all duration-300">
              <div className={`bg-gradient-to-r ${report.color} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{report.title}</h3>
                    <p className="text-sm opacity-90">{report.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {report.title === 'Laporan Barberman' ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Top Performer:</span>
                        <span className="text-white font-medium">{report.data.topBarber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pendapatan:</span>
                        <span className="text-green-400 font-bold">{formatCurrency(report.data.revenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Layanan:</span>
                        <span className="text-blue-400 font-bold">{report.data.services}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pendapatan:</span>
                        <span className="text-green-400 font-bold">{formatCurrency(report.data.revenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Transaksi:</span>
                        <span className="text-blue-400 font-bold">{report.data.transactions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pelanggan:</span>
                        <span className="text-purple-400 font-bold">{report.data.customers}</span>
                      </div>
                    </div>
                  )}
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                  <FileText size={18} />
                  Lihat Detail
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Services */}
      <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">Layanan Terpopuler</h3>
          <p className="text-gray-400 mt-1">Berdasarkan pendapatan dan jumlah transaksi</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-xl border border-gray-600">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400 font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{service.name}</h4>
                    <p className="text-sm text-gray-400">{service.count} transaksi</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-400">{formatCurrency(service.revenue)}</p>
                  <p className="text-xs text-gray-400">Total pendapatan</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
