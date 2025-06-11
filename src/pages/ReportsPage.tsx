
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Laporan</h1>
        <p className="text-gray-600">Analisis performa dan laporan keuangan</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Pendapatan Hari Ini</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(2500000)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Transaksi Hari Ini</h3>
          <p className="text-2xl font-bold text-gray-900">45</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Pendapatan Bulan Ini</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(75000000)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Total Pelanggan</h3>
          <p className="text-2xl font-bold text-gray-900">1,234</p>
        </div>
      </div>

      {/* Report Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Filter Laporan</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Periode</label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option>Hari Ini</option>
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
              <option>Custom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Laporan</label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option>Semua Laporan</option>
              <option>Penjualan</option>
              <option>Keuangan</option>
              <option>Pelanggan</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Generate Laporan
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Transaksi Terbaru</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">ID Transaksi</th>
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Layanan</th>
                <th className="px-4 py-2 text-left">Barberman</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'TRX001', date: '2024-06-11', service: 'Potong Rambut Premium', barber: 'Ahmad', total: 50000, status: 'Selesai' },
                { id: 'TRX002', date: '2024-06-11', service: 'Cukur Jenggot', barber: 'Budi', total: 15000, status: 'Selesai' },
                { id: 'TRX003', date: '2024-06-11', service: 'Potong Rambut Regular', barber: 'Charlie', total: 25000, status: 'Selesai' },
              ].map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="px-4 py-2">{transaction.id}</td>
                  <td className="px-4 py-2">{transaction.date}</td>
                  <td className="px-4 py-2">{transaction.service}</td>
                  <td className="px-4 py-2">{transaction.barber}</td>
                  <td className="px-4 py-2">{formatCurrency(transaction.total)}</td>
                  <td className="px-4 py-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
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
