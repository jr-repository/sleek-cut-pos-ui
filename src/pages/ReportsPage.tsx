
import React from 'react';

interface ReportsPageProps {
  userRole: string | null;
  userBranchId: number | null;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ userRole, userBranchId }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Laporan</h1>
          <p className="text-muted-foreground mt-2">Analisis performa dan laporan keuangan</p>
        </div>
        <button className="gradient-primary text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Export PDF
        </button>
      </div>

      {/* Summary Cards */}
      <div className="responsive-grid">
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Pendapatan Hari Ini</h3>
              <p className="text-3xl font-bold text-gradient mt-2">{formatCurrency(2500000)}</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Transaksi Hari Ini</h3>
              <p className="text-3xl font-bold text-gradient mt-2">45</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Pendapatan Bulan Ini</h3>
              <p className="text-3xl font-bold text-gradient mt-2">{formatCurrency(75000000)}</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Total Pelanggan</h3>
              <p className="text-3xl font-bold text-gradient mt-2">1,234</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Filters */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Filter Laporan</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Periode</label>
            <select className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent">
              <option>Hari Ini</option>
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
              <option>Custom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Jenis Laporan</label>
            <select className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent">
              <option>Semua Laporan</option>
              <option>Penjualan</option>
              <option>Keuangan</option>
              <option>Pelanggan</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full gradient-primary text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
              Generate Laporan
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-semibold text-foreground">Transaksi Terbaru</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ID Transaksi</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Tanggal</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Layanan</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Barberman</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Total</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { id: 'TRX001', date: '2024-06-11', service: 'Potong Rambut Premium', barber: 'Ahmad', total: 50000, status: 'Selesai' },
                { id: 'TRX002', date: '2024-06-11', service: 'Cukur Jenggot', barber: 'Budi', total: 15000, status: 'Selesai' },
                { id: 'TRX003', date: '2024-06-11', service: 'Potong Rambut Regular', barber: 'Charlie', total: 25000, status: 'Selesai' },
              ].map((transaction) => (
                <tr key={transaction.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{transaction.id}</td>
                  <td className="px-6 py-4 text-muted-foreground">{transaction.date}</td>
                  <td className="px-6 py-4 text-foreground">{transaction.service}</td>
                  <td className="px-6 py-4 text-muted-foreground">{transaction.barber}</td>
                  <td className="px-6 py-4 text-foreground font-semibold">{formatCurrency(transaction.total)}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {transaction.status}
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

export default ReportsPage;
