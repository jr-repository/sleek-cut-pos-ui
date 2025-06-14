
import React from 'react';

interface DashboardPageProps {
  userRole: string | null;
  userBranchId: number | null;
  onSwitchBranchView: (branchId: number | null, branchName: string | null, roleOverride: string | null) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ userRole, userBranchId, onSwitchBranchView }) => {
  const mockBranches = [
    { id: 1, name: 'Cabang Utama', address: 'Jl. Sudirman No. 123, Jakarta' },
    { id: 2, name: 'Cabang Mall', address: 'Mall Plaza, Lt. 2, Bandung' },
    { id: 3, name: 'Cabang Timur', address: 'Jl. Ahmad Yani No. 456, Surabaya' },
  ];

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
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Ringkasan performa barbershop Anda</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="responsive-grid">
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Pendapatan</p>
              <p className="text-3xl font-bold text-gradient mt-2">{formatCurrency(105000000)}</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Transaksi</p>
              <p className="text-3xl font-bold text-gradient mt-2">1,234</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Barberman Aktif</p>
              <p className="text-3xl font-bold text-gradient mt-2">24</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👨‍💼</span>
            </div>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rata-rata per Transaksi</p>
              <p className="text-3xl font-bold text-gradient mt-2">{formatCurrency(85000)}</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Cards for Admin/Owner */}
      {(userRole === 'admin' || userRole === 'owner') && (
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Pilih Cabang untuk Melihat Detail</h2>
          <div className="branch-grid">
            {mockBranches.map((branch) => (
              <div 
                key={branch.id} 
                className="bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                onClick={() => onSwitchBranchView(branch.id, branch.name, 'kasir')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <span className="text-2xl">🏪</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{branch.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{branch.address}</p>
                <button className="w-full gradient-primary text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform group-hover:-translate-y-0.5">
                  Lihat Cabang
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
