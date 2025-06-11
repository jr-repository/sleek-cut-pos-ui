
import React from 'react';

interface ExpensesPageProps {
  userRole: string | null;
  userBranchId: number | null;
}

const ExpensesPage: React.FC<ExpensesPageProps> = ({ userRole, userBranchId }) => {
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
        <h1 className="text-3xl font-bold text-gray-900">Pengeluaran</h1>
        <p className="text-gray-600">Kelola pengeluaran dan biaya operasional</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Daftar Pengeluaran</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Tambah Pengeluaran
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Deskripsi</th>
                <th className="px-4 py-2 text-left">Kategori</th>
                <th className="px-4 py-2 text-left">Jumlah</th>
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, description: 'Listrik Bulanan', category: 'Utilitas', amount: 1500000, date: '2024-06-01', status: 'Dibayar' },
                { id: 2, description: 'Sewa Gedung', category: 'Sewa', amount: 8000000, date: '2024-06-01', status: 'Dibayar' },
                { id: 3, description: 'Gaji Karyawan', category: 'Gaji', amount: 15000000, date: '2024-06-01', status: 'Pending' },
              ].map((expense) => (
                <tr key={expense.id} className="border-b">
                  <td className="px-4 py-2">{expense.description}</td>
                  <td className="px-4 py-2">{expense.category}</td>
                  <td className="px-4 py-2">{formatCurrency(expense.amount)}</td>
                  <td className="px-4 py-2">{expense.date}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      expense.status === 'Dibayar' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Hapus</button>
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
