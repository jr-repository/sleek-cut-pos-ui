
import React from 'react';

interface BarbermanPageProps {
  userRole: string | null;
  userBranchId: number | null;
}

const BarbermanPage: React.FC<BarbermanPageProps> = ({ userRole, userBranchId }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Manajemen Barberman</h1>
          <p className="text-muted-foreground mt-2">Kelola data barberman dan jadwal kerja</p>
        </div>
        <button className="gradient-primary text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Tambah Barberman
        </button>
      </div>

      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-semibold text-foreground">Daftar Barberman</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Nama</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Email</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Telepon</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4 text-foreground font-medium">Ahmad Rivaldi</td>
                <td className="px-6 py-4 text-muted-foreground">ahmad@barbershop.com</td>
                <td className="px-6 py-4 text-muted-foreground">081234567890</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Aktif
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BarbermanPage;
