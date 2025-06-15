
import React from 'react';
import { Users, Plus, Edit3, Trash2, Search } from 'lucide-react';

interface BarbermenPageProps {
  userRole: string | null;
  userBranchId: number | null;
  currentClientId: number | null;
}

const BarbermenPage: React.FC<BarbermenPageProps> = ({ userRole, userBranchId, currentClientId }) => {
  const barbermen = [
    { id: 1, name: 'Ahmad Rivaldi', email: 'ahmad@barbershop.com', phone: '081234567890', status: 'Aktif', commission: 50 },
    { id: 2, name: 'Budi Santoso', email: 'budi@barbershop.com', phone: '081234567891', status: 'Aktif', commission: 45 },
    { id: 3, name: 'Charlie Wijaya', email: 'charlie@barbershop.com', phone: '081234567892', status: 'Tidak Aktif', commission: 40 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Users className="text-blue-200" size={40} />
            <div>
              <h1 className="text-3xl font-bold text-white">Manajemen Barberman</h1>
              <p className="text-blue-200">Kelola data barberman dan jadwal kerja</p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2">
            <Plus size={20} />
            Tambah Barberman
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari barberman..."
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Barbermen Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Daftar Barberman</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Nama</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Telepon</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Komisi (%)</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {barbermen.map((barberman) => (
                <tr key={barberman.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">{barberman.name}</td>
                  <td className="px-6 py-4 text-gray-600">{barberman.email}</td>
                  <td className="px-6 py-4 text-gray-600">{barberman.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{barberman.commission}%</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      barberman.status === 'Aktif' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {barberman.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200">
                        <Edit3 size={16} />
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200">
                        <Trash2 size={16} />
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

export default BarbermenPage;
