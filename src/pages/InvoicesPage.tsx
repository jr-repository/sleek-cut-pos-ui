
import React from 'react';
import { Receipt, Plus, Eye, Download, Search, Filter } from 'lucide-react';

interface InvoicesPageProps {
  userRole: string | null;
  currentClientId: number | null;
}

const InvoicesPage: React.FC<InvoicesPageProps> = ({ userRole, currentClientId }) => {
  const invoices = [
    { 
      id: 1, 
      clientName: 'Barbershop Jakarta', 
      amount: 2000000, 
      date: '2024-01-15', 
      dueDate: '2024-02-15', 
      status: 'Paid',
      plan: 'Premium'
    },
    { 
      id: 2, 
      clientName: 'Salon Bandung', 
      amount: 1000000, 
      date: '2024-01-10', 
      dueDate: '2024-02-10', 
      status: 'Pending',
      plan: 'Standard'
    },
    { 
      id: 3, 
      clientName: 'Cut & Style Surabaya', 
      amount: 2000000, 
      date: '2024-01-05', 
      dueDate: '2024-02-05', 
      status: 'Overdue',
      plan: 'Premium'
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-800 to-red-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Receipt className="text-orange-200" size={40} />
            <div>
              <h1 className="text-3xl font-bold text-white">Invoice Management</h1>
              <p className="text-orange-200">Kelola tagihan dan pembayaran client</p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2">
            <Plus size={20} />
            Buat Invoice
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari invoice..."
              className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option>Semua Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Daftar Invoice</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Client</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Paket</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Jumlah</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Jatuh Tempo</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">#{invoice.id.toString().padStart(4, '0')}</td>
                  <td className="px-6 py-4 text-gray-900">{invoice.clientName}</td>
                  <td className="px-6 py-4 text-gray-600">{invoice.plan}</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">{formatCurrency(invoice.amount)}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(invoice.date).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(invoice.dueDate).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Paid' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : invoice.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200">
                        <Eye size={16} />
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-200">
                        <Download size={16} />
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
