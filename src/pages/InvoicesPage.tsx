
import React from 'react';

interface InvoicesPageProps {
  userRole: string | null;
  currentClientId: number | null;
}

const InvoicesPage: React.FC<InvoicesPageProps> = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Invoice</h1>
          <p className="text-gray-400 mt-2">Kelola invoice dan pembayaran client</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
          Buat Invoice
        </button>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold text-white">Daftar Invoice</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">No. Invoice</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Client</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Tanggal</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Jumlah</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {[
                { no: 'INV-001', client: 'Barbershop Premium Jakarta', date: '2024-01-15', amount: 'Rp 1.000.000', status: 'Lunas' },
                { no: 'INV-002', client: 'Hair Studio Bandung', date: '2024-01-16', amount: 'Rp 500.000', status: 'Pending' },
                { no: 'INV-003', client: 'Gentleman Barber Surabaya', date: '2024-01-17', amount: 'Rp 750.000', status: 'Overdue' },
              ].map((invoice, index) => (
                <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{invoice.no}</td>
                  <td className="px-6 py-4 text-gray-300">{invoice.client}</td>
                  <td className="px-6 py-4 text-gray-300">{invoice.date}</td>
                  <td className="px-6 py-4 text-gray-300">{invoice.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Lunas' ? 'bg-green-900/30 text-green-400' :
                      invoice.status === 'Pending' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-red-900/30 text-red-400'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        Lihat
                      </button>
                      <button className="text-green-400 hover:text-green-300 font-medium transition-colors">
                        Edit
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

export default InvoicesPage;
