
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Point of Sale</h1>
        <p className="text-gray-600">Sistem transaksi barbershop</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product/Service Selection */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Pilih Layanan/Produk</h2>
          <div className="grid gap-2">
            {[
              { id: 1, name: 'Potong Rambut Regular', price: 25000 },
              { id: 2, name: 'Potong Rambut Premium', price: 50000 },
              { id: 3, name: 'Cukur Jenggot', price: 15000 },
              { id: 4, name: 'Styling Rambut', price: 35000 },
            ].map((service) => (
              <button
                key={service.id}
                className="text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{service.name}</span>
                  <span className="text-gray-600">{formatCurrency(service.price)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cart and Payment */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Keranjang</h2>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>Potong Rambut Regular</span>
              <span>{formatCurrency(25000)}</span>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span>Total:</span>
              <span>{formatCurrency(25000)}</span>
            </div>
            
            <div className="space-y-3">
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Pilih Metode Pembayaran</option>
                <option>Tunai</option>
                <option>Kartu Kredit/Debit</option>
                <option>GoPay</option>
                <option>OVO</option>
              </select>
              
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 font-semibold">
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
