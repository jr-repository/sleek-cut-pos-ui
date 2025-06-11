
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Produk & Layanan</h1>
        <p className="text-gray-600">Kelola produk dan layanan barbershop</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Daftar Produk & Layanan</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Tambah Item
          </button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { id: 1, name: 'Potong Rambut Regular', type: 'Layanan', price: 25000, status: 'Aktif' },
            { id: 2, name: 'Potong Rambut Premium', type: 'Layanan', price: 50000, status: 'Aktif' },
            { id: 3, name: 'Cukur Jenggot', type: 'Layanan', price: 15000, status: 'Aktif' },
            { id: 4, name: 'Pomade Premium', type: 'Produk', price: 75000, status: 'Aktif' },
            { id: 5, name: 'Shampoo Anti Ketombe', type: 'Produk', price: 45000, status: 'Aktif' },
            { id: 6, name: 'Hair Wax', type: 'Produk', price: 35000, status: 'Aktif' },
          ].map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">{item.status}</span>
              </div>
              <p className="text-sm text-gray-600">{item.type}</p>
              <p className="text-lg font-semibold text-blue-600 mt-1">{formatCurrency(item.price)}</p>
              <div className="mt-3">
                <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                <button className="text-red-600 hover:text-red-800">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductServicePage;
