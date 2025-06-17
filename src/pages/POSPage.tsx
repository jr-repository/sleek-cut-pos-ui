
import React from 'react';

interface POSPageProps {
  userRole: string | null;
  userBranchId: number | null;
  username: string | null;
  currentClientId: number | null;
}

const POSPage: React.FC<POSPageProps> = () => {
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
        <h1 className="text-3xl font-bold text-white">Point of Sale</h1>
        <p className="text-gray-400 mt-2">Sistem transaksi barbershop</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product/Service Selection */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-6">Pilih Layanan/Produk</h2>
          <div className="space-y-3">
            {[
              { id: 1, name: 'Potong Rambut Regular', price: 25000, icon: '✂️' },
              { id: 2, name: 'Potong Rambut Premium', price: 50000, icon: '✂️' },
              { id: 3, name: 'Cukur Jenggot', price: 15000, icon: '🪒' },
              { id: 4, name: 'Styling Rambut', price: 35000, icon: '💇' },
            ].map((service) => (
              <button
                key={service.id}
                className="w-full text-left p-4 bg-gray-700 border border-gray-600 rounded-lg hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                      <span className="text-lg">{service.icon}</span>
                    </div>
                    <span className="font-medium text-white">{service.name}</span>
                  </div>
                  <span className="text-blue-400 font-semibold">{formatCurrency(service.price)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cart and Payment */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-6">Keranjang</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <span>✂️</span>
                </div>
                <span className="text-white">Potong Rambut Regular</span>
              </div>
              <span className="font-semibold text-white">{formatCurrency(25000)}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6">
            <div className="flex justify-between text-2xl font-bold mb-6">
              <span className="text-white">Total:</span>
              <span className="text-blue-400">{formatCurrency(25000)}</span>
            </div>
            
            <div className="space-y-4">
              <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Pilih Metode Pembayaran</option>
                <option>Tunai</option>
                <option>Kartu Kredit/Debit</option>
                <option>GoPay</option>
                <option>OVO</option>
              </select>
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold py-4 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
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
