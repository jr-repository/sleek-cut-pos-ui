
import React, { useState } from 'react';
import { Package, Plus, Edit3, Trash2, Search, Filter, Tag, DollarSign } from 'lucide-react';

interface ProductServicePageProps {
  userRole: string | null;
  userBranchId: number | null;
}

const ProductServicePage: React.FC<ProductServicePageProps> = ({ userRole, userBranchId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const items = [
    { 
      id: 1, 
      name: 'Potong Rambut Regular', 
      type: 'service', 
      price: 50000, 
      stock: null,
      category: 'Layanan Dasar',
      description: 'Potong rambut standar dengan styling sederhana'
    },
    { 
      id: 2, 
      name: 'Pomade Premium', 
      type: 'product', 
      price: 85000, 
      stock: 25,
      category: 'Hair Styling',
      description: 'Pomade berkualitas tinggi untuk styling rambut'
    },
    { 
      id: 3, 
      name: 'Cukur Jenggot', 
      type: 'service', 
      price: 35000, 
      stock: null,
      category: 'Layanan Tambahan',
      description: 'Cukur dan rapikan jenggot dengan presisi'
    },
    { 
      id: 4, 
      name: 'Shampoo Anti Dandruff', 
      type: 'product', 
      price: 45000, 
      stock: 18,
      category: 'Hair Care',
      description: 'Shampoo khusus mengatasi ketombe'
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Package size={32} />
              Produk & Layanan
            </h1>
            <p className="text-gray-300">Kelola produk dan layanan barbershop</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2">
            <Plus size={20} />
            Tambah Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari produk atau layanan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Tipe</option>
              <option value="product">Produk</option>
              <option value="service">Layanan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden">
            <div className={`p-4 ${item.type === 'product' ? 'bg-gradient-to-r from-violet-600 to-purple-600' : 'bg-gradient-to-r from-blue-600 to-violet-600'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Package className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <p className="text-sm opacity-90">{item.category}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.type === 'product' 
                    ? 'bg-purple-500/20 text-purple-100 border border-purple-400/30' 
                    : 'bg-blue-500/20 text-blue-100 border border-blue-400/30'
                }`}>
                  {item.type === 'product' ? 'Produk' : 'Layanan'}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="text-green-400" size={20} />
                    <span className="text-2xl font-bold text-green-400">{formatCurrency(item.price)}</span>
                  </div>
                  {item.type === 'product' && item.stock !== null && (
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Stok</p>
                      <p className={`font-bold ${item.stock > 10 ? 'text-green-400' : item.stock > 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {item.stock}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-6">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <Edit3 size={16} />
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-gray-800 rounded-2xl p-12 text-center shadow-xl border border-gray-700">
          <Package className="mx-auto text-gray-500 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-400 mb-2">Tidak ada item ditemukan</h3>
          <p className="text-gray-500">Coba ubah kriteria pencarian atau filter Anda</p>
        </div>
      )}
    </div>
  );
};

export default ProductServicePage;
