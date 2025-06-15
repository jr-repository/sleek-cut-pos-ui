
import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, User } from 'lucide-react';

interface POSPageProps {
  userRole: string | null;
  userBranchId: number | null;
  username: string | null;
  currentClientId: number | null;
}

const POSPage: React.FC<POSPageProps> = ({ userRole, userBranchId, username, currentClientId }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const services = [
    { id: 1, name: 'Potong Rambut Regular', price: 50000, icon: '✂️' },
    { id: 2, name: 'Potong Rambut Premium', price: 75000, icon: '✂️' },
    { id: 3, name: 'Cukur Jenggot', price: 30000, icon: '🪒' },
    { id: 4, name: 'Styling Rambut', price: 40000, icon: '💇' },
    { id: 5, name: 'Hair Wash', price: 25000, icon: '🧴' },
    { id: 6, name: 'Hair Treatment', price: 100000, icon: '💆' },
  ];

  const cartItems = [
    { id: 1, name: 'Potong Rambut Regular', price: 50000, quantity: 1 },
    { id: 3, name: 'Cukur Jenggot', price: 30000, quantity: 1 },
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <ShoppingCart className="text-green-200" size={40} />
          <div>
            <h1 className="text-3xl font-bold text-white">Point of Sale</h1>
            <p className="text-green-200">Sistem transaksi barbershop</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Services Selection */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pilih Layanan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                className="text-left p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <span className="text-lg">{service.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{service.name}</p>
                      <p className="text-green-600 font-semibold">{formatCurrency(service.price)}</p>
                    </div>
                  </div>
                  <Plus className="text-green-600" size={20} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cart and Payment */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Keranjang</h2>
          
          {/* Cart Items */}
          <div className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">{formatCurrency(item.price)} x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 bg-gray-300 hover:bg-gray-400 rounded transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button className="p-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors">
                    <Plus size={16} />
                  </button>
                  <button className="p-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors ml-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Barberman</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Pilih Barberman</option>
              <option>Ahmad Rivaldi</option>
              <option>Budi Santoso</option>
              <option>Charlie Wijaya</option>
            </select>
          </div>
          
          {/* Payment Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between text-2xl font-bold mb-6">
              <span className="text-gray-800">Total:</span>
              <span className="text-green-600">{formatCurrency(total)}</span>
            </div>
            
            <div className="space-y-4">
              <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Pilih Metode Pembayaran</option>
                <option>Tunai</option>
                <option>Kartu Kredit/Debit</option>
                <option>GoPay</option>
                <option>OVO</option>
                <option>DANA</option>
              </select>
              
              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
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
