
import React from 'react';

interface BranchesPageProps {
  userRole: string | null;
}

const BranchesPage: React.FC<BranchesPageProps> = ({ userRole }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Manajemen Cabang</h1>
          <p className="text-muted-foreground mt-2">Kelola data cabang barbershop</p>
        </div>
        <button className="gradient-primary text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Tambah Cabang
        </button>
      </div>

      <div className="responsive-grid">
        {[
          { id: 1, name: 'Cabang Utama', address: 'Jl. Sudirman No. 123, Jakarta', status: 'Aktif' },
          { id: 2, name: 'Cabang Mall', address: 'Mall Plaza, Lt. 2, Bandung', status: 'Aktif' },
          { id: 3, name: 'Cabang Timur', address: 'Jl. Ahmad Yani No. 456, Surabaya', status: 'Aktif' },
        ].map((branch) => (
          <div key={branch.id} className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏪</span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {branch.status}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{branch.name}</h3>
            <p className="text-muted-foreground text-sm mb-4">{branch.address}</p>
            <div className="flex gap-2">
              <button className="flex-1 gradient-primary text-white font-medium py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                Edit
              </button>
              <button className="px-4 py-2 bg-destructive text-destructive-foreground font-medium rounded-lg shadow-lg transition-all duration-300 hover:bg-destructive/90">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchesPage;
