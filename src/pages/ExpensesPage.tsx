
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Pengeluaran</h1>
          <p className="text-muted-foreground mt-2">Kelola pengeluaran dan biaya operasional</p>
        </div>
        <button className="gradient-primary text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Tambah Pengeluaran
        </button>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-semibold text-foreground">Daftar Pengeluaran</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Deskripsi</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Kategori</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Jumlah</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Tanggal</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { id: 1, description: 'Listrik Bulanan', category: 'Utilitas', amount: 1500000, date: '2024-06-01', status: 'Dibayar' },
                { id: 2, description: 'Sewa Gedung', category: 'Sewa', amount: 8000000, date: '2024-06-01', status: 'Dibayar' },
                { id: 3, description: 'Gaji Karyawan', category: 'Gaji', amount: 15000000, date: '2024-06-01', status: 'Pending' },
              ].map((expense) => (
                <tr key={expense.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{expense.description}</td>
                  <td className="px-6 py-4 text-muted-foreground">{expense.category}</td>
                  <td className="px-6 py-4 text-foreground font-semibold">{formatCurrency(expense.amount)}</td>
                  <td className="px-6 py-4 text-muted-foreground">{expense.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      expense.status === 'Dibayar' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                        Edit
                      </button>
                      <button className="text-destructive hover:text-destructive/80 font-medium transition-colors">
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
