
import React from 'react';

interface ReportsPageProps {
  userRole: string | null;
  userBranchId: number | null;
  currentClientId: number | null;
}

const ReportsPage: React.FC<ReportsPageProps> = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Laporan</h1>
        <p className="text-gray-400 mt-2">Analisis performa dan laporan keuangan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 1, title: 'Laporan Penjualan', description: 'Ringkasan transaksi harian, mingguan, dan bulanan', icon: '📊' },
          { id: 2, title: 'Laporan Keuangan', description: 'Pendapatan, pengeluaran, dan profit', icon: '💰' },
          { id: 3, title: 'Laporan Barberman', description: 'Performa dan produktivitas barberman', icon: '👨‍💼' },
          { id: 4, title: 'Laporan Produk', description: 'Penjualan produk dan layanan terpopuler', icon: '📦' },
          { id: 5, title: 'Laporan Customer', description: 'Data pelanggan dan tingkat kepuasan', icon: '👥' },
          { id: 6, title: 'Laporan Inventori', description: 'Status stok dan kebutuhan produk', icon: '📋' },
        ].map((report) => (
          <div key={report.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-blue-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">{report.icon}</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{report.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{report.description}</p>
            <button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
              Lihat Laporan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
