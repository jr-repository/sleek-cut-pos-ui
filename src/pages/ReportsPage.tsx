
import React, { useState } from 'react';
import { FileText, Download, TrendingUp, DollarSign, Users, Calendar, Filter, BarChart3, PieChart, FileSpreadsheet, FileType } from 'lucide-react';

interface ReportsPageProps {
  userRole: string | null;
  userBranchId: number | null;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ userRole, userBranchId }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedReport, setSelectedReport] = useState('sales');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const branches = [
    { id: 'all', name: 'Semua Cabang' },
    { id: '1', name: 'Cabang Jakarta' },
    { id: '2', name: 'Cabang Bandung' },
    { id: '3', name: 'Cabang Surabaya' }
  ];

  const reportTypes = [
    { id: 'sales', label: 'Penjualan', icon: DollarSign },
    { id: 'expenses', label: 'Pengeluaran', icon: TrendingUp },
    { id: 'profit', label: 'Laba Rugi', icon: BarChart3 },
    { id: 'commission', label: 'Komisi Barberman', icon: Users }
  ];

  // Sample data
  const salesData = [
    { id: 1, date: '2024-06-12', customer: 'John Doe', barberman: 'Ahmad Rivaldi', service: 'Potong Rambut Premium', amount: 100000, branch: 'Jakarta' },
    { id: 2, date: '2024-06-12', customer: 'Jane Smith', barberman: 'Budi Santoso', service: 'Cukur Jenggot', amount: 50000, branch: 'Bandung' },
    { id: 3, date: '2024-06-11', customer: 'Bob Wilson', barberman: 'Charlie Wibowo', service: 'Hair Wash', amount: 25000, branch: 'Surabaya' }
  ];

  const expensesData = [
    { id: 1, date: '2024-06-12', description: 'Pembelian alat cukur', category: 'Peralatan', amount: 500000, branch: 'Jakarta' },
    { id: 2, date: '2024-06-11', description: 'Listrik bulan Juni', category: 'Utilitas', amount: 350000, branch: 'Semua' },
    { id: 3, date: '2024-06-10', description: 'Gaji karyawan', category: 'Gaji', amount: 2500000, branch: 'Semua' }
  ];

  const commissionData = [
    { id: 1, name: 'Ahmad Rivaldi', totalSales: 5500000, commission: 1100000, rate: 20, orders: 145, branch: 'Jakarta' },
    { id: 2, name: 'Budi Santoso', totalSales: 4200000, commission: 840000, rate: 20, orders: 132, branch: 'Bandung' },
    { id: 3, name: 'Charlie Wibowo', totalSales: 3800000, commission: 760000, rate: 20, orders: 118, branch: 'Surabaya' }
  ];

  const totalSales = salesData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expensesData.reduce((sum, item) => sum + item.amount, 0);
  const totalProfit = totalSales - totalExpenses;
  const totalCommission = commissionData.reduce((sum, item) => sum + item.commission, 0);

  const handleExport = (format: 'excel' | 'pdf') => {
    console.log(`Exporting ${selectedReport} as ${format}`);
    // Implementasi export akan ditambahkan nanti
  };

  const renderSalesReport = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">Data Penjualan</h3>
          <p className="text-gray-400 mt-1">Detail transaksi penjualan per periode</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 pb-3">Tanggal</th>
                  <th className="text-left text-gray-400 pb-3">Customer</th>
                  <th className="text-left text-gray-400 pb-3">Barberman</th>
                  <th className="text-left text-gray-400 pb-3">Layanan</th>
                  <th className="text-left text-gray-400 pb-3">Cabang</th>
                  <th className="text-right text-gray-400 pb-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700/50">
                    <td className="py-3 text-white">{item.date}</td>
                    <td className="py-3 text-white">{item.customer}</td>
                    <td className="py-3 text-white">{item.barberman}</td>
                    <td className="py-3 text-white">{item.service}</td>
                    <td className="py-3 text-white">{item.branch}</td>
                    <td className="py-3 text-right text-green-400 font-bold">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExpensesReport = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">Data Pengeluaran</h3>
          <p className="text-gray-400 mt-1">Detail pengeluaran operasional</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 pb-3">Tanggal</th>
                  <th className="text-left text-gray-400 pb-3">Deskripsi</th>
                  <th className="text-left text-gray-400 pb-3">Kategori</th>
                  <th className="text-left text-gray-400 pb-3">Cabang</th>
                  <th className="text-right text-gray-400 pb-3">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {expensesData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700/50">
                    <td className="py-3 text-white">{item.date}</td>
                    <td className="py-3 text-white">{item.description}</td>
                    <td className="py-3">
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg text-sm">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 text-white">{item.branch}</td>
                    <td className="py-3 text-right text-red-400 font-bold">-{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfitReport = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">Laporan Laba Rugi</h3>
          <p className="text-gray-400 mt-1">Ringkasan keuangan periode ini</p>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-green-400">Pendapatan</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Penjualan:</span>
                  <span className="text-white font-medium">{formatCurrency(totalSales)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between font-bold">
                  <span className="text-white">Total Pendapatan:</span>
                  <span className="text-green-400">{formatCurrency(totalSales)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-red-400">Pengeluaran</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Pengeluaran:</span>
                  <span className="text-white font-medium">{formatCurrency(totalExpenses)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between font-bold">
                  <span className="text-white">Total Pengeluaran:</span>
                  <span className="text-red-400">{formatCurrency(totalExpenses)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 mt-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-white">Laba Bersih:</span>
              <span className={totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}>
                {formatCurrency(totalProfit)}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Margin: {totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommissionReport = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">Komisi Barberman</h3>
          <p className="text-gray-400 mt-1">Detail komisi per barberman</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 pb-3">Nama Barberman</th>
                  <th className="text-left text-gray-400 pb-3">Cabang</th>
                  <th className="text-right text-gray-400 pb-3">Total Penjualan</th>
                  <th className="text-center text-gray-400 pb-3">Rate (%)</th>
                  <th className="text-right text-gray-400 pb-3">Komisi</th>
                  <th className="text-center text-gray-400 pb-3">Orders</th>
                </tr>
              </thead>
              <tbody>
                {commissionData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700/50">
                    <td className="py-3 text-white font-medium">{item.name}</td>
                    <td className="py-3 text-white">{item.branch}</td>
                    <td className="py-3 text-right text-white">{formatCurrency(item.totalSales)}</td>
                    <td className="py-3 text-center">
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg text-sm">
                        {item.rate}%
                      </span>
                    </td>
                    <td className="py-3 text-right text-green-400 font-bold">{formatCurrency(item.commission)}</td>
                    <td className="py-3 text-center text-white">{item.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'sales':
        return renderSalesReport();
      case 'expenses':
        return renderExpensesReport();
      case 'profit':
        return renderProfitReport();
      case 'commission':
        return renderCommissionReport();
      default:
        return renderSalesReport();
    }
  };

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
          
          {/* Export Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => handleExport('excel')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FileSpreadsheet size={18} />
              Export Excel
            </button>
            <button 
              onClick={() => handleExport('pdf')}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FileType size={18} />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <span className="text-white font-medium">Filter:</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {/* Branch Filter */}
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>

            {/* Period Filter */}
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Hari Ini</option>
              <option value="week">Minggu Ini</option>
              <option value="month">Bulan Ini</option>
              <option value="year">Tahun Ini</option>
            </select>

            <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              Terapkan Filter
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Penjualan</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(totalSales)}</p>
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
              <p className="text-gray-400 text-sm">Total Pengeluaran</p>
              <p className="text-2xl font-bold text-red-400">{formatCurrency(totalExpenses)}</p>
              <p className="text-red-400 text-sm">+5% dari kemarin</p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-red-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Laba Bersih</p>
              <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(totalProfit)}
              </p>
              <p className="text-blue-400 text-sm">+18% dari kemarin</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Komisi</p>
              <p className="text-2xl font-bold text-purple-400">{formatCurrency(totalCommission)}</p>
              <p className="text-purple-400 text-sm">+7% dari kemarin</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Users className="text-purple-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
        <div className="border-b border-gray-700">
          <div className="flex flex-wrap">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors ${
                    selectedReport === report.id
                      ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  {report.label}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="p-6">
          {renderReportContent()}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
