
import React from 'react';

interface PaymentMethodsPageProps {
  userRole: string | null;
}

const PaymentMethodsPage: React.FC<PaymentMethodsPageProps> = ({ userRole }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Metode Pembayaran</h1>
        <p className="text-gray-600">Kelola metode pembayaran yang tersedia</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Daftar Metode Pembayaran</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Tambah Metode
          </button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { id: 1, name: 'Tunai', type: 'Cash', isActive: true, fee: 0 },
            { id: 2, name: 'Kartu Kredit/Debit', type: 'Card', isActive: true, fee: 2.5 },
            { id: 3, name: 'GoPay', type: 'Digital', isActive: true, fee: 1.5 },
            { id: 4, name: 'OVO', type: 'Digital', isActive: true, fee: 1.5 },
            { id: 5, name: 'DANA', type: 'Digital', isActive: false, fee: 1.5 },
          ].map((method) => (
            <div key={method.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{method.name}</h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  method.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {method.isActive ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
              <p className="text-sm text-gray-600">{method.type}</p>
              {method.fee > 0 && (
                <p className="text-sm text-gray-600">Biaya: {method.fee}%</p>
              )}
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

export default PaymentMethodsPage;
