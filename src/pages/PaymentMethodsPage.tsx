
import React from 'react';

interface PaymentMethodsPageProps {
  userRole: string | null;
}

const PaymentMethodsPage: React.FC<PaymentMethodsPageProps> = ({ userRole }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Metode Pembayaran</h1>
          <p className="text-muted-foreground mt-2">Kelola metode pembayaran yang tersedia</p>
        </div>
        <button className="gradient-primary text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Tambah Metode
        </button>
      </div>

      <div className="responsive-grid">
        {[
          { id: 1, name: 'Tunai', type: 'Cash', isActive: true, fee: 0, icon: '💵' },
          { id: 2, name: 'Kartu Kredit/Debit', type: 'Card', isActive: true, fee: 2.5, icon: '💳' },
          { id: 3, name: 'GoPay', type: 'Digital', isActive: true, fee: 1.5, icon: '📱' },
          { id: 4, name: 'OVO', type: 'Digital', isActive: true, fee: 1.5, icon: '📱' },
          { id: 5, name: 'DANA', type: 'Digital', isActive: false, fee: 1.5, icon: '📱' },
        ].map((method) => (
          <div key={method.id} className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{method.icon}</span>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                method.isActive 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
              }`}>
                {method.isActive ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{method.name}</h3>
            <p className="text-muted-foreground text-sm mb-2">{method.type}</p>
            {method.fee > 0 && (
              <p className="text-muted-foreground text-sm mb-4">Biaya: {method.fee}%</p>
            )}
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

export default PaymentMethodsPage;
