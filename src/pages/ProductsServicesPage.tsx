
import React from 'react';

interface ProductsServicesPageProps {
  userRole: string | null;
  userBranchId: number | null;
  currentClientId: number | null;
}

const ProductsServicesPage: React.FC<ProductsServicesPageProps> = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Produk & Layanan</h1>
          <p className="text-gray-400 mt-2">Kelola produk dan layanan barbershop</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Tambah Produk/Layanan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 1, name: 'Potong Rambut Regular', type: 'Layanan', price: 25000, status: 'Aktif' },
          { id: 2, name: 'Potong Rambut Premium', type: 'Layanan', price: 50000, status: 'Aktif' },
          { id: 3, name: 'Pomade Hair Wax', type: 'Produk', price: 75000, status: 'Aktif' },
        ].map((item) => (
          <div key={item.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{item.type === 'Layanan' ? '✂️' : '🧴'}</span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                {item.status}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{item.type}</p>
            <p className="text-blue-400 font-semibold text-lg mb-4">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price)}
            </p>
            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                Edit
              </button>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsServicesPage;
