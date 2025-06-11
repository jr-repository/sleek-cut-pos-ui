
import React from 'react';

interface POSPageProps {
  userRole: string | null;
  userBranchId: number | null;
  username: string | null;
}

const POSPage: React.FC<POSPageProps> = ({ userRole, userBranchId, username }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Point of Sale</h1>
        <p className="text-muted-foreground mt-2">Sistem transaksi barbershop</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product/Service Selection */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Pilih Layanan/Produk</h2>
          <div className="space-y-3">
            {[
              { id: 1, name: 'Potong Rambut Regular', price: 25000, icon: '✂️' },
              { id: 2, name: 'Potong Rambut Premium', price: 50000, icon: '✂️' },
              { id: 3, name: 'Cukur Jenggot', price: 15000, icon: '🪒' },
              { id: 4, name: 'Styling Rambut', price: 35000, icon: '💇' },
            ].map((service) => (
              <button
                key={service.id}
                className="w-full text-left p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <span className="text-lg">{service.icon}</span>
                    </div>
                    <span className="font-medium text-foreground">{service.name}</span>
                  </div>
                  <span className="text-primary font-semibold">{formatCurrency(service.price)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cart and Payment */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Keranjang</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span>✂️</span>
                </div>
                <span className="text-foreground">Potong Rambut Regular</span>
              </div>
              <span className="font-semibold text-foreground">{formatCurrency(25000)}</span>
            </div>
          </div>
          
          <div className="border-t border-border pt-6">
            <div className="flex justify-between text-2xl font-bold mb-6">
              <span className="text-foreground">Total:</span>
              <span className="text-gradient">{formatCurrency(25000)}</span>
            </div>
            
            <div className="space-y-4">
              <select className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent">
                <option>Pilih Metode Pembayaran</option>
                <option>Tunai</option>
                <option>Kartu Kredit/Debit</option>
                <option>GoPay</option>
                <option>OVO</option>
              </select>
              
              <button className="w-full gradient-primary text-white font-semibold py-4 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
                Proses Pembayaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSPage;
