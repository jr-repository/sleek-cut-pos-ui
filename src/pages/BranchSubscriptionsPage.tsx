
import React from 'react';

interface BranchSubscriptionsPageProps {
  userRole: string | null;
  currentClientId: number | null;
}

const BranchSubscriptionsPage: React.FC<BranchSubscriptionsPageProps> = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Langganan Cabang</h1>
          <p className="text-gray-400 mt-2">Kelola langganan dan pembayaran setiap cabang</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Tambah Langganan
        </button>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold text-white">Daftar Langganan Cabang</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Client</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Cabang</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Paket</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Mulai</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Berakhir</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {[
                { client: 'Barbershop Premium', cabang: 'Jakarta Pusat', paket: 'Pro Plan', mulai: '2024-01-01', berakhir: '2024-12-31', status: 'Aktif' },
                { client: 'Hair Studio', cabang: 'Bandung', paket: 'Basic Plan', mulai: '2024-01-15', berakhir: '2024-07-15', status: 'Aktif' },
                { client: 'Gentleman Barber', cabang: 'Surabaya', paket: 'Pro Plan', mulai: '2023-12-01', berakhir: '2024-01-01', status: 'Expired' },
              ].map((subscription, index) => (
                <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{subscription.client}</td>
                  <td className="px-6 py-4 text-gray-300">{subscription.cabang}</td>
                  <td className="px-6 py-4 text-gray-300">{subscription.paket}</td>
                  <td className="px-6 py-4 text-gray-300">{subscription.mulai}</td>
                  <td className="px-6 py-4 text-gray-300">{subscription.berakhir}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      subscription.status === 'Aktif' ? 'bg-green-900/30 text-green-400' :
                      'bg-red-900/30 text-red-400'
                    }`}>
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        Edit
                      </button>
                      <button className="text-green-400 hover:text-green-300 font-medium transition-colors">
                        Perpanjang
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BranchSubscriptionsPage;
