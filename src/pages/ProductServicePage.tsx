
import React from 'react';

interface ProductServicePageProps {
  userRole: string | null;
  userBranchId: number | null;
}

const ProductServicePage: React.FC<ProductServicePageProps> = ({ userRole, userBranchId }) => {
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
          <h1 className="text-4xl font-bold text-foreground">Produk & Layanan</h1>
          <p className="text-muted-foreground mt-2">Kelola produk dan layanan barbershop</p>
        </div>
        <button className="gradient-primary text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Tambah Item
        </button>
      </div>

      <div className="responsive-grid">
        {[
          { id: 1, name: 'Potong Rambut Regular', type: 'Layanan', price: 25000, status: 'Aktif', icon: '✂️' },
          { id: 2, name: 'Potong Rambut Premium', type: 'Layanan', price: 50000, status: 'Aktif', icon: '✂️' },
          { id: 3, name: 'Cukur Jenggot', type: 'Layanan', price: 15000, status: 'Aktif', icon: '🪒' },
          { id: 4, name: 'Pomade Premium', type: 'Produk', price: 75000, status: 'Aktif', icon: '🧴' },
          { id: 5, name: 'Shampoo Anti Ketombe', type: 'Produk', price: 45000, status: 'Aktif', icon: '🧴' },
          { id: 6, name: 'Hair Wax', type: 'Produk', price: 35000, status: 'Aktif', icon: '🧴' },
        ].map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {item.status}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{item.name}</h3>
            <p className="text-muted-foreground text-sm mb-2">{item.type}</p>
            <p className="text-2xl font-bold text-gradient mb-4">{formatCurrency(item.price)}</p>
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

export default ProductServicePage;
