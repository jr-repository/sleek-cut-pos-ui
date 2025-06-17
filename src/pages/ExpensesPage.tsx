
import React from 'react';

interface ExpensesPageProps {
  userRole: string | null;
  userBranchId: number | null;
  currentClientId: number | null;
}

const ExpensesPage: React.FC<ExpensesPageProps> = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Pengeluaran</h1>
          <p className="text-gray-400 mt-2">Kelola data pengeluaran barbershop</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Tambah Pengeluaran
        </button>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold text-white">Daftar Pengeluaran</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Tanggal</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Kategori</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Deskripsi</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Jumlah</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {[
                { date: '2024-01-15', category: 'Peralatan', description: 'Pembelian Gunting Baru', amount: 500000 },
                { date: '2024-01-14', category: 'Operasional', description: 'Listrik Bulan Januari', amount: 250000 },
                { date: '2024-01-13', category: 'Produk', description: 'Stok Pomade & Shampoo', amount: 750000 },
              ].map((expense, index) => (
                <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{expense.date}</td>
                  <td className="px-6 py-4 text-gray-300">{expense.category}</td>
                  <td className="px-6 py-4 text-gray-300">{expense.description}</td>
                  <td className="px-6 py-4 text-red-400 font-semibold">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(expense.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-300 font-medium transition-colors">
                        Hapus
                      </button>
                    </div>
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

export default ExpensesPage;
